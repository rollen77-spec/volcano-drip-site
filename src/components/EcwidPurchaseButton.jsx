import React from 'react';
import { Button } from '@/components/ui/button';
import { useEcwid } from '@/context/EcwidContext';

const defaultClass =
  'w-full bg-white hover:bg-stone-200 text-stone-900 font-bold h-10 rounded-none transition-colors';

/**
 * Shared purchase action: Ecwid product URL in a new tab when `productPageUrl` is set,
 * otherwise Ecwid storefront `openPage('product')`. Use on the home tile and origin pages.
 */
const EcwidPurchaseButton = ({
  productId,
  productPageUrl = '',
  className = defaultClass,
}) => {
  const { openProduct } = useEcwid();

  if (productPageUrl) {
    return (
      <Button asChild className={className}>
        <a href={productPageUrl} target="_blank" rel="noopener noreferrer">
          Add to cart
        </a>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      className={className}
      onClick={() => openProduct(productId)}
    >
      Add to cart
    </Button>
  );
};

export default EcwidPurchaseButton;
