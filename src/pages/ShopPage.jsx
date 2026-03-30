import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import { useEcwid } from '@/context/EcwidContext';
import { ECWID_DEFAULT_CATEGORY_ID } from '@/config/ecwid';

const CONTAINER_ID = 'ecwid-store';

/**
 * Full Ecwid catalog embedded on your domain (categories, products, cart uses Ecwid checkout).
 */
const ShopPage = () => {
  const { ready } = useEcwid();
  const initialized = useRef(false);
  const [catalogMounted, setCatalogMounted] = useState(false);

  useEffect(() => {
    if (!ready || initialized.current) return;

    const run = () => {
      if (typeof window.xProductBrowser !== 'function') return;
      if (ECWID_DEFAULT_CATEGORY_ID) {
        window.xProductBrowser(
          'categoriesPerRow=3',
          `id=${CONTAINER_ID}`,
          `defaultCategoryId=${ECWID_DEFAULT_CATEGORY_ID}`
        );
      } else {
        window.xProductBrowser('categoriesPerRow=3', `id=${CONTAINER_ID}`);
      }
      initialized.current = true;
      setCatalogMounted(true);
    };

    if (window.Ecwid?.OnAPILoaded) {
      window.Ecwid.OnAPILoaded.add(run);
    } else {
      run();
    }
  }, [ready]);

  return (
    <>
      <Helmet>
        <title>Shop | Volcano Drip</title>
        <meta
          name="description"
          content="Browse Volcano Drip coffee — single-origin roasts from volcanic soil."
        />
      </Helmet>

      <div className="bg-stone-50 min-h-screen pt-8 pb-20 px-4">
        <div className="max-w-7xl mx-auto mb-10 text-center">
          <p className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-2">
            Coffee Shop
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
            Shop all roasts
          </h1>
          <p className="text-stone-600 mt-4 max-w-2xl mx-auto">
            Checkout, shipping, and payments are handled securely by Ecwid.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {!catalogMounted && (
            <div
              className="absolute inset-0 z-10 flex min-h-[480px] flex-col items-center justify-center gap-3 rounded-lg border border-stone-200 bg-white/95 px-6 text-center shadow-sm backdrop-blur-sm"
              role="status"
              aria-live="polite"
            >
              <Loader2 className="h-10 w-10 animate-spin text-amber-600" aria-hidden />
              <p className="text-sm font-medium text-stone-700">Loading catalog…</p>
              <p className="max-w-sm text-xs text-stone-500">
                If this takes a while, check that your store ID is set and the network allows Ecwid.
              </p>
            </div>
          )}
          <div
            id={CONTAINER_ID}
            className="min-h-[480px] rounded-lg border border-stone-200 bg-white p-4 shadow-sm md:p-8"
          />
        </div>
      </div>
    </>
  );
};

export default ShopPage;
