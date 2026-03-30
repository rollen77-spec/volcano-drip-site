/**
 * Canonical site URL for SEO and JSON-LD.
 * Set VITE_SITE_URL in production; otherwise uses the browser origin when available.
 */
export function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (fromEnv && String(fromEnv).trim()) {
    return String(fromEnv).replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return '';
}
