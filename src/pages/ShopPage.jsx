import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useEcwid } from '@/context/EcwidContext';
import { ECWID_DEFAULT_CATEGORY_ID } from '@/config/ecwid';

const CONTAINER_ID = 'ecwid-store';

/**
 * Full Ecwid catalog embedded on your domain (categories, products, cart uses Ecwid checkout).
 */
const ShopPage = () => {
  const { ready } = useEcwid();
  const initialized = useRef(false);

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

        <div
          id={CONTAINER_ID}
          className="max-w-7xl mx-auto min-h-[480px] bg-white rounded-lg border border-stone-200 p-4 md:p-8 shadow-sm"
        />
      </div>
    </>
  );
};

export default ShopPage;
