#!/usr/bin/env python3
"""
Push the generated Square catalogue (output/square-catalog.json) to a real
Square account via the Catalog API. Also uploads product images to Square's
CDN and attaches them to items.

Usage:
    1. Generate catalogue first:
           python3 generate.py
    2. Get a Square Personal Access Token:
           https://developer.squareup.com/apps  →  create app  →  Production Access Token
    3. Set environment variables and run:
           export SQUARE_ACCESS_TOKEN='EAAA...'
           export SQUARE_ENV='production'    # or 'sandbox' to test first
           python3 upload-to-square.py

Run it on sandbox first. Verify in your Square Dashboard. Then re-run with
SQUARE_ENV=production to push live.

This script is IDEMPOTENT — re-running with the same idempotency_key in the
JSON updates existing items rather than duplicating. Bump the key in
generate.py if you want a clean re-import.
"""

import json
import os
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
CATALOG_JSON = HERE / 'output' / 'square-catalog.json'

ENV_HOSTS = {
    'sandbox': 'https://connect.squareupsandbox.com',
    'production': 'https://connect.squareup.com',
}


def http(method, url, token, body=None, content_type='application/json'):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': content_type,
        'Accept': 'application/json',
        'Square-Version': '2026-01-22',
    }
    data = body.encode('utf-8') if isinstance(body, str) else body
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode('utf-8', errors='replace')
        print(f'❌  HTTP {e.code} on {method} {url}')
        print(f'    Response: {body_text[:600]}')
        raise


def upload_image(token, base_url, image_url, item_id, name):
    """Download image from URL → upload to Square CDN → return image_id."""
    print(f'    📷  uploading image for {name}...')
    # Download
    try:
        with urllib.request.urlopen(image_url, timeout=20) as r:
            img_bytes = r.read()
            content_type = r.headers.get('Content-Type', 'image/jpeg')
    except Exception as e:
        print(f'        ⚠️  download failed: {e}  — skipping image')
        return None

    # Square's CreateCatalogImage uses multipart/form-data with two parts:
    # 1. "request" — JSON metadata
    # 2. "image_file" — binary image bytes
    boundary = f'----FidgetsBoundary{int(time.time())}'
    request_part = json.dumps({
        'idempotency_key': f'img-{item_id}-{int(time.time())}',
        'object_id': item_id,
        'image': {
            'type': 'IMAGE',
            'id': f'#img-{item_id}',
            'image_data': {'name': name, 'caption': name},
        },
        'is_primary': True,
    })
    body = (
        f'--{boundary}\r\n'
        f'Content-Disposition: form-data; name="request"\r\n'
        f'Content-Type: application/json\r\n\r\n'
        f'{request_part}\r\n'
        f'--{boundary}\r\n'
        f'Content-Disposition: form-data; name="image_file"; filename="{name}.jpg"\r\n'
        f'Content-Type: {content_type}\r\n\r\n'
    ).encode('utf-8') + img_bytes + f'\r\n--{boundary}--\r\n'.encode('utf-8')

    try:
        result = http('POST', f'{base_url}/v2/catalog/images', token,
                      body=body, content_type=f'multipart/form-data; boundary={boundary}')
        return result.get('image', {}).get('id')
    except Exception as e:
        print(f'        ⚠️  upload failed: {e}  — skipping image')
        return None


def main():
    token = os.environ.get('SQUARE_ACCESS_TOKEN')
    env = os.environ.get('SQUARE_ENV', 'sandbox').lower()
    if not token:
        sys.exit('❌  Set SQUARE_ACCESS_TOKEN env var. See header comment.')
    if env not in ENV_HOSTS:
        sys.exit(f"❌  SQUARE_ENV must be 'sandbox' or 'production', got {env!r}")
    base = ENV_HOSTS[env]

    if not CATALOG_JSON.exists():
        sys.exit(f'❌  {CATALOG_JSON} not found. Run generate.py first.')

    payload = json.loads(CATALOG_JSON.read_text())

    print(f'🔗  Square environment: {env}')
    print(f'🔗  Base URL: {base}')

    # Quick auth test
    print('🔍  Verifying token (locations.list)...')
    locs = http('GET', f'{base}/v2/locations', token)
    if 'locations' not in locs:
        sys.exit(f'❌  Auth failed: {locs}')
    print(f'✅  Authenticated. {len(locs["locations"])} location(s) on this account.')

    # 1. Push the catalogue (categories + items + variations)
    print(f'\n📦  Uploading catalogue ({len(payload["batches"][0]["objects"])} objects)...')
    body = json.dumps(payload)
    result = http('POST', f'{base}/v2/catalog/batch-upsert', token, body=body)
    print(f'✅  Catalogue uploaded.')
    id_map = result.get('id_mappings', [])
    by_temp = {m['client_object_id']: m['object_id'] for m in id_map}
    items_created = sum(1 for m in id_map if m['client_object_id'].startswith('#item-'))
    variants_created = sum(1 for m in id_map if m['client_object_id'].startswith('#var-'))
    print(f'    Items:      {items_created}')
    print(f'    Variations: {variants_created}')

    # 2. Upload images (separate API call per image)
    print('\n🖼   Uploading product images...')
    objects = payload['batches'][0]['objects']
    images_attempted = 0
    images_ok = 0
    for obj in objects:
        if obj['type'] != 'ITEM': continue
        image_uris = obj['item_data'].get('ecom_image_uris') or []
        if not image_uris: continue
        temp_id = obj['id']
        real_id = by_temp.get(temp_id)
        if not real_id:
            print(f'    ⚠️  no real id for {temp_id}  — skipping image')
            continue
        images_attempted += 1
        if upload_image(token, base, image_uris[0], real_id, obj['item_data']['name']):
            images_ok += 1

    print(f'\n📊  Summary:')
    print(f'    Items:       {items_created}')
    print(f'    Variations:  {variants_created}')
    print(f'    Images:      {images_ok}/{images_attempted}')
    print(f'\n🎉  Done. View your catalog at https://squareup.com/dashboard/items/library')
    print('\n💡  Next: in Square Dashboard, enable Square Online → set up Online Store →')
    print('    each item gets a checkout link you can paste into the website at')
    print('    fidgets-site/v4/index.html (replace the empty STRIPE_PAYMENT_LINKS map).')


if __name__ == '__main__':
    main()
