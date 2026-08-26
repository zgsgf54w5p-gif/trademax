# TradMax — Wholesale from Guangzhou to Cameroon 🇨🇳 ↔️ 🇨🇲

Static storefront for sourcing wholesale goods from 6,000+ verified Guangzhou factories
and shipping door-to-door to Cameroon. Prices in USD & FCFA, ordering handled on WhatsApp.

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Shop — search, category filters, colour-scan |
| `product.html?id=…` | Product detail — tiered pricing calculator (USD · FCFA) |
| `how.html` | How it works + FAQ (EN/FR) |
| `checkout.html` | Buyer details → formatted WhatsApp order with tracking reference |
| `orders.html` | Buyer's order archive with WhatsApp status requests |
| `admin.html` | Sellers — list products (stored in browser localStorage) |

## Tech

- Pure HTML/CSS/vanilla JS — no build step, no dependencies
- EN/FR i18n with auto-detection (`assets/js/i18n.js`)
- Tiered bulk pricing engine (`assets/js/products.js`)
- Cart drawer + localStorage cart (`assets/js/app.js`)
- Order references (`TM-XXXXXX`) generated at checkout

## Run locally

```
python -m http.server 8000
# then open http://localhost:8000
```

(Or just open `index.html` directly in a browser.)

## Tests

```
npm install        # once (jsdom)
node tests/smoke.js
```

49 functional checks across all pages: catalogue rendering, search/filters,
tier-price math, checkout validation, WhatsApp message content,
order archiving, FR locale, and more.

## Configuration

Business details (WhatsApp number, address, shipping %) live in
`BIZ` at the bottom of `assets/js/products.js`.
