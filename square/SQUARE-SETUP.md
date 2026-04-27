# Square integration — setup guide

This folder turns Tom's fidget catalogue into Square. Two paths, pick one.

```
square/
├─ generate.py             ← run this to build the catalog files
├─ upload-to-square.py     ← run this to push to Square via API (path 2)
├─ output/
│  ├─ square-catalog.csv     Dashboard import (path 1)
│  ├─ square-catalog.json    Catalog API payload (path 2)
│  ├─ skus-master.csv        Master SKU reference (your records)
│  ├─ skus-master.md         Markdown view of the same
│  └─ subscription.json      Subscription plan data (separate API)
└─ SQUARE-SETUP.md         ← you are here
```

**Generated:** 35 products · 319 colour/material variants · 5 bundles · 1 subscription = **324 SKU rows**.

---

## Honest answer to "can you link directly with my Square account?"

I (Claude) cannot push to Tom's Square account autonomously because:

- Tom needs a Square Developer App + Personal Access Token (5-minute setup, free)
- Pushing real catalogue data to a real account should run with you watching
- Square uses OAuth — there's no API key file I can quietly drop in

But you have two clean ways to get the catalog up:

| | Path 1 — CSV upload | Path 2 — API push |
|---|---|---|
| Effort | 5 minutes, click + drag | 5-min token setup + run script |
| Variants | ✅ all 319 imported | ✅ all 319 imported |
| Bundles | ✅ 5 imported | ✅ 5 imported |
| Subscription | ❌ create separately | ✅ via subscription.json |
| **Images** | ❌ upload manually after | ✅ auto-uploaded |
| Re-runnable | ❌ duplicates on re-import | ✅ idempotent |
| Best for | First-time bulk setup | Ongoing sync as catalog evolves |

**Recommendation:** Do Path 1 first (gets the catalog up in 5 minutes). Add images via Path 2 later.

---

## Path 1 — CSV via Square Dashboard

1. Open https://squareup.com/dashboard/items/library
2. Click **"Actions"** → **"Import items"**
3. Upload `output/square-catalog.csv`
4. Square does a preview — review for errors, click **"Import"**
5. Done. 324 SKUs in your library.
6. **Add images manually:** click each item → "Add image" → upload from disk OR paste URL. Image URLs for every product are in `output/skus-master.csv` (column `image`) — you can drag the URLs straight from there.

**Limitation:** if you re-upload the same CSV later, Square creates duplicates. Use Path 2 for ongoing syncs.

---

## Path 2 — API push (preferred for ongoing use)

### One-time setup (~5 min)

1. Go to https://developer.squareup.com/apps → **Sign in** with the same email as your Square business account
2. Click **"+ Create your first application"** (or "+ New app")
3. Name it "Fidgets Catalog Sync" → Create
4. In the new app's left sidebar, click **"Credentials"**
5. **First, test in sandbox** — copy the *Sandbox Access Token*. Look like: `EAAA...sandbox`
6. **Later, switch to production** — copy the *Production Access Token*

### Push catalog (sandbox first!)

```bash
cd ~/fidgets-site/square

# Generate the catalog files (idempotent, run anytime data changes)
python3 generate.py

# SANDBOX dry-run — verifies + uploads to a fake Square account
export SQUARE_ACCESS_TOKEN='EAAA...your-sandbox-token...'
export SQUARE_ENV='sandbox'
python3 upload-to-square.py

# When sandbox looks right → push for real
export SQUARE_ACCESS_TOKEN='EAAA...your-production-token...'
export SQUARE_ENV='production'
python3 upload-to-square.py
```

The script:
1. Verifies your token (lists your business locations)
2. Uploads the catalogue (categories + items + 319 variations + 5 bundles)
3. Downloads each product image from its URL → uploads to Square's CDN → attaches to the item
4. Prints a summary with how many were created

**Idempotency:** the JSON has `idempotency_key: "fidgets-import-2026-04-27-v1"`. Re-running upload with the SAME key updates existing items rather than duplicating. To force a fresh re-import, bump the key in `generate.py` (line ~330).

---

## Subscription plan (Premium $5/month)

Square Subscriptions is a **separate API** from Catalog. Quick path:

### Easiest — Square Dashboard

1. Open https://squareup.com/dashboard/subscriptions
2. **"+ Create subscription plan"**
3. Name: `Premium Membership` · Price: `$5.00 AUD` · Cadence: `Monthly`
4. **Promotional offer:** add a one-time `$15` credit on first month (or set up a coupon code that subscribers see)
5. Save.

### Programmatic (advanced)

The `output/subscription.json` file has the plan data. Push via:

```bash
curl -X POST https://connect.squareup.com/v2/catalog/object \
  -H "Authorization: Bearer $SQUARE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Square-Version: 2026-01-22" \
  -d @output/subscription.json
```

---

## Wiring Square to the website

Once the catalog is in Square, you have two options for online checkout:

### Option A — Square Online Store (auto-generated site)

Square gives you a free `tomsfidgets.square.online` site with the catalogue, cart, checkout, Apple Pay, Google Pay built in.

1. https://squareup.com/dashboard/online → **Get started**
2. Pick a template
3. Items appear automatically from the catalogue
4. Custom domain: point `fidgets.com.au` at it (when you buy the domain)

This kills the GitHub-Pages site we built — Square Online replaces it. Simpler, but less customisable.

### Option B — Keep the custom site, use Square Checkout Links

Keep `fidgets-site/v4/index.html` as the storefront. For each item:

1. Square Dashboard → Items → click an item → **"Create payment link"** (or call `/v2/online-checkout/payment-links` API to do this in bulk)
2. Copy the resulting URL like `https://square.link/u/abc123`
3. Open `fidgets-site/v4/index.html`, find the `STRIPE_PAYMENT_LINKS` map, rename it `SQUARE_CHECKOUT_LINKS`, paste the URL keyed by `product_id`:
   ```js
   const SQUARE_CHECKOUT_LINKS = {
     'spinner-3': 'https://square.link/u/abc123',
     'fidget-cube': 'https://square.link/u/def456',
     // ...
   };
   ```
4. Same UX — "Add to cart" jumps straight to Square's hosted checkout with Apple Pay / Google Pay.

This keeps the slick INCYT site, replaces Stripe with Square. Inventory + reporting unify with the Square Terminal at school.

---

## Field-by-field SKU breakdown

See `output/skus-master.md` for a tier-grouped table of every SKU.

SKU format: `FDG-{PRODUCT}-{COLOUR}` — e.g. `FDG-SPINNER3-JADE` for "Three-Arm Spinner in Jade White". Bundle SKUs use prefix `FDG-BDL-`.

Tax: Australian GST is 10%. The CSV has every item flagged `Y` for GST. If Tom's annual turnover is under $75k AUD, GST registration is optional — he can flip these to `N` and not charge GST.

---

## Where to go for help

- Square Catalog API docs: https://developer.squareup.com/docs/catalog-api/what-it-does
- Square Subscriptions: https://developer.squareup.com/docs/subscriptions-api/overview
- Square Checkout Links: https://developer.squareup.com/docs/checkout-api/build-checkout
- Square AU support: https://squareup.com/help/au/en
