/**
 * Ecwid storefront configuration.
 * Set VITE_ECWID_STORE_ID in .env (see .env.example). Product IDs come from your Ecwid admin (Catalog → product → ID in URL or product details).
 */

export const ECWID_STORE_ID =
  import.meta.env.VITE_ECWID_STORE_ID || '133781758';

/** Optional default category for the embedded catalog on /shop (leave empty to show root categories). */
export const ECWID_DEFAULT_CATEGORY_ID =
  import.meta.env.VITE_ECWID_DEFAULT_CATEGORY_ID || '';

/**
 * Map origin page keys to Ecwid product IDs when you have a matching product in Ecwid.
 * Add env vars or edit strings here as you publish products.
 */
export const ECWID_PRODUCT_BY_ORIGIN = {
  'costa-rica': import.meta.env.VITE_ECWID_PRODUCT_COSTA_RICA || '',
  'guatemala': import.meta.env.VITE_ECWID_PRODUCT_GUATEMALA || '825208083',
  'indonesia': import.meta.env.VITE_ECWID_PRODUCT_INDONESIA || '825206117',
  'peru': import.meta.env.VITE_ECWID_PRODUCT_PERU || '825208084',
  'honduras': import.meta.env.VITE_ECWID_PRODUCT_HONDURAS || '825208085',
};

/**
 * Full URL to Antigua Ember on Ecwid (Catalog → product → open in browser → copy address bar).
 * Used for the home tile button and Shop → Guatemala. Opens in a new tab.
 */
export const ECWID_GUATEMALA_PRODUCT_URL =
  import.meta.env.VITE_ECWID_GUATEMALA_PRODUCT_URL || '';

/**
 * Full URL to Copán Rise on Ecwid (optional). Same behavior as Guatemala:
 * when set, Add to cart opens this URL in a new tab; otherwise uses in-site Ecwid product page.
 */
export const ECWID_HONDURAS_PRODUCT_URL =
  import.meta.env.VITE_ECWID_HONDURAS_PRODUCT_URL || '';

/**
 * Full URL to Inca Ascent on Ecwid (optional). Same pattern as Guatemala / Honduras.
 */
export const ECWID_PERU_PRODUCT_URL =
  import.meta.env.VITE_ECWID_PERU_PRODUCT_URL || '';

/** Primera Luz (Costa Rica) — Ecwid product page URL for home “View Details”. */
export const ECWID_COSTA_RICA_PRODUCT_URL =
  import.meta.env.VITE_ECWID_COSTA_RICA_PRODUCT_URL || '';

/**
 * Sumatra Black (Indonesia) — full Ecwid product URL (optional). Same as Guatemala / Honduras:
 * when set, buttons open this URL in a new tab; otherwise `openProduct` uses the catalog product ID.
 */
export const ECWID_INDONESIA_PRODUCT_URL =
  import.meta.env.VITE_ECWID_INDONESIA_PRODUCT_URL || '';

/**
 * Volcanic Origins subscription — Ecwid product URL when set (home tile).
 * Falls back to openProduct(SUBSCRIPTION_PRODUCT_ID) when only ID is set.
 */
export const ECWID_SUBSCRIPTION_PRODUCT_URL =
  import.meta.env.VITE_ECWID_SUBSCRIPTION_PRODUCT_URL || '';

/** Subscription / club product in Ecwid (for the subscription page embed). */
export const ECWID_SUBSCRIPTION_PRODUCT_ID =
  import.meta.env.VITE_ECWID_SUBSCRIPTION_PRODUCT_ID || '';
