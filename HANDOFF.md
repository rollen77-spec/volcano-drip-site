# Handoff — Volcano Drip site

## Done (this session)

Shipped UX, SEO, and Ecwid polish, then **committed and pushed** to `main`.

- **Typography / focus:** Tailwind `text-hero`, `text-section-xl`, Figtree/Playfair in config; global `:focus-visible` rings; form fields use `:focus-visible`.
- **Footer:** Shop | Company | Support columns; “Small-batch roasted in Canada.”
- **Shop:** Loading overlay until Ecwid `xProductBrowser` initializes.
- **Home:** Dark tile contrast (lighter body copy); CTAs **Shop this roast** / subscription **View subscription**; hero & tile image hints (`width`/`height`, lazy/async, hero `fetchPriority`).
- **Ecwid:** Toasts on product open (with **View cart** action) and on external product URL.
- **Nav:** Focus styles on logo, Shop trigger, main links.
- **SEO:** `src/config/site.js` + optional **`VITE_SITE_URL`** in `.env.example`; Organization JSON-LD in `App.jsx`; Product JSON-LD + `| Volcano Drip` titles on origin pages; aligned Helmet titles + `index.html` defaults.

**Commit:** `4f2f1cc` on `origin/main` — `https://github.com/rollen77-spec/volcano-drip-site`

## Next (tomorrow or whenever)

1. **Verify production** after deploy: shop loader, footer, keyboard focus, Ecwid toasts, page titles, structured data (Rich Results / view source).
2. **Set `VITE_SITE_URL`** on the host to the live canonical URL (JSON-LD).
3. **Images:** Compress / WebP large PNGs in `public/` (biggest remaining perf win).
4. **Lint:** Fix `api/subscribe.js` ESLint `no-undef` for `Buffer` / `process` (Node env in eslint config).
5. **Optional:** Route + SEO for `ProductDetailPage` if you use it; OG/Twitter meta; analytics; 404; sitemap/robots.

---

*Update this file as you finish items or reprioritize.*
