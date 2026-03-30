import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ECWID_STORE_ID } from '@/config/ecwid';

const EcwidContext = createContext({
  ready: false,
  openCart: () => {},
  openProduct: () => {},
  initEcwidWidgets: () => {},
});

const SCRIPT_ID = 'ecwid-script-code';

/** Renders `ec-cart-widget`, product browser, etc. Required for mini-cart item count. */
function runEcwidInit() {
  if (typeof window === 'undefined' || typeof window.Ecwid?.init !== 'function') {
    return;
  }
  try {
    window.Ecwid.init();
  } catch {
    /* Ecwid may throw if DOM not ready; retry on next navigation */
  }
}

export function EcwidProvider({ children }) {
  const [ready, setReady] = useState(false);

  const initEcwidWidgets = useCallback(() => {
    runEcwidInit();
  }, []);

  useEffect(() => {
    const markReady = () => setReady(true);

    const attachWhenLoaded = () => {
      if (typeof window === 'undefined' || !window.Ecwid) return;
      window.Ecwid.OnAPILoaded.add(markReady);
    };

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      attachWhenLoaded();
      if (window.Ecwid?.getAppParam?.('storeId')) {
        markReady();
      }
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    script.setAttribute('data-cfasync', 'false');
    script.src = `https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=code`;
    script.onload = attachWhenLoaded;
    document.body.appendChild(script);
  }, []);

  /** After API is ready, init widgets so `.ec-cart-widget` mounts with live cart count. */
  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => {
      runEcwidInit();
    });
    return () => cancelAnimationFrame(id);
  }, [ready]);

  const openCart = useCallback(() => {
    if (typeof window !== 'undefined' && window.Ecwid?.openPage) {
      window.Ecwid.openPage('cart');
    }
  }, []);

  const openProduct = useCallback((productId) => {
    if (!productId || typeof window === 'undefined' || !window.Ecwid?.openPage) {
      return;
    }
    const id = Number.parseInt(String(productId), 10);
    if (Number.isNaN(id)) return;
    window.Ecwid.openPage('product', { id });
  }, []);

  const value = useMemo(
    () => ({ ready, openCart, openProduct, initEcwidWidgets }),
    [ready, openCart, openProduct, initEcwidWidgets]
  );

  return (
    <EcwidContext.Provider value={value}>{children}</EcwidContext.Provider>
  );
}

export function useEcwid() {
  return useContext(EcwidContext);
}
