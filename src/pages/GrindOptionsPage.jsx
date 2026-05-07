import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageHero from '@/components/PageHero';

const IMG = {
  heroTray: '/images/grind-hero-tray.png',
  afterIntro: '/images/grind-after-intro.png',
  wholeBean: '/images/grind-whole-bean.png',
  frenchPress: '/images/grind-french-press.png',
  pourOver: '/images/grind-pour-over.png',
  flatBottom: '/images/grind-flat-bottom.png',
  aeropress: '/images/grind-aeropress.png',
  moka: '/images/grind-moka-pot.png',
  espresso: '/images/grind-espresso.png',
  percolator: '/images/grind-percolator.png',
  turkish: '/images/grind-turkish.png',
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
    image: IMG.percolator,
  },
  {
    title: 'Drip (Flat Bottom)',
    summary: 'Medium grind',
    body: 'Balanced extraction for standard coffee makers.',
    image: IMG.flatBottom,
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
    image: IMG.turkish,
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
        <PageHero
          kicker="Grind types"
          title={
            <>
              CHOOSE THE RIGHT GRIND
              <br />
              FOR YOUR BREW.
            </>
          }
          imageSrc={IMG.heroTray}
          imageAlt="Cooling tray with whole beans and a range of grind sizes"
          fetchPriority="high"
          decoding="async"
          imageWrapperExtraClassName="opacity-50"
          overlayClassName="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"
          contentMaxWidthClassName="max-w-5xl"
        />

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
