import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Flame, Coffee, Mountain, Truck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import EcwidPurchaseButton from '@/components/EcwidPurchaseButton';
import { ECWID_SUBSCRIPTION_PRODUCT_ID, ECWID_SUBSCRIPTION_PRODUCT_URL } from '@/config/ecwid';

const SUBSCRIPTION_IMG = '/images/subscription';

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

const galleryItems = [
  {
    file: 'nathan-dumlao-Y3AqmbmtLQI-unsplash-b74af9bf-a29a-46ba-a7cd-1f7d3062df11.png',
    alt: 'Three portafilters with whole beans, ground coffee, and a finished espresso—bean to cup',
    grid: 'col-span-2 md:col-span-3 row-span-1 min-h-[200px] md:min-h-[240px]',
  },
  {
    file: 'zarak-khan-69ilqMz0p1s-unsplash-e92bf631-0da2-414e-afef-c00c20965b0a.png',
    alt: 'Two portafilters showing whole beans and freshly ground coffee',
    grid: 'col-span-2 md:col-span-3 row-span-1 min-h-[200px] md:min-h-[240px]',
  },
  {
    file: 'IMG_6527-264c7bd9-8d99-41df-9cdd-2f7cc0080e8c.png',
    alt: 'Volcano Drip coffee jar, branded shipping box, and bag of Primera Luz Costa Rica coffee',
    grid: 'col-span-2 md:col-span-2 min-h-[220px]',
  },
  {
    file: 'IMG_6201-93cf56a5-b177-4fbc-8635-74fc8aecbec9.png',
    alt: 'Three Volcano Drip single-origin bags: Antigua Ember, Sumatra Black, and Primera Luz',
    grid: 'col-span-2 md:col-span-2 min-h-[220px]',
  },
  {
    file: 'IMG_6189-5e47c4ce-9ad4-453a-9d19-9cb60612b75c.png',
    alt: 'Five Volcano Drip coffee bags showcasing origins from Honduras to Costa Rica',
    grid: 'col-span-2 md:col-span-4 min-h-[200px] md:min-h-[260px]',
  },
  {
    file: 'IMG_6148-e0d1a469-6868-423c-8ca6-f10736a65d8b.png',
    alt: 'Burlap sacks of green coffee stacked in the warehouse',
    grid: 'col-span-2 md:col-span-3 min-h-[220px]',
  },
  {
    file: 'IMG_6247-453adfab-e888-498e-b961-fdaafe1701bf.png',
    alt: 'Volcano Drip branded burlap sacks of green coffee',
    grid: 'col-span-2 md:col-span-3 min-h-[220px]',
  },
  {
    file: 'IMG_6164-e3c7a345-c31c-4139-b095-a1e6620900a7.png',
    alt: 'Volcano Drip bag on a precision scale at the roastery',
    grid: 'col-span-2 md:col-span-2 min-h-[260px]',
  },
  {
    file: 'IMG_6160-80b500ee-a749-4198-9dc3-941ecb3e06ef.png',
    alt: 'Close-up of unroasted green coffee beans',
    grid: 'col-span-2 md:col-span-2 min-h-[260px]',
  },
];

function GalleryTile({ file, alt, grid, index }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.24) }}
      className={`relative overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-200 shadow-sm group ${grid}`}
    >
      <img
        src={`${SUBSCRIPTION_IMG}/${file}`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </motion.figure>
  );
}

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

        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 tracking-tight">
                Your coffee, your way.
              </h2>
              <p className="text-xl text-stone-600 leading-relaxed">
                We&apos;re giving you full control to build a custom 4-bag coffee box. Select your coffee region,
                roast level and grind preference. Or use our recommendation. Enjoy freshly roasted coffee, delivered
                right to your door.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] max-h-[520px] mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden shadow-xl border border-stone-200/80"
            >
              <img
                src={`${SUBSCRIPTION_IMG}/IMG_6188-6702052f-9ea8-404e-91e9-200d895ad1b1.png`}
                alt="Four Volcano Drip coffee bags—Inca Ascent, Antigua Ember, Sumatra Black, and Primera Luz—on the roastery bench"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-3xl mx-auto mb-16 md:mb-20 rounded-2xl border-2 border-amber-500 bg-stone-900 px-8 py-10 md:px-12 md:py-12 shadow-xl text-center"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
              Subscribe to the Volcanic Origins Box and{' '}
              <span className="text-amber-400">save up to 15%</span>
            </p>
          </motion.div>

          <div className="relative rounded-2xl overflow-hidden mb-16 md:mb-20 min-h-[200px] md:min-h-[280px] border border-stone-200/80 shadow-md">
            <img
              src={`${SUBSCRIPTION_IMG}/IMG_6155-95c0c4fb-56b3-462b-ae20-d4f03e60a9b2.png`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/55 to-stone-900/35" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 md:py-20">
              <p className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Small-batch roasted</p>
              <p className="text-2xl md:text-3xl font-bold text-white max-w-xl leading-snug">
                Every bag is roasted to order—so what lands on your doorstep tastes as bold as it did at the roastery.
              </p>
            </div>
          </div>

          <div className="mb-6 text-center max-w-2xl mx-auto">
            <p className="text-sm font-bold tracking-widest uppercase text-stone-400 mb-2">Inside the club</p>
            <h3 className="text-2xl md:text-3xl font-bold text-stone-900">From green coffee to your kitchen</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 mb-20 md:mb-24 auto-rows-fr">
            {galleryItems.map((item, index) => (
              <GalleryTile key={item.file} {...item} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center max-w-4xl mx-auto"
          >
            <div className="w-full mb-16">
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
