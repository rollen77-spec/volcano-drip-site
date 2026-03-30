import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const IMG = {
  heroTray: '/images/grind-hero-tray.png',
  afterIntro: '/images/grind-after-intro.png',
  wholeBean: '/images/grind-whole-bean.png',
  frenchPress: '/images/grind-french-press.png',
  pourOver: '/images/grind-pour-over.png',
  aeropress: '/images/grind-aeropress.png',
  moka: '/images/grind-moka-pot.png',
  espresso: '/images/grind-espresso.png',
};

const grindItems = [
  {
    title: 'Whole Bean',
    summary: 'Maximum freshness',
    body: 'Grind at home for peak flavor and control.',
    image: IMG.wholeBean,
  },
  {
    title: 'French Press',
    summary: 'Coarse grind',
    body: 'Large grounds create a rich, full-bodied cup.',
    image: IMG.frenchPress,
  },
  {
    title: 'Percolator',
    summary: 'Coarse grind',
    body: 'Designed for repeated brewing cycles.',
    image: IMG.wholeBean,
    objectPosition: '48% 62%',
  },
  {
    title: 'Drip (Flat Bottom)',
    summary: 'Medium grind',
    body: 'Balanced extraction for standard coffee makers.',
    image: IMG.pourOver,
    objectPosition: '45% 42%',
  },
  {
    title: 'Pour Over (Cone Filter)',
    summary: 'Medium-fine grind',
    body: 'Optimized for controlled, even extraction.',
    image: IMG.pourOver,
    objectPosition: '50% 50%',
  },
  {
    title: 'AeroPress',
    summary: 'Medium-fine grind',
    body: 'Versatile brewing with smooth results.',
    image: IMG.aeropress,
  },
  {
    title: 'Moka Pot',
    summary: 'Fine grind',
    body: 'Strong, concentrated coffee (not as fine as espresso).',
    image: IMG.moka,
  },
  {
    title: 'Espresso Machine',
    summary: 'Fine grind',
    body: 'Essential for pressure-based brewing.',
    image: IMG.espresso,
  },
  {
    title: 'Turkish',
    summary: 'Extra fine',
    body: 'Powder-like grind for intense, unfiltered coffee.',
    image: IMG.espresso,
    objectPosition: '52% 48%',
  },
];

function GrindSectionImage({ item, alt, className }) {
  const position = item.objectPosition || '50% 50%';

  return (
    <div
      className={cn(
        'relative h-48 w-full overflow-hidden rounded-xl bg-stone-200 md:h-56',
        className
      )}
    >
      <img
        src={item.image}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ objectPosition: position }}
        loading="lazy"
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/25 to-transparent" />
    </div>
  );
}

const GrindOptionsPage = () => {
  return (
    <>
      <Helmet>
        <title>Grind Options | Volcano Drip</title>
        <meta
          name="description"
          content="How grind size affects extraction—from whole bean to Turkish. Match your grind to French press, drip, pour over, AeroPress, moka, and espresso."
        />
      </Helmet>

      <div className="min-h-screen bg-stone-50 font-sans">
        {/* Hero — match Subscription page: sans display title scale + overlay */}
        <section className="relative flex h-[min(70vh,820px)] min-h-[360px] items-center justify-center overflow-hidden bg-stone-900 text-white">
          <div className="absolute inset-0 z-0 opacity-50">
            <img
              alt="Cooling tray with whole beans and a range of grind sizes"
              className="h-full w-full object-cover object-center"
              src={IMG.heroTray}
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

          <div className="relative z-20 mt-10 max-w-5xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-400 backdrop-blur-md"
            >
              Grind types
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-6xl font-bold tracking-tighter md:text-8xl"
            >
              Choose the Right Grind for{' '}
              <span className="text-amber-500">Your Brew</span>.
            </motion.h1>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-16 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center"
          >
            <p className="text-lg font-normal leading-relaxed text-stone-600 md:text-xl">
              Grind size plays a critical role in how your coffee tastes. It controls how quickly
              water extracts flavor from the coffee grounds during brewing.
            </p>
            <p className="text-lg font-normal leading-relaxed text-stone-600 md:text-xl">
              If the grind is too coarse, the coffee can taste weak or under-extracted. Too fine, and
              it may become bitter or over-extracted. Each brewing method is designed for a specific
              grind size to achieve the best balance of flavor.
            </p>
            <p className="text-lg font-normal leading-relaxed text-stone-600 md:text-xl">
              Choosing the right grind ensures a smoother, more consistent cup—whether you&apos;re
              using a French press, drip machine, or espresso maker.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-16 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm"
          >
            <div className="relative aspect-[21/9] min-h-[200px] w-full md:aspect-[2.35/1]">
              <img
                src={IMG.afterIntro}
                alt="Enjoying a freshly brewed cup of coffee"
                className="h-full w-full object-cover object-[50%_35%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>

        <section className="mx-auto max-w-6xl space-y-16 px-6 pb-24 md:px-8">
          {grindItems.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                'grid gap-8 md:grid-cols-2 md:items-center md:gap-12',
                i % 2 === 1 && 'md:[&>div:first-child]:order-2'
              )}
            >
              <GrindSectionImage
                item={item}
                alt={`${item.title} — Volcano Drip grind guide`}
              />
              <div>
                <h2 className="font-playfair text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-800">
                  {item.summary}
                </p>
                <p className="mt-5 text-base leading-relaxed text-stone-600 md:text-lg">{item.body}</p>
              </div>
            </motion.article>
          ))}

          <div className="flex flex-col items-center gap-4 border-t border-stone-200 pt-14 text-center sm:flex-row sm:justify-center">
            <Link
              to="/brewing/roasting-options"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 underline-offset-4 hover:text-amber-600 hover:underline"
            >
              Roast levels
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="hidden text-stone-300 sm:inline">|</span>
            <Link
              to="/brewing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Brewing guides
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default GrindOptionsPage;
