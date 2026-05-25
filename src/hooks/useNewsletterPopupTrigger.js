import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getPopupDelayMs,
  getSubsequentShowChance,
  HOME_PATHS,
  isPopupPathEligible,
  MAX_POPUP_IMPRESSIONS,
} from '@/config/newsletterPopup';
import {
  hasShownOnPage,
  normalizePopupPath,
  readNewsletterPopupState,
} from '@/lib/newsletterPopupStorage';

function canScheduleForPath(path) {
  const state = readNewsletterPopupState();
  if (state.subscribed || state.impressionCount >= MAX_POPUP_IMPRESSIONS) return false;
  if (!isPopupPathEligible(path)) return false;
  if (hasShownOnPage(path)) return false;

  if (state.impressionCount === 0) {
    return HOME_PATHS.has(path);
  }

  if (HOME_PATHS.has(path)) return false;

  return true;
}

/**
 * Opens the promo popup on home after a short dwell, then up to two more times on
 * other pages (random), max 3 impressions total — see newsletterPopupStorage.
 */
export function useNewsletterPopupTrigger() {
  const { pathname } = useLocation();
  const path = normalizePopupPath(pathname);
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const timerRef = useRef(null);
  const pathRef = useRef(path);

  const close = useCallback(() => setOpen(false), []);

  const tryOpen = useCallback(() => {
    const latest = readNewsletterPopupState();
    if (latest.subscribed || latest.impressionCount >= MAX_POPUP_IMPRESSIONS) return;
    if (hasShownOnPage(pathRef.current)) return;

    const isFirstHome = latest.impressionCount === 0 && HOME_PATHS.has(pathRef.current);
    if (latest.impressionCount === 0 && !isFirstHome) return;
    if (latest.impressionCount > 0 && HOME_PATHS.has(pathRef.current)) return;

    if (latest.impressionCount > 0 && Math.random() >= getSubsequentShowChance()) {
      return;
    }

    setMessageIndex(latest.impressionCount);
    setOpen(true);
  }, []);

  const schedulePopup = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!canScheduleForPath(pathRef.current)) return;

    const state = readNewsletterPopupState();
    const isFirstHome = state.impressionCount === 0 && HOME_PATHS.has(pathRef.current);
    const delayMs = getPopupDelayMs(isFirstHome);

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      if (document.visibilityState === 'hidden') return;
      tryOpen();
    }, delayMs);
  }, [tryOpen]);

  useEffect(() => {
    pathRef.current = path;

    if (!canScheduleForPath(path)) {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return undefined;
    }

    const state = readNewsletterPopupState();
    setMessageIndex(state.impressionCount);
    schedulePopup();

    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      schedulePopup();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [path, schedulePopup]);

  return { open, setOpen, close, messageIndex, pathname: path };
}
