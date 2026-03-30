import React from 'react';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useEcwid } from '@/context/EcwidContext';

/** Dark product tiles on the home page */
const homeTileClass =
  'w-full bg-white hover:bg-stone-200 text-stone-900 font-bold h-10 rounded-none transition-colors';

/** Origin page primary CTA — amber on light background (used when Ecwid product is configured). */
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
  /** Home tiles often use "Shop this roast"; origin pages use "Add to cart". */
  label,
}) => {
  const baseClass =
    variant === 'origin' ? originPageClass : homeTileClass;
  const { openCart, openProduct } = useEcwid();
  const text = label ?? 'Add to cart';

  const merged = cn(baseClass, className);

  const hasId =
    productId !== undefined &&
    productId !== null &&
    String(productId).trim() !== '';
  if (!productPageUrl && !hasId) {
    return null;
  }

  if (productPageUrl) {
    return (
      <Button asChild className={merged}>
        <a
          href={productPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            toast({
              title: 'Opening our store',
              description: 'Complete size and options in the new tab.',
            });
          }}
        >
          {text}
        </a>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      className={merged}
      onClick={() => {
        openProduct(productId);
        toast({
          title: 'Product opened',
          description: 'Choose options in the store window, then add to cart.',
          action: (
            <ToastAction altText="Open shopping cart" onClick={() => openCart()}>
              View cart
            </ToastAction>
          ),
        });
      }}
    >
      {text}
    </Button>
  );
};

export default EcwidPurchaseButton;
