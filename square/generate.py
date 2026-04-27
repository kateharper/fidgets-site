#!/usr/bin/env python3
"""
Fidgets — Square catalogue generator.

Reads the inline product/bundle/subscription data (mirrored from
v4/products.js) and emits four output files in ./output/:

  - square-catalog.csv      Dashboard CSV import (v0.6 of Square's template)
  - square-catalog.json     Square Catalog API /v2/catalog/batch-upsert payload
  - skus-master.csv         Human-readable variant table for Tom's records
  - skus-master.md          Markdown view of the same (for git diff readability)

Run:    python3 square/generate.py
"""

import csv
import json
import os
import re
from pathlib import Path

# =============================================================
#  COLOUR PALETTE — Bambu Lab filament codes + price modifiers
# =============================================================
PALETTE = {
    'jade_white':     {'name': 'Jade White',          'hex': '#f5f5f0', 'tier': 'basic',   'extra': 0, 'code': 'JADE'},
    'bambu_black':    {'name': 'Bambu Black',         'hex': '#1a1a1d', 'tier': 'basic',   'extra': 0, 'code': 'BLAK'},
    'bambu_red':      {'name': 'Bambu Red',           'hex': '#c12e1f', 'tier': 'basic',   'extra': 0, 'code': 'REDD'},
    'cyber_yellow':   {'name': 'Cyber Yellow',        'hex': '#e4bd68', 'tier': 'basic',   'extra': 0, 'code': 'YELO'},
    'cyan_blue':      {'name': 'Cyan Blue',           'hex': '#0086d6', 'tier': 'basic',   'extra': 0, 'code': 'CYAN'},
    'mistletoe':      {'name': 'Mistletoe Green',     'hex': '#3f8e43', 'tier': 'basic',   'extra': 0, 'code': 'MIST'},
    'magenta':        {'name': 'Magenta',             'hex': '#ec008c', 'tier': 'basic',   'extra': 0, 'code': 'MGNT'},
    'purple':         {'name': 'Royal Purple',        'hex': '#5e43b7', 'tier': 'basic',   'extra': 0, 'code': 'PURP'},
    'glow_green':     {'name': 'Glow Mint',           'hex': '#a3e635', 'tier': 'special', 'extra': 2, 'code': 'GLOW'},
    'galaxy':         {'name': 'Galaxy Purple',       'hex': '#7c3aed', 'tier': 'special', 'extra': 2, 'code': 'GLXY'},
    # Premium materials
    'silk_aluminium': {'name': 'Silk Aluminium',      'hex': '#a8b0b8', 'tier': 'premium', 'extra': 0, 'code': 'ALUM'},
    'silk_brass':     {'name': 'Silk Brass',          'hex': '#b8923f', 'tier': 'premium', 'extra': 0, 'code': 'BRAS'},
    'silk_copper':    {'name': 'Silk Copper',         'hex': '#a8642a', 'tier': 'premium', 'extra': 0, 'code': 'COPP'},
    'marble_swirl':   {'name': 'Marble Swirl',        'hex': '#e8e1d4', 'tier': 'premium', 'extra': 0, 'code': 'MARB'},
    'wood_walnut':    {'name': 'Walnut Wood-fill',    'hex': '#5a3a22', 'tier': 'premium', 'extra': 0, 'code': 'WOOD'},
    'carbon_fibre':   {'name': 'Carbon Fibre',        'hex': '#1c1c1c', 'tier': 'premium', 'extra': 0, 'code': 'CARB'},
}

DEFAULT_COLORS = ['jade_white', 'bambu_black', 'bambu_red', 'cyber_yellow', 'cyan_blue',
                  'mistletoe', 'magenta', 'purple', 'glow_green', 'galaxy']
PREMIUM_COLORS = ['silk_aluminium', 'silk_brass', 'silk_copper',
                  'marble_swirl', 'wood_walnut', 'carbon_fibre']

IMG_BASE = 'https://kateharper.github.io/fidgets-site'

