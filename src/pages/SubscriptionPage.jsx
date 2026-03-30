import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Flame, Coffee, Mountain, Truck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import EcwidPurchaseButton from '@/components/EcwidPurchaseButton';
import { ECWID_SUBSCRIPTION_PRODUCT_ID, ECWID_SUBSCRIPTION_PRODUCT_URL } from '@/config/ecwid';

const SubscriptionPage = () => {
  const membershipFeatures = [
    {
      icon: <Coffee className="w-8 h-8 text-amber-500" />,
      text: '4 rotating single-origin coffees each month',
    },
    {
      icon: <Flame className="w-8 h-8 text-amber-500" />,
      text: 'Fresh small-batch roasting when order is received',
    },
    {
      icon: <Mountain className="w-8 h-8 text-amber-500" />,
      text: 'Coffees from renowned volcanic growing regions',
    },
    {
      icon: <Truck className="w-8 h-8 text-amber-500" />,
      text: 'Delivered automatically to your door',
    },
  ];

  return (
    <>
      <Helmet>
        <title>The Volcanic Origins Box - Coffee Subscription | Volcano Drip</title>
        <meta
          name="description"
          content="Join the Volcanic Origins Club. Ignite your mornings with our monthly coffee subscription."
        />
      </Helmet>

      <div className="min-h-screen bg-stone-50">
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-stone-900 text-white">
          <div className="absolute inset-0 z-0 opacity-50">
            <img
              alt="Dark moody coffee pour over with steam"
              className="w-full h-full object-cover"
              src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/origins-club---no-title---final-vXhJs.jpeg"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

          <div className="relative z-20 text-center max-w-4xl px-4 mt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-1 border border-amber-500/50 rounded-full bg-amber-500/10 backdrop-blur-md text-amber-400 font-bold tracking-widest text-xs uppercase"
            >
              Volcanic Origins Club
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
            >
              Ignite your mornings with{' '}
              <span className="text-amber-500">explosive flavour</span>.
            </motion.h1>
          </div>
        </section>

        <section className="py-24 px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-6 text-center">
              Join the Volcanic Origins Club
            </h2>

            <div className="w-full mb-16">
              <p className="text-xl text-stone-600 mb-10 text-center max-w-2xl mx-auto leading-relaxed">
                Discover four exceptional single-origin coffees every month, roasted fresh and delivered to your door.
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px bg-stone-200 flex-1 max-w-[100px]" />
                <h3 className="text-sm font-bold tracking-widest uppercase text-stone-400">
                  Membership Includes
                </h3>
                <div className="h-px bg-stone-200 flex-1 max-w-[100px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {membershipFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-stone-100 transition-all duration-300 flex items-start gap-5 group"
                  >
                    <div className="bg-stone-50 p-4 rounded-xl flex-shrink-0 group-hover:bg-amber-50 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <p className="text-stone-700 font-medium leading-relaxed pt-2">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-stone-900 text-white p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-2xl mx-auto">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Flame className="w-64 h-64 -mt-10 -mr-10" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  The Volcanic Origins Box
                </h3>

                {ECWID_SUBSCRIPTION_PRODUCT_ID || ECWID_SUBSCRIPTION_PRODUCT_URL ? (
                  <div className="mx-auto w-full max-w-md">
                    <EcwidPurchaseButton
                      variant="origin"
                      productId={ECWID_SUBSCRIPTION_PRODUCT_ID}
                      productPageUrl={ECWID_SUBSCRIPTION_PRODUCT_URL}
                      label="Add to cart"
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-center py-6">
                    <AlertCircle className="w-10 h-10 text-amber-500" />
                    <p className="text-stone-300 text-sm max-w-md">
                      Add your subscription product in Ecwid, then set{' '}
                      <code className="text-amber-400 text-xs">VITE_ECWID_SUBSCRIPTION_PRODUCT_ID</code>
                      {' '}or{' '}
                      <code className="text-amber-400 text-xs">VITE_ECWID_VOLCANIC_ORIGINS_BOX</code>{' '}
                      in your <code className="text-amber-400 text-xs">.env</code> (see{' '}
                      <code className="text-amber-400 text-xs">.env.example</code>). The site defaults to
                      product ID 825519010 when unset.
                    </p>
                    <Link
                      to="/shop"
                      className="text-amber-500 font-semibold hover:underline"
                    >
                      Browse the shop
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default SubscriptionPage;
