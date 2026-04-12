# Moving off Hostinger dependencies

This document captures **what still depends on Hostinger today**, why it matters when you cancel service, and **concrete steps** to make the Volcano Drip site self-contained (or hosted only on Vercel + assets you control).

---

## Takeaway

1. **Origin “Product views” galleries** already use images under `public/` (local to the repo). Canceling Hostinger does **not** affect those four tiles per country.

2. **Many other visuals** still load from **`https://horizons-cdn.hostinger.com/...`**. If that CDN is tied to your Hostinger account and goes away, those URLs will **404** and visitors will see broken images (logos, hero art, origin story photos, subscription hero, sourcing badges, brewing guide image, home icons, etc.).

3. **Separate from the CDN:** `src/api/EcommerceApi.js` calls **`https://api-ecommerce.hostinger.com`**. That is not the same as the image CDN. If you use that API for shop features, confirm with Hostinger whether it stops when hosting ends, or migrate that integration.

4. **Build / editor plugins** reference **`https://horizons.hostinger.com`** (iframe allowlists). That is for Hostinger Horizons / embedded editor flows. If you only deploy from Git on Vercel, you may be able to remove or narrow those allowlists later; treat as low priority unless you still use the Horizons editor.

---

## Inventory: `horizons-cdn.hostinger.com` (static images)

| Area | File(s) | What it is |
|------|-----------|--------------|
| App / SEO default image | `src/App.jsx` | Open Graph / default meta image (logo PNG) |
| Nav logos | `src/components/Navbar.jsx` | Header + mobile menu logo (2 URLs) |
| Home hero default | `src/components/HeroImage.jsx` | Default hero `src` |
| Home page | `src/pages/HomePage.jsx` | 3 value-prop icons + 2 section images + lower “hero-2” image |
| Origin story photos | `src/pages/CoffeeOriginPage.jsx` | `storyImage` for each of 5 origins (large JPGs above the fold, not the 4-bag gallery) |
| Subscription | `src/pages/SubscriptionPage.jsx` | Origins club hero JPEG |
| Sourcing | `src/pages/SourcingPage.jsx` | Canada Organic logo + maple leaf image |
| Brewing guide | `src/pages/BrewingGuidePage.jsx` | Header / example image (JPEG) |
| Podcast config | `src/config/podcast.js` | Logo URL for podcast metadata |

**How to get the exact list later:** from repo root, run:

```bash
rg 'horizons-cdn\.hostinger' src/
```

---

## Inventory: other Hostinger domains

| Domain | Where | Notes |
|--------|--------|--------|
| `api-ecommerce.hostinger.com` | `src/api/EcommerceApi.js` | E-commerce API base URL — verify product impact if Hostinger disables it. |
| `horizons.hostinger.com` | `plugins/vite-plugin-iframe-route-restoration.js`, `plugins/selection-mode/selection-mode-script.js`, `plugins/visual-editor/edit-mode-script.js` | Likely editor/preview tooling; review if you still use Horizons-hosted editing. |

---

## Recommended migration phases (do this before or right after canceling)

### Phase 1 — Download and archive

1. Run the `rg` command above and open every hit.
2. For each `horizons-cdn` URL, download the file (browser or `curl`) into a folder such as `migration-assets/hostinger-cdn/` using a **stable name** (e.g. `primary-logo.png`, `origin-costa-rica-story.jpg`).
3. Keep a small spreadsheet: **old URL → new local path** so no URL is missed.

### Phase 2 — Add files to the app

1. Put raster assets in **`public/`** (same pattern as `copan-rise-front.png`, `sumatra-black-side.png`, etc.) so they deploy with Vercel and are referenced as `/your-file.png`.
2. Prefer **kebab-case** names and reuse one logo file everywhere the same asset appears (Navbar, `App.jsx`, `podcast.js`) to avoid duplication.
3. For large JPGs (origin `storyImage`), consider running them through an image optimizer (optional) before committing.

### Phase 3 — Replace references in code

1. Replace every `https://horizons-cdn.hostinger.com/...` string with a **`/...` path** to the matching file under `public/`.
2. Update **`src/App.jsx`** OG image if it currently points at Hostinger.
3. Re-run:

   ```bash
   rg 'horizons-cdn\.hostinger' src/
   ```

   Expect **zero** results when done.

### Phase 4 — Ecommerce API (if applicable)

1. Read `src/api/EcommerceApi.js` and list all callers.
2. Confirm whether **Ecwid** or another provider replaces this API; update base URL and auth per new provider’s docs.
3. If the Hostinger API is unused, remove or guard the module to avoid silent failures.

### Phase 5 — Plugins / `horizons.hostinger.com`

1. If you no longer use Hostinger’s web builder or embedded preview, review the three `plugins/` files and either remove Hostinger origins or replace them with your real preview origin (e.g. Vercel preview URL pattern). **Test `npm run build` and a local preview** after changes.

### Phase 6 — Verify before you cancel

1. `npm run build` — must succeed.
2. Local `npm run dev` — click through: Home, each `/origins/*`, Subscription, Sourcing, Brewing guide, nav open/close.
3. Optional: disconnect network and confirm no page still requests `horizons-cdn` (browser Network tab filtered by “hostinger”).
4. Deploy to a **Vercel preview** and repeat spot checks.

### Phase 7 — After Hostinger is gone

1. Confirm production site with hard refresh (cache-bust).
2. Update this doc’s inventory table or delete obsolete rows so the next person does not chase ghosts.

---

## Optional: CDN instead of `public/`

Serving everything from **`public/`** is enough for most sites. If you later want a separate CDN (Cloudflare R2, Vercel Blob, S3 + CloudFront), use **env-based base URLs** (e.g. `VITE_ASSET_BASE_URL`) and concatenate paths in one small helper so URLs are not scattered as raw strings again.

---

## Related in-repo docs

- `docs/product-tile-images.md` — naming for front tiles and origin gallery layout (galleries themselves are already local).

---

*Last updated: migration prep for canceling Hostinger CDN/hosting while keeping the Vercel-deployed site fully functional.*
