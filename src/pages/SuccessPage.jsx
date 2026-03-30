import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Receipt } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function SuccessPage() {
  const location = useLocation();
  const orderData = location.state;

  return (
    <>
      <Helmet>
        <title>Order Confirmed | Volcano Drip</title>
      </Helmet>
      
      <div className="min-h-[80vh] flex flex-col items-center py-20 px-4 bg-stone-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl w-full text-center space-y-8"
        >
          <div className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center mx-auto shadow-xl">
            <Check className="h-10 w-10 text-amber-500" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-stone-900 tracking-tight">Order Confirmed</h1>
            <p className="text-lg text-stone-500 leading-relaxed">
              The eruption is imminent. Your coffee has been secured and will be on its way to you shortly.
            </p>
          </div>

          {/* Order Summary Details if available from the checkout flow */}
          {orderData && orderData.items && orderData.items.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-xl p-6 text-left shadow-sm mt-8">
              <div className="flex items-center gap-2 mb-4 text-stone-900 font-bold border-b border-stone-100 pb-4">
                <Receipt className="w-5 h-5 text-amber-600" />
                <h3>Order Summary</h3>
              </div>
              
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-200">
                {orderData.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-stone-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 leading-tight">{item.product.title}</p>
                        <p className="text-stone-500 text-xs mt-1">
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
              
              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center">
                <span className="font-bold text-stone-500">Total Paid</span>
                <span className="text-xl font-black text-stone-900">{orderData.orderTotal}</span>
              </div>
            </div>
          )}

          <div className="pt-8 mt-8 border-t border-stone-200">
            <Link to="/">
              <Button className="w-full h-14 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-lg shadow-lg shadow-stone-900/10">
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