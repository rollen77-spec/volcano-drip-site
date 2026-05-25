const STORAGE_KEY = 'vd_newsletter_popup_v1';

const DEFAULT_STATE = {
  impressionCount: 0,
  subscribed: false,
  pagesShown: [],
};

export function readNewsletterPopupState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return {
      impressionCount: Number(parsed.impressionCount) || 0,
      subscribed: Boolean(parsed.subscribed),
      pagesShown: Array.isArray(parsed.pagesShown) ? parsed.pagesShown : [],
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function writeNewsletterPopupState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode / quota */
  }
}

export function markNewsletterSubscribed() {
  const state = readNewsletterPopupState();
  writeNewsletterPopupState({ ...state, subscribed: true });
}

export function recordPopupImpression(pathname) {
  const state = readNewsletterPopupState();
  const pagesShown = state.pagesShown.includes(pathname)
    ? state.pagesShown
    : [...state.pagesShown, pathname];
  writeNewsletterPopupState({
    ...state,
    impressionCount: state.impressionCount + 1,
    pagesShown,
  });
}
