import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HOME_POPUP_DELAY_MS,
  HOME_PATHS,
  MAX_POPUP_IMPRESSIONS,
  OTHER_PAGE_POPUP_DELAY_MS,
  SUBSEQUENT_PAGE_SHOW_CHANCE,
  isPopupPathEligible,
} from '@/config/newsletterPopup';
import { readNewsletterPopupState } from '@/lib/newsletterPopupStorage';

function shouldSchedulePopup(pathname) {
  const state = readNewsletterPopupState();
  if (state.subscribed || state.impressionCount >= MAX_POPUP_IMPRESSIONS) return false;
  if (!isPopupPathEligible(pathname)) return false;
  if (state.pagesShown.includes(pathname)) return false;

  if (state.impressionCount === 0) {
    return HOME_PATHS.has(pathname);
  }

  if (HOME_PATHS.has(pathname)) return false;

  return Math.random() < SUBSEQUENT_PAGE_SHOW_CHANCE;
}

/**
 * Opens the promo popup on home after a short dwell, then up to two more times on
 * other pages (random), max 3 impressions total — see newsletterPopupStorage.
 */
export function useNewsletterPopupTrigger() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const firedRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
    firedRef.current = false;

    if (!shouldSchedulePopup(pathname)) return undefined;

    const state = readNewsletterPopupState();
    setMessageIndex(state.impressionCount);

    const isFirstHome = state.impressionCount === 0 && HOME_PATHS.has(pathname);
    const delayMs = isFirstHome ? HOME_POPUP_DELAY_MS : OTHER_PAGE_POPUP_DELAY_MS;

    const timer = window.setTimeout(() => {
      if (firedRef.current) return;

      const latest = readNewsletterPopupState();
      if (latest.subscribed || latest.impressionCount >= MAX_POPUP_IMPRESSIONS) return;
      if (latest.pagesShown.includes(pathname)) return;
      if (latest.impressionCount === 0 && !HOME_PATHS.has(pathname)) return;
      if (latest.impressionCount > 0 && HOME_PATHS.has(pathname)) return;

      firedRef.current = true;
      setMessageIndex(latest.impressionCount);
      setOpen(true);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return { open, setOpen, close, messageIndex, pathname };
}
