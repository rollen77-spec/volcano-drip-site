import { useEffect, useLayoutEffect, useRef } from 'react';
import { ECWID_PRODUCT_BY_ORIGIN, ECWID_STORE_ID } from '@/config/ecwid';

const SCRIPT_ID = 'ecwid-script-singleproduct-v2';

/**
 * Ecwid “single product v2” add-to-bag widget — Peru / Inca Ascent origin page only.
 * Matches Ecwid install code: ecsp-SingleProduct-v2 + script.js?singleproduct_v2 + xProduct().
 */
export default function EcwidIncaAscentSingleProductOrigin() {
  const bagRef = useRef(null);
  const productId = ECWID_PRODUCT_BY_ORIGIN.peru;

  useEffect(() => {
    if (!productId) return;

    const runXProduct = () => {
      requestAnimationFrame(() => {
        if (typeof window.xProduct === 'function') {
          window.xProduct();
        }
      });
    };

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      runXProduct();
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    script.setAttribute('data-cfasync', 'false');
    script.src = `https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=singleproduct_v2`;
    script.onload = runXProduct;
    document.body.appendChild(script);
  }, [productId]);

  useLayoutEffect(() => {
    bagRef.current?.setAttribute('customprop', 'addtobag');
  }, [productId]);

  if (!productId) return null;

  return (
    <div
      className={`ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${productId} w-full flex justify-center`}
      itemScope
      itemType="http://schema.org/Product"
      data-single-product-id={productId}
    >
      <div className="ecsp-title" itemProp="name" style={{ display: 'none' }}>
        Inca Ascent
      </div>
      <div ref={bagRef} />
    </div>
  );
}
