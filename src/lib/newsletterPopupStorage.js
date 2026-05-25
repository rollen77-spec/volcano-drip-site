const STORAGE_KEY = 'vd_newsletter_popup_v1';

const DEFAULT_STATE = {
  impressionCount: 0,
  subscribed: false,
  pagesShown: [],
};

/** Normalize paths so `/` and trailing slashes match consistently (mobile routers). */
export function normalizePopupPath(pathname) {
  if (!pathname || pathname === '/') return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

export function readNewsletterPopupState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return {
      impressionCount: Number(parsed.impressionCount) || 0,
      subscribed: Boolean(parsed.subscribed),
      pagesShown: Array.isArray(parsed.pagesShown)
        ? parsed.pagesShown.map(normalizePopupPath)
        : [],
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function writeNewsletterPopupState(state) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...state,
        pagesShown: state.pagesShown.map(normalizePopupPath),
      }),
    );
  } catch {
    /* private mode / quota */
  }
}

export function markNewsletterSubscribed() {
  const state = readNewsletterPopupState();
  writeNewsletterPopupState({ ...state, subscribed: true });
}

export function recordPopupImpression(pathname) {
  const path = normalizePopupPath(pathname);
  const state = readNewsletterPopupState();
  const pagesShown = state.pagesShown.includes(path) ? state.pagesShown : [...state.pagesShown, path];
  writeNewsletterPopupState({
    ...state,
    impressionCount: state.impressionCount + 1,
    pagesShown,
  });
}

export function hasShownOnPage(pathname) {
  const path = normalizePopupPath(pathname);
  return readNewsletterPopupState().pagesShown.includes(path);
}
