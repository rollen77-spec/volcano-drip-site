# Product tile images — design & delivery guide

This document defines how we shoot, export, and wire **Coffee Shop** grid images on the home page so tiles stay visually consistent and we avoid repeated layout fixes.

**Implementation reference:** `src/pages/HomePage.jsx` — `ProductTileMedia` and the product grid section.

---

## 1. Two tile types (do not mix them up)

| Type | Use case | `fit` prop | How it behaves on the site |
|------|-----------|------------|----------------------------|
| **Single bag** | One product per tile (Antigua Ember, Primera Luz, Sumatra Black, Copán Rise, Inca Ascent) | Default (`fit="cover"` in API — see code) | Image is **bottom-aligned**, **contained** in a fixed vertical slot (`max-h-[82%]`), **no hover zoom** on the photo. |
| **Wide / multi-asset** | Lineup, bundle, or landscape composition (e.g. Volcanic Origins — five bags) | `fit="contain"` | Full image stays visible inside the square (letterboxing OK); slight hover scale is allowed. |

Volcanic-style assets must stay on **`fit="contain"`** so nothing is cropped off at the edges.

---

## 2. Photography & asset rules (single-bag tiles)

These rules minimize “different camera distance” and mismatched bag sizes **before** they hit the website.

1. **Consistent distance** — Fill the frame with the bag the same way each time: same rough camera distance and lens choice so the bag occupies a similar percentage of the image height (e.g. bag height ~70–85% of the frame, centered horizontally).
2. **Straight-on hero** — Front label facing camera; avoid strong perspective / tilt unless applied to **all** products the same way.
3. **Background** — Neutral, even studio background (e.g. warm beige/tan), similar tone across SKUs. Avoid busy props.
4. **Lighting** — Soft, even key; avoid harsh asymmetry that changes perceived shape from tile to tile.
5. **Aspect ratio** — Prefer **square (1:1)** exports at a **high resolution** (e.g. 1600×1600 px minimum). If the source is not square, center the bag; the site will letterbox inside the slot, but **starting square** reduces surprises.
6. **Padding** — Leave modest, consistent margin around the bag in the file (do not crop the bag tight to the image edge in inconsistent ways).

Following the above reduces the need for per-product **`bagScale`** tweaks in code.

---

## 3. File delivery

- **Location:** Add files under **`public/`** so they are served as static assets (e.g. `/antigua-ember-front.png`).
- **Naming:** `{product-slug}-front.png` (kebab-case), e.g. `antigua-ember-front.png`, `inca-ascent-front.png`, `copan-rise-front.png`.
- **Format:** PNG or WebP with good quality; keep file sizes reasonable for web.

Avoid relying on long-lived third-party CDN URLs for hero tile art when you have a definitive brand asset — prefer **`public/`** for the home grid.

---

## 4. Wiring a new or updated product (checklist)

1. Export the image per **§2** and **§3**.
2. Copy the file into **`public/`** with the agreed name.
3. In **`src/pages/HomePage.jsx`**, find the product’s **`ProductTileMedia`** and set **`src="/your-file.png"`**.
4. Confirm **`alt`** text describes the product for accessibility.
5. Leave **`fit`** unset for single-bag tiles; use **`fit="contain"`** only for wide/multi-bag artwork.
6. If one tile still looks slightly larger or smaller than the others after deploy, ask dev to set **`bagScale`** on that tile only (e.g. `0.94` or `1.06`) — scaling is from the **bottom center** to match the layout.

---

## 5. Component behavior (summary)

- **`ProductTileMedia`** — `to`, `src`, `alt`, optional **`fit`** (`"contain"` for Volcanic-style only), optional **`bagScale`** (default `1`) for fine-tuning single-bag scale without re-exporting.
- **Ecwid / CTAs** — Product IDs and optional product page URLs live in **`src/config/ecwid.js`** and env (`VITE_*`); updating images does not change Ecwid, but new products must still be wired there when they go live.

---

## 6. What we intentionally avoid

- **No `object-cover` fill-crop** for single-bag hero tiles — it exaggerated size differences between photos.
- **No strong hover zoom** on single-bag images — it drew attention to inconsistent framing.

---

*Last aligned with implementation in `HomePage.jsx` (ProductTileMedia). If layout constants change (e.g. `max-h-[82%]`), update this doc in the same PR.*
