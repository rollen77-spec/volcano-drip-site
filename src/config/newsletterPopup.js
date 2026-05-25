/** Site-wide newsletter promo popup — copy, timing, and route rules. */

export const NEWSLETTER_POPUP_IMAGE = '/images/newsletter-popup-hero.png';

export const MAX_POPUP_IMPRESSIONS = 3;

/** First popup on home after dwell. */
export const HOME_POPUP_DELAY_MS = 5000;
export const HOME_POPUP_DELAY_MOBILE_MS = 3500;

/** Later popups on other pages (after dismiss). */
export const OTHER_PAGE_POPUP_DELAY_MS = 6000;
export const OTHER_PAGE_POPUP_DELAY_MOBILE_MS = 4000;

/** Chance to show on a new eligible page (impressions 2–3) — higher on mobile. */
export const SUBSEQUENT_PAGE_SHOW_CHANCE = 0.45;
export const SUBSEQUENT_PAGE_SHOW_CHANCE_MOBILE = 0.85;

export const POPUP_EXCLUDED_PATHS = new Set([
  '/offers',
  '/thanks',
  '/success',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cookies',
]);

export const HOME_PATHS = new Set(['/', '/store']);

/** Three variants — always lead with 20% off first order. */
export const POPUP_MESSAGES = [
  {
    id: 'welcome',
    headline: 'Welcome to Volcano Drip',
    body: 'Join our newsletter and get 20% off your first order—roasted to order, shipped fresh.',
  },
  {
    id: 'first-cup',
    headline: 'Your first cup, on us',
    body: 'New subscribers unlock 20% off their first purchase. Volcanic single-origin coffee, small-batch roasted in Canada.',
  },
  {
    id: 'dont-miss',
    headline: "Don't miss the eruption",
    body: 'Get 20% off your first order plus brewing tips and early access to limited releases.',
  },
];

export function getPopupMessage(impressionIndex) {
  const i = Math.max(0, impressionIndex) % POPUP_MESSAGES.length;
  return POPUP_MESSAGES[i];
}

export function isPopupPathEligible(pathname) {
  if (!pathname) return false;
  const path = pathname.replace(/\/+$/, '') || '/';
  if (POPUP_EXCLUDED_PATHS.has(path)) return false;
  return true;
}

export function isMobileViewport() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

export function getPopupDelayMs(isFirstHome) {
  const mobile = isMobileViewport();
  if (isFirstHome) return mobile ? HOME_POPUP_DELAY_MOBILE_MS : HOME_POPUP_DELAY_MS;
  return mobile ? OTHER_PAGE_POPUP_DELAY_MOBILE_MS : OTHER_PAGE_POPUP_DELAY_MS;
}

export function getSubsequentShowChance() {
  return isMobileViewport() ? SUBSEQUENT_PAGE_SHOW_CHANCE_MOBILE : SUBSEQUENT_PAGE_SHOW_CHANCE;
}
