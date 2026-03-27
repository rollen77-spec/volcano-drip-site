import React, { useEffect, useState } from 'react';
import { ECWID_STORE_ID } from '@/config/ecwid';
import { useEcwid } from '@/context/EcwidContext';

let singleProductFallbackLoaded = false;

/**
 * Single-product Ecwid widget (add to bag). Requires EcwidProvider (global script).
 */
const EcwidProduct = ({ productId, productName = 'Product' }) => {
  const { ready } = useEcwid();
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (!ready || !productId) return undefined;

    const initSingleProduct = () => {
      try {
        if (typeof window.xProduct === 'function') {
          window.xProduct();
          return;
        }
      } catch (e) {
        console.error('Ecwid xProduct failed', e);
      }

      const fallbackId = 'ecwid-singleproduct-fallback';
      if (singleProductFallbackLoaded || document.getElementById(fallbackId)) return;
      singleProductFallbackLoaded = true;

      const script = document.createElement('script');
      script.id = fallbackId;
      script.type = 'text/javascript';
      script.async = true;
      script.charset = 'utf-8';
      script.setAttribute('data-cfasync', 'false');
      script.src = `https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=singleproduct_v2`;
      script.onload = () => {
        if (typeof window.xProduct === 'function') {
          window.xProduct();
        }
      };
      script.onerror = () => {
        console.error('Failed to load Ecwid single-product script.');
        setScriptError(true);
      };
      document.body.appendChild(script);
    };

    if (window.Ecwid?.OnAPILoaded) {
      window.Ecwid.OnAPILoaded.add(initSingleProduct);
      return undefined;
    }

    initSingleProduct();
    return undefined;
  }, [ready, productId]);

  if (!productId) {
    return null;
  }

  if (scriptError) {
    return (
      <div className="w-full p-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm text-center">
        Failed to load the store. Please refresh the page or try again later.
      </div>
    );
  }

  return (
    <div className="ecwid-container w-full min-h-[60px] flex items-center justify-center bg-white rounded-sm">
      <div
        className={`ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${productId}`}
        itemScope
        itemType="http://schema.org/Product"
        data-single-product-id={productId}
      >
        <div
          className="ecsp-title"
          itemProp="name"
          style={{ display: 'none' }}
          content={productName}
        />
        <div data-ecwid-product="addtobag" />
      </div>
    </div>
  );
};

export default EcwidProduct;
