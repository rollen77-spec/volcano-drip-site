/**
 * Display prices shown on marketing pages (USD).
 * Keep aligned with your Ecwid catalog; override via env if needed.
 */
export const PRICE_BAG_DISPLAY =
  import.meta.env.VITE_PRICE_BAG_DISPLAY?.trim() || '$19.99';

export const PRICE_SUBSCRIPTION_MONTHLY_DISPLAY =
  import.meta.env.VITE_PRICE_SUBSCRIPTION_MONTHLY_DISPLAY?.trim() || '$67.99';
