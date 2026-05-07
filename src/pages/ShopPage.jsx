import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import { useEcwid } from '@/context/EcwidContext';
import { ECWID_DEFAULT_CATEGORY_ID } from '@/config/ecwid';
import PageHero from '@/components/PageHero';

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

      <div className="min-h-screen bg-stone-50 pb-20 pt-0">
        <PageHero
          kicker="Coffee shop"
          title={
            <>
              SHOP ALL
              <br />
              ROASTS.
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=2000"
          imageAlt="Coffee beans"
          overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/60"
          size="compact"
          sectionClassName="py-16 md:py-20 min-h-[280px]"
        >
          <p className="mx-auto max-w-2xl text-lg text-stone-200">
            Checkout, shipping, and payments are handled securely by Ecwid.
          </p>
        </PageHero>

        <div className="px-4 pt-10">
        <div className="relative mx-auto max-w-7xl">
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
      </div>
    </>
  );
};

export default ShopPage;
