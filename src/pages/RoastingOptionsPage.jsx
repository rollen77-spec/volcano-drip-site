import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const IMG = {
  roastingHero: '/images/roasting-hero.png',
  roastBlends: '/images/coffee-roast-blends.png',
};

/** Crops one quadrant from the 2×2 Volcano Drip roast comparison image. */
function RoastQuadrant({ quadrant, alt, className }) {
  const pos = {
    tl: { left: 0, top: 0 },
    tr: { left: '-100%', top: 0 },
    bl: { left: 0, top: '-100%' },
    br: { left: '-100%', top: '-100%' },
  };
  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden rounded-xl bg-stone-200 shadow-md ring-1 ring-stone-200/80',
        className
      )}
    >
      <img
        src={IMG.roastBlends}
        alt={alt}
        className="absolute h-[200%] w-[200%] max-w-none object-cover"
        style={pos[quadrant]}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

const roastLevels = [
  {
    quadrant: 'tl',
    imgAlt: 'Light roast coffee beans',
    title: 'Light Roast',
    subtitle: 'Light Brown • No Oils • Light Body',
    points: [
      'Bright, fruity, floral notes',
      'Higher acidity, crisp finish',
      'Showcases the bean’s natural origin',
      'Best for: Pour-over, drip, black coffee',
    ],
  },
  {
    quadrant: 'tr',
    imgAlt: 'Medium roast coffee beans',
    title: 'Medium Roast',
    subtitle: 'Medium Brown • Smooth • Balanced Body',
    points: [
      'Notes of chocolate, nuts, caramel',
      'Balanced acidity and aroma',
      'Smooth, easy-drinking',
      'Best for: Drip coffee, French press, everyday brewing',
    ],
  },
  {
    quadrant: 'bl',
    imgAlt: 'Dark roast coffee beans',
    title: 'Dark Roast',
    subtitle: 'Dark Brown to Black • Oily Surface • Full Body',
    points: [
      'Bold, smoky, bittersweet flavors',
      'Low acidity',
      'Rich, strong finish',
      'Best for: Espresso, French press, strong coffee lovers',
    ],
  },
];

const RoastingOptionsPage = () => {
  return (
    <>
      <Helmet>
        <title>Roasting Options | Volcano Drip</title>
        <meta
          name="description"
          content="Light to dark roast levels at Volcano Drip—how heat unlocks flavor from volcanic-soil coffee, and how to choose your roast."
        />
      </Helmet>

      <div className="min-h-screen bg-stone-50 font-sans">
        {/* Hero — match Grind / Subscription: sans display title + pill kicker */}
        <section className="relative flex h-[min(70vh,820px)] min-h-[360px] items-center justify-center overflow-hidden bg-stone-900 text-white">
          <div className="absolute inset-0 z-0 opacity-50">
            <img
              alt="Coffee roasting—flames and beans in the cooling tray"
              className="h-full w-full object-cover object-center"
              src={IMG.roastingHero}
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
              Roast levels
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-6xl font-bold tracking-tighter md:text-8xl"
            >
              From Light to Dark.{' '}
              <span className="text-amber-500">Discover Your Roast</span>.
            </motion.h1>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-normal leading-relaxed text-stone-600 md:text-xl"
          >
            Roasting is where raw beans become something extraordinary—where heat unlocks aroma, depth,
            and character. At Volcano Drip, we treat roasting as a craft—carefully developing each bean
            to reveal the flavors shaped by volcanic soil.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-8 text-lg font-normal leading-relaxed text-stone-600 md:text-xl"
          >
            From bright and vibrant to deep and bold, each roast level tells a different story in the cup.
          </motion.p>
        </div>

        {/* Full brand comparison artwork */}
        <div className="mx-auto max-w-5xl px-6 pb-12 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:p-6"
          >
            <img
              src={IMG.roastBlends}
              alt="Volcano Drip roast comparison—light, medium, dark, and espresso"
              className="h-auto w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>

        <div className="mx-auto max-w-3xl px-6 pb-16 md:px-8">
          <div className="rounded-xl border border-amber-200/90 bg-amber-50 px-6 py-6 text-stone-800 shadow-sm">
            <p className="text-center text-base font-medium leading-relaxed md:text-lg">
              Choose your roast based on the experience you want—crisp and complex, or rich and
              powerful.
            </p>
          </div>
        </div>

        <section className="mx-auto max-w-6xl space-y-20 px-6 pb-24 md:px-8">
          {roastLevels.map((level, i) => (
            <motion.article
              key={level.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className={cn(
                'grid items-center gap-10 md:grid-cols-2 md:gap-14',
                i % 2 === 1 && 'md:[&>div:first-child]:order-2'
              )}
            >
              <RoastQuadrant quadrant={level.quadrant} alt={level.imgAlt} className="mx-auto w-full max-w-md" />
              <div>
                <h2 className="font-playfair text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                  {level.title}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-800">
                  {level.subtitle}
                </p>
                <ul className="mt-6 space-y-3 text-base leading-relaxed text-stone-600">
                  {level.points.map((line) => (
                    <li key={line} className="border-l-2 border-amber-400/80 pl-4">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}

          {/* Espresso — quadrant + copy */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid items-start gap-10 border-t border-stone-200 pt-20 md:grid-cols-2 md:gap-14"
          >
            <RoastQuadrant
              quadrant="br"
              imgAlt="Espresso roast coffee beans"
              className="mx-auto w-full max-w-md md:order-2"
            />
            <div className="md:order-1">
              <h2 className="font-playfair text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                Espresso (roast + method)
              </h2>
              <p className="mt-3 text-base text-stone-600">
                Espresso isn’t just a roast—it’s a brewing method.
              </p>
              <ul className="mt-8 space-y-3 text-base leading-relaxed text-stone-600">
                <li className="border-l-2 border-stone-400 pl-4">Typically uses medium-dark to dark roasts</li>
                <li className="border-l-2 border-stone-400 pl-4">Lower acidity, more soluble under pressure</li>
                <li className="border-l-2 border-stone-400 pl-4">Produces a thicker, richer crema</li>
                <li className="border-l-2 border-stone-400 pl-4">
                  Best for: Espresso machines, lattes, cappuccinos
                </li>
              </ul>

              <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50/95 px-6 py-6">
                <h3 className="font-playfair text-xl font-bold text-stone-900">Brewing insight</h3>
                <ul className="mt-4 space-y-2 text-stone-700">
                  <li>Dark roasts extract faster at lower temps (~195°F)</li>
                  <li>Light roasts need higher temps (~203°F)</li>
                </ul>
              </div>
            </div>
          </motion.article>

          <div className="flex flex-col items-center gap-4 border-t border-stone-200 pt-14 text-center sm:flex-row sm:justify-center">
            <Link
              to="/brewing/grind-options"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 underline-offset-4 hover:text-amber-600 hover:underline"
            >
              Next: grind options
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="hidden text-stone-300 sm:inline">|</span>
            <Link
              to="/brewing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline"
            >
              Back to brewing guides
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default RoastingOptionsPage;
