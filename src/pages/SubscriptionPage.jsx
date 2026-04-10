import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Flame, Coffee, Mountain, Truck, AlertCircle, Sparkles, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import EcwidPurchaseButton from '@/components/EcwidPurchaseButton';
import { ECWID_SUBSCRIPTION_PRODUCT_ID, ECWID_SUBSCRIPTION_PRODUCT_URL } from '@/config/ecwid';
import { bagOnScale, subscriptionBoxDelivered } from '@/assets/subscription';

const lineup = [
  { name: 'Inca Ascent', origin: 'Peru', roast: 'Medium', note: 'Fairtrade Organic · Citrus, apricot, cocoa' },
  { name: 'Antigua Ember', origin: 'Guatemala', roast: 'Medium', note: 'Cocoa, caramel, cinnamon' },
  { name: 'Sumatra Black', origin: 'Indonesia', roast: 'Dark', note: 'Dark chocolate, cedar, tobacco' },
  { name: 'Primera Luz', origin: 'Costa Rica', roast: 'Light', note: 'Cocoa, caramel, apricot' },
];

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

const PurchaseCard = () => (
  <div className="bg-stone-900 text-white p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-lg mx-auto">
    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
      <Flame className="w-64 h-64 -mt-10 -mr-10" />
    </div>
    <div className="relative z-10">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">The Volcanic Origins Box</h3>
      <p className="text-stone-400 text-sm text-center mb-8">Subscribe monthly · change or cancel anytime</p>

      {ECWID_SUBSCRIPTION_PRODUCT_ID || ECWID_SUBSCRIPTION_PRODUCT_URL ? (
        <div className="mx-auto w-full max-w-md">
          <EcwidPurchaseButton
            variant="origin"
            productId={ECWID_SUBSCRIPTION_PRODUCT_ID}
            productPageUrl={ECWID_SUBSCRIPTION_PRODUCT_URL}
            label="Add subscription to cart"
            className="w-full text-lg py-4"
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
            <code className="text-amber-400 text-xs">.env.example</code>). The site defaults to product ID
            825519010 when unset.
          </p>
          <Link to="/shop" className="text-amber-500 font-semibold hover:underline">
            Browse the shop
          </Link>
        </div>
      )}
    </div>
  </div>
);

const SubscriptionPage = () => {
  return (
    <>
      <Helmet>
        <title>Volcanic Origins Subscription | Volcano Drip</title>
        <meta
          name="description"
          content="Subscribe to the Volcanic Origins Box and save up to 15%. Build your custom 4-bag box—region, roast, and grind. Fresh coffee delivered monthly."
        />
      </Helmet>

      <div className="min-h-screen bg-stone-50">
        <section className="relative min-h-[55vh] md:min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-stone-900 text-white pb-16 pt-24">
          <div className="absolute inset-0 z-0 opacity-45">
            <img
              alt=""
              className="w-full h-full object-cover"
              src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/origins-club---no-title---final-vXhJs.jpeg"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-stone-900/80 via-stone-900/70 to-stone-900" />

          <div className="relative z-20 text-center max-w-3xl px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 border border-amber-500/50 rounded-full bg-amber-500/10 backdrop-blur-md text-amber-400 font-bold tracking-widest text-xs uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Save up to 15% as a member
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-tight"
            >
              Your custom 4-bag box,{' '}
              <span className="text-amber-500">delivered monthly</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Choose region, roast, and grind—or trust our picks. Fresh Volcano Drip single origins, roasted when you
              order.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <a
                href="#subscribe-box"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-stone-950 font-bold text-base hover:bg-amber-400 transition-colors shadow-lg shadow-amber-900/30"
              >
                Get the Volcanic Origins Box
                <ArrowDown className="w-5 h-5" aria-hidden />
              </a>
            </motion.div>
          </div>
        </section>

        <section className="relative z-30 -mt-10 px-4 pb-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-amber-500 bg-stone-900 px-6 py-8 md:px-10 md:py-10 shadow-xl text-center mb-14 md:mb-16"
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug">
              Subscribe to the Volcanic Origins Box and{' '}
              <span className="text-amber-400">save up to 15%</span>
              {' — '}built from the lineup below.
            </p>
          </motion.div>

          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 tracking-tight">Your coffee, your way.</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              We&apos;re giving you full control to build a custom 4-bag coffee box. Select your coffee region, roast
              level and grind preference—or use our recommendation. Enjoy freshly roasted coffee, delivered right to
              your door.
            </p>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto w-[75%] rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-lg mb-4"
          >
            <img
              src={subscriptionBoxDelivered}
              alt="Volcano Drip subscription box on a porch with four single-origin coffee bags and a thank-you card"
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-4 py-3 text-sm text-stone-500 text-center bg-stone-50 border-t border-stone-100">
              Your Volcanic Origins Box, delivered—origins and labels may rotate with the season.
            </figcaption>
          </motion.figure>

          <div className="mb-16 md:mb-20">
            <h3 className="text-center text-sm font-bold tracking-widest uppercase text-stone-400 mb-6">
              Origins in the family
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lineup.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-amber-200/80 hover:shadow-md transition-all"
                >
                  <p className="font-bold text-stone-900 text-lg">{item.name}</p>
                  <p className="text-amber-700 font-medium text-sm mt-1">
                    {item.origin} · {item.roast} roast
                  </p>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100"
            >
              <img
                src={bagOnScale}
                alt="Volcano Drip coffee bag on a precision scale at the roastery"
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">Roasted and packed for you</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                Every bag is small-batch roasted, weighed, and sealed so what shows up at your door matches what we
                stand behind—volcanic-soil origins, roasted in Canada.
              </p>
              <ul className="space-y-3 text-stone-700">
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">·</span>
                  100% Arabica single origins
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">·</span>
                  Roasted and packaged in Canada
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">·</span>
                  12 oz (340 g) bags in your monthly box
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-14">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-stone-200 flex-1 max-w-[100px]" />
              <h3 className="text-sm font-bold tracking-widest uppercase text-stone-400">Membership includes</h3>
              <div className="h-px bg-stone-200 flex-1 max-w-[100px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {membershipFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="bg-white p-5 rounded-xl shadow-sm border border-stone-100 flex items-start gap-4"
                >
                  <div className="bg-stone-50 p-3 rounded-lg flex-shrink-0">{feature.icon}</div>
                  <p className="text-stone-700 font-medium leading-relaxed pt-1">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div id="subscribe-box" className="scroll-mt-24 space-y-8">
            <PurchaseCard />
            <p className="text-center text-sm text-stone-500 max-w-md mx-auto">
              Prefer to browse first?{' '}
              <Link to="/shop" className="text-amber-700 font-semibold hover:underline">
                Shop all coffee
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default SubscriptionPage;
