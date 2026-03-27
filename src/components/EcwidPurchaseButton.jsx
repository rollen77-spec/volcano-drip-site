import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEcwid } from '@/context/EcwidContext';

/** Dark product tiles on the home page */
const homeTileClass =
  'w-full bg-white hover:bg-stone-200 text-stone-900 font-bold h-10 rounded-none transition-colors';

/** Matches “Coming Soon” on origin pages (Peru, Indonesia, etc.) — amber on light background */
const originPageClass =
  'w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 px-8 rounded-none min-w-[160px]';

/**
 * Shared purchase action: Ecwid product URL in a new tab when `productPageUrl` is set,
 * otherwise Ecwid storefront `openPage('product')`. Use on the home tile and origin pages.
 */
const EcwidPurchaseButton = ({
  productId,
  productPageUrl = '',
  variant = 'home',
  className,
}) => {
  const baseClass =
    variant === 'origin' ? originPageClass : homeTileClass;
  const { openProduct } = useEcwid();

  const merged = cn(baseClass, className);

  if (productPageUrl) {
    return (
      <Button asChild className={merged}>
        <a href={productPageUrl} target="_blank" rel="noopener noreferrer">
          Add to cart
        </a>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      className={merged}
      onClick={() => openProduct(productId)}
    >
      Add to cart
    </Button>
  );
};

export default EcwidPurchaseButton;
