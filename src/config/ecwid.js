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
  'indonesia': import.meta.env.VITE_ECWID_PRODUCT_INDONESIA || '',
  'peru': import.meta.env.VITE_ECWID_PRODUCT_PERU || '',
  'honduras': import.meta.env.VITE_ECWID_PRODUCT_HONDURAS || '',
};

/**
 * Full URL to Antigua Ember on Ecwid (Catalog → product → open in browser → copy address bar).
 * Used for the home tile button and Shop → Guatemala. Opens in a new tab.
 */
export const ECWID_GUATEMALA_PRODUCT_URL =
  import.meta.env.VITE_ECWID_GUATEMALA_PRODUCT_URL || '';

/** Subscription / club product in Ecwid (for the subscription page embed). */
export const ECWID_SUBSCRIPTION_PRODUCT_ID =
  import.meta.env.VITE_ECWID_SUBSCRIPTION_PRODUCT_ID || '';
