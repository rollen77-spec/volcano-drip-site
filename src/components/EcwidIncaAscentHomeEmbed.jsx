import { useEffect, useRef } from 'react';
import { ECWID_PRODUCT_BY_ORIGIN, ECWID_STORE_ID } from '@/config/ecwid';
import { useEcwid } from '@/context/EcwidContext';

/** Ecwid install-code storefront options (Inca Ascent product view). */
function applyIncaAscentStorefrontOptions() {
  window.ec = window.ec || {};
  window.ec.storefront = window.ec.storefront || {};
  const s = window.ec.storefront;
  s.enable_navigation = true;
  s.product_details_layout = 'TWO_COLUMNS_SIDEBAR_ON_THE_RIGHT';
  s.product_details_gallery_layout = 'IMAGE_SINGLE_THUMBNAILS_HORIZONTAL';
  s.product_details_two_columns_with_right_sidebar_show_product_description_on_sidebar = false;
  s.product_details_two_columns_with_left_sidebar_show_product_description_on_sidebar = false;
  s.product_details_show_product_name = true;
  s.product_details_show_breadcrumbs = true;
  s.product_details_show_product_sku = false;
  s.product_details_show_product_price = true;
  s.product_details_show_in_stock_label = true;
  s.product_details_show_number_of_items_in_stock = true;
  s.product_details_show_qty = false;
  s.product_details_show_wholesale_prices = true;
  s.product_details_show_product_options = true;
  s.product_details_show_product_description = true;
  s.product_details_show_delivery_time = undefined;
  s.product_details_show_share_buttons = true;
  s.product_details_position_product_name = 100;
  s.product_details_position_breadcrumbs = 200;
  s.product_details_position_product_sku = 300;
  s.product_details_position_product_price = 400;
  s.product_details_position_product_options = 500;
  s.product_details_position_buy_button = 700;
  s.product_details_position_wholesale_prices = 800;
  s.product_details_position_product_description = 1000;
  s.product_details_position_delivery_time = undefined;
  s.product_details_position_share_buttons = 900;
  s.product_details_position_subtitle = 600;
  s.product_details_show_subtitle = true;
}

const INCA_SLUG = 'inca-ascent';

function runProductBrowser(containerId, productId) {
  if (typeof window.xProductBrowser !== 'function') return false;
  window.xProductBrowser(
    'categoriesPerRow=3',
    'views=grid(20,3) list(60) table(60)',
    'categoryView=grid',
    'searchView=list',
    `defaultProductId=${productId}`,
    `defaultSlug=${INCA_SLUG}`,
    `id=${containerId}`
  );
  return true;
}

/**
 * Ecwid product browser for Inca Ascent — home page tile only (not /origins/peru).
 * Relies on EcwidProvider’s global script; container id is unique vs other widgets.
 */
export default function EcwidIncaAscentHomeEmbed() {
  const { ready } = useEcwid();
  const ran = useRef(false);
  const productId = ECWID_PRODUCT_BY_ORIGIN.peru;
  const containerId = `my-store-${ECWID_STORE_ID}-inca-home`;

  useEffect(() => {
    if (!ready || !productId || ran.current) return;

    const init = () => {
      if (ran.current) return;
      applyIncaAscentStorefrontOptions();
      if (runProductBrowser(containerId, productId)) {
        ran.current = true;
      }
    };

    if (window.Ecwid?.OnAPILoaded) {
      window.Ecwid.OnAPILoaded.add(init);
    } else {
      init();
    }

    const fallback = setTimeout(() => {
      if (ran.current || typeof window.xProductBrowser !== 'function') return;
      applyIncaAscentStorefrontOptions();
      if (runProductBrowser(containerId, productId)) ran.current = true;
    }, 500);

    return () => clearTimeout(fallback);
  }, [ready, containerId, productId]);

  return (
    <div className="w-full min-h-[100px] max-h-[min(70vh,520px)] overflow-y-auto overflow-x-hidden [&_.ec-store]:text-left">
      <div id={containerId} className="ecwid-inca-ascent-home-root" />
    </div>
  );
}
