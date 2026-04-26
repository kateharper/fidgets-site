# Fidgets — go-live punch list

Live preview: https://kateharper.github.io/fidgets-site/
Repo: https://github.com/kateharper/fidgets-site

This site is fully functional as a marketing/preview site and renders 20 products with a working Stripe Payment Link integration — Tom just needs to plug in real URLs and a real domain. None of the steps below need code changes; they're all admin/account work.

---

## 1. Domain

`fidgets.com.au` was registered Dec 2024 (GoDaddy) and is unavailable.

Available alternatives, ranked:

| # | Domain | Why |
|---|---|---|
| 1 | `fidgets.au` | Shortest, modern, closest to original |
| 2 | `thefidgets.com.au` | Closest .com.au alternative |
| 3 | `fidgetshop.com.au` | Self-explanatory |
| 4 | `fidgetco.com.au` | Brandable as "Fidget Co." |
| 5 | `printedfidgets.com.au` | Highlights the 3D-printed angle |
| — | `fidgetbox.com.au`, `popfidgets.com.au`, `spinfidgets.com.au`, `fidgetstore.com.au`, `fidgetz.com.au`, `fidgetclub.com.au` | Also available |

**To register `.com.au` / `.au`:** you need an ABN, ACN, or registered Australian business name. Tom is a minor, so this needs to be in a parent's name. Easiest registrars: VentraIP (ventraip.com.au), Crazy Domains, or GoDaddy AU. Cost ~$15-25/year.

**Once registered**, point it at GitHub Pages:
1. In the registrar's DNS, add four `A` records on `@` pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. Add a `CNAME` record on `www` pointing to `kateharper.github.io`
3. In the repo `kateharper/fidgets-site` → Settings → Pages → set custom domain
4. (Or move the repo to Tom's own GitHub account and put the custom domain there)

---

## 2. Stripe (online checkout)

The site uses **Stripe Payment Links** — the simplest no-backend approach. Apple Pay, Google Pay and card all work out of the box.

1. Sign up at https://dashboard.stripe.com/register (Australian business, parent's ID)
2. Activate the account (provide ABN + bank account)
3. For each of the 20 products: dashboard → **Payment Links** → **Create new** → set product name + price → copy the link
4. Open `~/fidgets-site/index.html`, find the `STRIPE_PAYMENT_LINKS` block (~line 580), and paste each link keyed by the product `id`. For example:
   ```js
   const STRIPE_PAYMENT_LINKS = {
     'spinner-3': 'https://buy.stripe.com/abc123...',
     'fidget-cube': 'https://buy.stripe.com/def456...',
     // ...
   };
   ```
5. Commit + push. The "Add to cart" buttons immediately link to checkout.

Stripe handles: receipts, refunds, fraud, taxes, Apple Pay, Google Pay, all card brands. Settlement to Australian bank in 2-3 business days.

---

## 3. Square Terminal (in-person sales at school)

Completely separate from the website — Square Terminal is the physical card reader Tom carries.

1. Sign up at https://squareup.com/au (parent's ID + ABN)
2. Order a **Square Terminal** ($329 AUD one-off) or use **Square Reader for contactless + chip** ($59 AUD) which pairs with his phone
3. Install the **Square POS** app on his phone, log in
4. Add the 20 products in the Square dashboard under "Items" with the same prices
5. At school: open the app, tap a product, customer taps card / Apple Pay / Google Pay on the reader

**Optional unify:** Square also offers an online checkout. If Tom wants ONE provider for both online and in-person, replace Stripe Payment Links with Square Online checkout URLs (same field in `index.html`). Stripe has a slicker checkout UX; Square has unified inventory.

---

## 4. Photography

The site currently uses custom SVG illustrations for each fidget — they look cohesive and modern, but they're placeholders. Once Tom prints his first batch:

1. Take photos against a plain white or coloured paper backdrop (good natural light from a window, no flash)
2. Crop square (1:1), 1200×1200 px is plenty
3. Export as `.webp` or `.jpg` (under 200KB each)
4. Drop in `~/fidgets-site/img/` with names matching product `id` (e.g. `spinner-3.jpg`)
5. In `index.html`, the `svgFor(p)` function (~line 555) — change to render an `<img src="img/${p.id}.jpg" .../>` instead of inline SVG

I can do that swap once you have photos — just say the word.

---

## 5. Things that need polishing

These are minor:

- The "Articulated Dragon" SVG is rougher than the others — replace with photo when available
- The hero's animated decorative spinners only animate when CSS animations are enabled (most browsers, fine)
- Email link `hello@fidgets.example` is a placeholder — change once a real email exists
- Footer copyright says "Fidgets. Made by Tom." — feel free to change

---

## 6. Local development

```bash
cd ~/fidgets-site
python3 -m http.server 5174
# Open http://localhost:5174
```

To deploy changes:
```bash
git add -A && git commit -m "your change" && git push
# GitHub Pages rebuilds in ~30 seconds
```

---

## 7. Reality check on what was done autonomously vs not

**Done:**
- 20-product catalogue researched, designed, priced
- Slick modern site built and deployed publicly
- Stripe Payment Link integration wired (just paste real URLs)
- Domain availability checked, alternatives shortlisted
- Live URL DM'd to Simon on Slack
- Full repo created at github.com/kateharper/fidgets-site

**NOT done (requires real money / ID / banking — needs you):**
- Domain purchase (no registrar account, needs ABN + payment)
- Square account creation (needs ID + ABN + bank verification)
- Stripe account creation (same)
- Real fidget product photography