# =============================================================
#  PRODUCTS — mirrors v4/products.js (Option A premium set)
# =============================================================
# Each entry: id, name, tier, category, price (AUD), description, image_url, colors
# Tiers: loss / regular / premium. Categories: spinner/cube/etc.
# =============================================================
PRODUCTS = [
    # LOSS-LEADERS
    {'id': 'mini-spinner',   'name': 'Mini Spinner',       'tier': 'loss',    'cat': 'spinner',     'price': 3,
     'desc': 'Pocket-sized 2-arm spinner. The "try Tom\'s fidgets" intro.',
     'image': 'https://images.pexels.com/photos/422290/pexels-photo-422290.jpeg?auto=compress&cs=tinysrgb&w=600',
     'colors': DEFAULT_COLORS},
    {'id': 'tiny-worm',      'name': 'Tiny Worm',          'tier': 'loss',    'cat': 'articulated', 'price': 3,
     'desc': 'A 4cm wiggly worm. First fidget for first-time customers.',
     'image': None,  # SVG illustration
     'colors': DEFAULT_COLORS},
    {'id': 'mini-clicker',   'name': 'Mini Clicker',       'tier': 'loss',    'cat': 'gadget',      'price': 4,
     'desc': 'Single-button clicker. Perfectly satisfying. $4 to get hooked.',
     'image': 'https://images.pexels.com/photos/776116/pexels-photo-776116.jpeg?auto=compress&cs=tinysrgb&w=600',
     'colors': DEFAULT_COLORS},

    # REGULAR — Spinners
    {'id': 'spinner-3',      'name': 'Three-Arm Spinner',          'tier': 'regular', 'cat': 'spinner', 'price': 9,
     'desc': 'The classic. Triple-bearing, buttery spin.',
     'image': 'https://images.pexels.com/photos/422290/pexels-photo-422290.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},
    {'id': 'spinner-6',      'name': 'Six-Arm Mega Spinner',       'tier': 'regular', 'cat': 'spinner', 'price': 14,
     'desc': 'More arms, longer spin. Whirring satisfaction.',
     'image': 'https://images.pexels.com/photos/33270195/pexels-photo-33270195.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},
    {'id': 'star-spinner',   'name': 'Star Spinner',                'tier': 'regular', 'cat': 'spinner', 'price': 11,
     'desc': 'Five-pointed, weighted tips, hypnotic.',
     'image': 'https://images.pexels.com/photos/34710663/pexels-photo-34710663.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},
    {'id': 'metal-spinner',  'name': 'Metallic-Finish Spinner',    'tier': 'regular', 'cat': 'spinner', 'price': 18,
     'desc': 'Silk metallic filament. Looks like polished steel.',
     'image': 'https://images.pexels.com/photos/33633049/pexels-photo-33633049.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},

    # REGULAR — Cubes
    {'id': 'fidget-cube',    'name': 'Print-in-Place Fidget Cube', 'tier': 'regular', 'cat': 'cube',    'price': 20,
     'desc': 'Six sides of buttons, dials and switches.',
     'image': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Print_in_place_Fidget_Cube.jpg',
     'colors': DEFAULT_COLORS},
    {'id': 'infinity-cube',  'name': 'Infinity Cube',              'tier': 'regular', 'cat': 'cube',    'price': 15,
     'desc': 'Folds and unfolds forever. The desk classic.',
     'image': 'https://upload.wikimedia.org/wikipedia/commons/8/81/Fidget_cube_yellow_and_white.jpg',
     'colors': DEFAULT_COLORS},
    {'id': 'gear-cube',      'name': 'Gear Cube',                  'tier': 'regular', 'cat': 'cube',    'price': 17,
     'desc': 'Interlocking gears. Click-click-click.',
     'image': 'https://images.pexels.com/photos/9242925/pexels-photo-9242925.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},

    # REGULAR — Articulated
    {'id': 'dragon',         'name': 'Articulated Dragon',         'tier': 'regular', 'cat': 'articulated', 'price': 30,
     'desc': 'Big flexi dragon — the showstopper.', 'image': None, 'colors': DEFAULT_COLORS},
    {'id': 'snake',          'name': 'Articulated Snake',          'tier': 'regular', 'cat': 'articulated', 'price': 13,
     'desc': 'Wiggle, drape, wear as a bracelet.', 'image': None, 'colors': DEFAULT_COLORS},
    {'id': 'octopus',        'name': 'Articulated Octopus',        'tier': 'regular', 'cat': 'articulated', 'price': 19,
     'desc': 'Eight tentacles of squishy print-in-place fun.', 'image': None, 'colors': DEFAULT_COLORS},
    {'id': 'axolotl',        'name': 'Articulated Axolotl',        'tier': 'regular', 'cat': 'articulated', 'price': 17,
     'desc': 'Smiley pink axolotl with floppy gills.', 'image': None, 'colors': DEFAULT_COLORS},
    {'id': 'worm',           'name': 'Wiggle Worm',                'tier': 'regular', 'cat': 'articulated', 'price': 8,
     'desc': 'Pocket-sized stress relief. Free wiggles.', 'image': None, 'colors': DEFAULT_COLORS},
    {'id': 'lizard',         'name': 'Mini Lizard',                'tier': 'regular', 'cat': 'articulated', 'price': 10,
     'desc': 'Tiny flexi lizard. Fits in any pencil case.', 'image': None, 'colors': DEFAULT_COLORS},

    # REGULAR — Sliders
    {'id': 'slider',         'name': 'Magnetic-Feel Slider',       'tier': 'regular', 'cat': 'slider', 'price': 13,
     'desc': 'Smooth as silk. Slides from one end to the other.',
     'image': 'https://images.pexels.com/photos/776116/pexels-photo-776116.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},
    {'id': 'gyro-ring',      'name': 'Gyro Ring',                  'tier': 'regular', 'cat': 'slider', 'price': 11,
     'desc': 'Spins on your finger. Discreet desk fidget.',
     'image': 'https://images.pexels.com/photos/8145711/pexels-photo-8145711.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},
    {'id': 'spinner-ring',   'name': 'Spinner Fidget Ring',        'tier': 'regular', 'cat': 'slider', 'price': 13,
     'desc': 'Wearable spinner. Looks like jewellery.',
     'image': 'https://images.pexels.com/photos/14064918/pexels-photo-14064918.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},
    {'id': 'rolling-maze',   'name': 'Rolling Ball Maze',          'tier': 'regular', 'cat': 'slider', 'price': 18,
     'desc': 'Tilt and twist to roll the ball through.', 'image': None, 'colors': DEFAULT_COLORS},
    {'id': 'spiky-roller',   'name': 'Spiky Sensory Roller',       'tier': 'regular', 'cat': 'slider', 'price': 13,
     'desc': 'Tactile spikes for high-input sensory feedback.',
     'image': 'https://images.pexels.com/photos/4114512/pexels-photo-4114512.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},
    {'id': 'spiral-cone',    'name': 'Spiral Cone',                'tier': 'regular', 'cat': 'slider', 'price': 12,
     'desc': 'Print-in-place spiral that twirls between your fingers.', 'image': None, 'colors': DEFAULT_COLORS},

    # REGULAR — Puzzles
    {'id': 'hex-flexi',      'name': 'Hex Flexi',                  'tier': 'regular', 'cat': 'puzzle', 'price': 12,
     'desc': 'Hexagonal mesh that folds into a thousand shapes.', 'image': None, 'colors': DEFAULT_COLORS},
    {'id': 'magic-snake',    'name': 'Magic Snake',                'tier': 'regular', 'cat': 'puzzle', 'price': 14,
     'desc': 'Twist 24 segments into anything you can imagine.', 'image': None, 'colors': DEFAULT_COLORS},
    {'id': 'twist-puzzle',   'name': 'Twist Puzzle',               'tier': 'regular', 'cat': 'puzzle', 'price': 12,
     'desc': 'Tangle-style endless loop. Always something to twist.', 'image': None, 'colors': DEFAULT_COLORS},
    {'id': 'chain',          'name': 'Bike-Chain Fidget',          'tier': 'regular', 'cat': 'puzzle', 'price': 13,
     'desc': 'Interlocking links. Drape, swing, click.',
     'image': 'https://upload.wikimedia.org/wikipedia/commons/9/9a/A_%22bike_chain%22_type_fidget_toy.jpg',
     'colors': DEFAULT_COLORS},
    {'id': 'twisting-egg',   'name': 'Twisting Egg',               'tier': 'regular', 'cat': 'puzzle', 'price': 15,
     'desc': "Egg-shaped twist puzzle. Smoother than a Rubik's cube.",
     'image': 'https://images.pexels.com/photos/6979267/pexels-photo-6979267.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},

    # REGULAR — Gadgets
    {'id': 'gear-fidget',    'name': 'Pocket Gear Fidget',         'tier': 'regular', 'cat': 'gadget', 'price': 13,
     'desc': 'Three interlocking gears in a card-sized frame.',
     'image': 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},
    {'id': 'clicker',        'name': 'Clicker Fidget',             'tier': 'regular', 'cat': 'gadget', 'price': 10,
     'desc': 'Mechanical-keyboard click on demand.',
     'image': 'https://images.pexels.com/photos/776116/pexels-photo-776116.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': DEFAULT_COLORS},

    # REGULAR — Sourced (sewn)
    {'id': 'fidget-blanket', 'name': 'Sensory Fidget Blanket',     'tier': 'regular', 'cat': 'sourced', 'price': 45,
     'desc': 'Sewn lap blanket with zips, beads, ribbons and buttons. Calming.',
     'image': 'https://images.pexels.com/photos/17219698/pexels-photo-17219698.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': ['galaxy', 'cyan_blue', 'magenta', 'cyber_yellow']},

    # PREMIUM — Option A set (no knife shapes + butterfly comb)
    {'id': 'a-spinner',      'name': 'Aluminium-Effect Heavy Spinner', 'tier': 'premium', 'cat': 'premium', 'price': 48,
     'desc': 'Silk Aluminium PLA. Heavy, mirror finish, 4-minute spin.',
     'image': 'https://images.pexels.com/photos/34710649/pexels-photo-34710649.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': PREMIUM_COLORS},
    {'id': 'a-cube',         'name': 'Brass-Finish Heavy Cube',    'tier': 'premium', 'cat': 'premium', 'price': 52,
     'desc': 'Silk Brass filament, weighted infill. The desk-trophy fidget.',
     'image': 'https://images.pexels.com/photos/33270195/pexels-photo-33270195.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': PREMIUM_COLORS},
    {'id': 'a-pyramid',      'name': 'Galaxy Marble Pyramid',      'tier': 'premium', 'cat': 'premium', 'price': 42,
     'desc': 'Galaxy Marble filament. Tetrahedron silhouette, swirled finish.',
     'image': 'https://images.pexels.com/photos/33270189/pexels-photo-33270189.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': ['marble_swirl', 'galaxy', 'silk_aluminium', 'carbon_fibre']},
    {'id': 'a-worry',        'name': 'Walnut Worry Stone',         'tier': 'premium', 'cat': 'premium', 'price': 38,
     'desc': 'Walnut Wood-fill PLA. Pebble silhouette, oil-rubbed finish.',
     'image': 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': ['wood_walnut', 'silk_brass', 'silk_copper', 'carbon_fibre']},
    {'id': 'a-comb',         'name': 'Brass Butterfly Comb',       'tier': 'premium', 'cat': 'premium', 'price': 72,
     'desc': 'Real metal butterfly form — hair-comb teeth, no blade. Outsourced solid brass. Legal everywhere.',
     'image': 'https://images.pexels.com/photos/34710662/pexels-photo-34710662.jpeg?auto=compress&cs=tinysrgb&w=800',
     'colors': ['silk_brass', 'silk_copper', 'silk_aluminium', 'wood_walnut', 'carbon_fibre']},
]

# =============================================================
#  BUNDLES — flat-priced bundle items
# =============================================================
BUNDLES = [
    {'id': 'starter',        'name': 'Starter Pack',     'price': 30, 'retail': 34,
     'desc': 'Pick 1 spinner + 1 cube + 1 articulated. Saves $4 on individual prices.'},
    {'id': 'articulated',    'name': 'Articulated Trio', 'price': 35, 'retail': 50,
     'desc': 'Any 3 articulated creatures. Plus 50% off your next order.'},
    {'id': 'spinner-stack',  'name': 'Spinner Stack',    'price': 25, 'retail': 31,
     'desc': 'Three spinners — mix and match the four spinner styles.'},
    {'id': 'class-pack',     'name': 'Class Pack',       'price': 40, 'retail': 55,
     'desc': 'Five fidgets for the gang. Birthday party loot bags sorted.'},
    {'id': 'mega',           'name': 'Mega Pack',        'price': 80, 'retail': 120,
     'desc': 'Pick any 8 fidgets. Best $/fidget on the site.'},
]

# =============================================================
#  SUBSCRIPTION — separate plan, NOT a catalog item.
#  Documented here for completeness; uploaded via Subscriptions API.
# =============================================================
SUBSCRIPTION = {
    'name': 'Premium Membership',
    'price_monthly': 5,
    'signup_credit': 15,
    'monthly_credit': 10,
    'desc': 'Premium tier access + $15 instant credit + $10 monthly credit. Full benefits at fidgets.com.au/v4/#premium',
}

# =============================================================
#  Helpers
# =============================================================
def short(s, n=12):
    return re.sub(r'[^A-Z0-9]', '', s.upper().replace('-', ''))[:n]

def sku(product, color_id):
    """Generate a unique SKU for a product+color variant."""
    p = short(product['id'])
    c = PALETTE[color_id]['code']
    return f"FDG-{p}-{c}"

def variation_price(product, color_id):
    """Variant price = base + colour upcharge."""
    return product['price'] + PALETTE[color_id]['extra']

def variation_name(color_id):
    return PALETTE[color_id]['name']

def category_name(tier):
    return {'loss': 'Starter Fidgets ($3-4)', 'regular': 'Regular Fidgets',
            'premium': 'Premium (Subscriber-only)', 'bundle': 'Bundles & Packs'}[tier]

# =============================================================
#  CSV — Square Dashboard import format
# =============================================================
def write_csv(out_path):
    with open(out_path, 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow([
            'Reference Handle', 'Token', 'Item Name', 'Variation Name',
            'SKU', 'Description', 'Categories',
            'Price', 'Current Quantity Default', 'New Quantity Default',
            'Stock Alert Enabled Default', 'Stock Alert Count Default',
            'Tax - GST 10% (in some regions)',
        ])
        for p in PRODUCTS:
            for color_id in p['colors']:
                handle = f"{p['id']}-{color_id}"
                w.writerow([
                    handle, '', p['name'], variation_name(color_id),
                    sku(p, color_id), p['desc'], category_name(p['tier']),
                    f"{variation_price(p, color_id):.2f}", '0', '0', 'N', '',
                    'Y',
                ])
        for b in BUNDLES:
            handle = f"bundle-{b['id']}"
            w.writerow([
                handle, '', b['name'], 'Default',
                f"FDG-BDL-{short(b['id'], 4)}", b['desc'], category_name('bundle'),
                f"{b['price']:.2f}", '0', '0', 'N', '', 'Y',
            ])

# =============================================================
#  JSON — Square Catalog API batch-upsert payload
# =============================================================
def aud_money(amount_dollars):
    return {'amount': int(round(amount_dollars * 100)), 'currency': 'AUD'}

def write_json(out_path):
    objects = []

    # Categories
    cat_ids = {}
    for tier in ['loss', 'regular', 'premium', 'bundle']:
        cat_id = f"#cat-{tier}"
        cat_ids[tier] = cat_id
        objects.append({
            'type': 'CATEGORY',
            'id': cat_id,
            'category_data': {'name': category_name(tier)},
        })

    # Items + variations
    for p in PRODUCTS:
        item_id = f"#item-{p['id']}"
        variations = []
        for color_id in p['colors']:
            variations.append({
                'type': 'ITEM_VARIATION',
                'id': f"#var-{p['id']}-{color_id}",
                'item_variation_data': {
                    'item_id': item_id,
                    'name': variation_name(color_id),
                    'sku': sku(p, color_id),
                    'pricing_type': 'FIXED_PRICING',
                    'price_money': aud_money(variation_price(p, color_id)),
                },
            })
        item_data = {
            'name': p['name'],
            'description': p['desc'],
            'category_id': cat_ids[p['tier']],
            'variations': variations,
        }
        if p.get('image'):
            # Image URL noted in custom attribute; actual upload happens via
            # CreateCatalogImage in upload-to-square.py
            item_data['ecom_image_uris'] = [p['image']]
        objects.append({'type': 'ITEM', 'id': item_id, 'item_data': item_data})

    # Bundles — single-variation items
    for b in BUNDLES:
        item_id = f"#item-bundle-{b['id']}"
        objects.append({
            'type': 'ITEM',
            'id': item_id,
            'item_data': {
                'name': b['name'],
                'description': b['desc'] + f" Retail value ${b['retail']}, you save ${b['retail']-b['price']}.",
                'category_id': cat_ids['bundle'],
                'variations': [{
                    'type': 'ITEM_VARIATION',
                    'id': f"#var-bundle-{b['id']}",
                    'item_variation_data': {
                        'item_id': item_id,
                        'name': 'Bundle',
                        'sku': f"FDG-BDL-{short(b['id'], 4)}",
                        'pricing_type': 'FIXED_PRICING',
                        'price_money': aud_money(b['price']),
                    },
                }],
            },
        })

    payload = {
        'idempotency_key': 'fidgets-import-2026-04-27-v1',
        'batches': [{'objects': objects}],
    }
    with open(out_path, 'w') as f:
        json.dump(payload, f, indent=2)

# =============================================================
#  Master SKU table (CSV + Markdown)
# =============================================================
def write_master(csv_path, md_path):
    rows = []
    for p in PRODUCTS:
        for color_id in p['colors']:
            rows.append({
                'sku': sku(p, color_id),
                'product': p['name'],
                'tier': p['tier'].upper(),
                'category': p['cat'],
                'colour': PALETTE[color_id]['name'],
                'colour_tier': PALETTE[color_id]['tier'],
                'hex': PALETTE[color_id]['hex'],
                'price_aud': variation_price(p, color_id),
                'image': p.get('image') or '(SVG illustration)',
            })
    for b in BUNDLES:
        rows.append({
            'sku': f"FDG-BDL-{short(b['id'], 4)}",
            'product': b['name'],
            'tier': 'BUNDLE',
            'category': 'bundle',
            'colour': '—',
            'colour_tier': '—',
            'hex': '',
            'price_aud': b['price'],
            'image': '(no image)',
        })

    with open(csv_path, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    with open(md_path, 'w') as f:
        f.write('# Fidgets — Master SKU table\n\n')
        f.write(f'Total variants: **{len(rows)}**\n\n')
        for tier in ['LOSS', 'REGULAR', 'PREMIUM', 'BUNDLE']:
            tier_rows = [r for r in rows if r['tier'] == tier]
            if not tier_rows: continue
            f.write(f'## {tier} ({len(tier_rows)} SKUs)\n\n')
            f.write('| SKU | Product | Colour | Price (AUD) |\n')
            f.write('|---|---|---|---:|\n')
            for r in tier_rows:
                f.write(f"| `{r['sku']}` | {r['product']} | {r['colour']} | ${r['price_aud']:.0f} |\n")
            f.write('\n')

# =============================================================
#  Main
# =============================================================
def main():
    here = Path(__file__).parent
    out = here / 'output'
    out.mkdir(exist_ok=True)

    write_csv(out / 'square-catalog.csv')
    write_json(out / 'square-catalog.json')
    write_master(out / 'skus-master.csv', out / 'skus-master.md')

    # Subscription separate doc
    sub_path = out / 'subscription.json'
    with open(sub_path, 'w') as f:
        json.dump({
            'note': 'Subscription is NOT a catalog item. Create via Square Subscriptions API or Dashboard.',
            'plan': SUBSCRIPTION,
            'api_endpoint': 'POST /v2/catalog/object  (with type=SUBSCRIPTION_PLAN)',
            'docs': 'https://developer.squareup.com/docs/subscriptions-api/overview',
        }, f, indent=2)

    # Stats
    n_variants = sum(len(p['colors']) for p in PRODUCTS) + len(BUNDLES)
    print(f'✅  Generated:')
    print(f'    output/square-catalog.csv   ({n_variants} rows, Dashboard CSV import)')
    print(f'    output/square-catalog.json  ({n_variants} variants, Catalog API payload)')
    print(f'    output/skus-master.csv       (master reference table)')
    print(f'    output/skus-master.md        (markdown view)')
    print(f'    output/subscription.json     (Subscriptions API payload)')
    print(f'')
    print(f'    Products: {len(PRODUCTS)}')
    print(f'    Variants: {n_variants - len(BUNDLES)}')
    print(f'    Bundles:  {len(BUNDLES)}')


if __name__ == '__main__':
    main()
