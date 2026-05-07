import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Receipt } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/PageHero';

function SuccessPage() {
  const location = useLocation();
  const orderData = location.state;

  return (
    <>
      <Helmet>
        <title>Order Confirmed | Volcano Drip</title>
      </Helmet>

      <PageHero
        size="compact"
        kicker="Order status"
        title="Order Confirmed."
        imageSrc="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2000"
        imageAlt=""
        overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/60"
      />

      <div className="flex min-h-[50vh] flex-col items-center bg-stone-50 px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-xl space-y-8 text-center"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-stone-900 shadow-xl">
            <Check className="h-10 w-10 text-amber-500" />
          </div>

          <p className="text-lg leading-relaxed text-stone-500">
            The eruption is imminent. Your coffee has been secured and will be on its way to you shortly.
          </p>

          {/* Order Summary Details if available from the checkout flow */}
          {orderData && orderData.items && orderData.items.length > 0 && (
            <div className="mt-8 rounded-xl border border-stone-200 bg-white p-6 text-left shadow-sm">
              <div className="mb-4 flex items-center gap-2 border-b border-stone-100 pb-4 font-bold text-stone-900">
                <Receipt className="h-5 w-5 text-amber-600" />
                <h2 className="text-lg">Order Summary</h2>
              </div>

              <div className="scrollbar-thin scrollbar-thumb-stone-200 max-h-60 space-y-4 overflow-y-auto pr-2">
                {orderData.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-stone-100">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold leading-tight text-stone-900">{item.product.title}</p>
                        <p className="mt-1 text-xs text-stone-500">
                          Qty: {item.quantity}
                          {item.grind && ` • ${item.grind}`}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium text-stone-900">
                      {item.variant.sale_price_formatted || item.variant.price_formatted}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                <span className="font-bold text-stone-500">Total Paid</span>
                <span className="text-xl font-black text-stone-900">{orderData.orderTotal}</span>
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-stone-200 pt-8">
            <Link to="/">
              <Button className="h-14 w-full rounded-md bg-stone-900 text-lg text-white shadow-lg shadow-stone-900/10 hover:bg-stone-800">
                Return to Shop <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default SuccessPage;