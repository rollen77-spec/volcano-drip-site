import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bean,
  Coffee,
  Cog,
  CookingPot,
  Filter,
  Flame,
  FlaskConical,
  GlassWater,
  RefreshCw,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const GRIND_HERO_IMAGE =
  'https://images.unsplash.com/photo-1517668808822-ad9bb3cf3c1c?auto=format&fit=crop&w=2000&q=80';

const grindItems = [
  {
    value: 'whole-bean',
    emoji: '🫘',
    title: 'Whole Bean',
    Icon: Bean,
    summary: 'Maximum freshness',
    expanded: 'Grind at home for peak flavor and control.',
  },
  {
    value: 'french-press',
    emoji: '🫖',
    title: 'French Press',
    Icon: GlassWater,
    summary: 'Coarse grind',
    expanded: 'Large grounds create a rich, full-bodied cup.',
  },
  {
    value: 'percolator',
    emoji: '🔄',
    title: 'Percolator',
    Icon: RefreshCw,
    summary: 'Coarse grind',
    expanded: 'Designed for repeated brewing cycles.',
  },
  {
    value: 'drip-flat',
    emoji: '☕',
    title: 'Drip (Flat Bottom)',
    Icon: Coffee,
    summary: 'Medium grind',
    expanded: 'Balanced extraction for standard coffee makers.',
  },
  {
    value: 'pour-over',
    emoji: '🔺',
    title: 'Pour Over (Cone Filter)',
    Icon: Filter,
    summary: 'Medium-fine grind',
    expanded: 'Optimized for controlled, even extraction.',
  },
  {
    value: 'aeropress',
    emoji: '🧪',
    title: 'AeroPress',
    Icon: FlaskConical,
    summary: 'Medium-fine grind',
    expanded: 'Versatile brewing with smooth results.',
  },
  {
    value: 'moka',
    emoji: '🔥',
    title: 'Moka Pot',
    Icon: Flame,
    summary: 'Fine grind',
    expanded: 'Strong, concentrated coffee (not as fine as espresso).',
  },
  {
    value: 'espresso',
    emoji: '⚙️',
    title: 'Espresso Machine',
    Icon: Cog,
    summary: 'Fine grind',
    expanded: 'Essential for pressure-based brewing.',
  },
  {
    value: 'turkish',
    emoji: '🏺',
    title: 'Turkish',
    Icon: CookingPot,
    summary: 'Extra fine',
    expanded: 'Powder-like grind for intense, unfiltered coffee.',
  },
];

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

      <div className="min-h-screen bg-stone-50">
        <div className="relative h-[min(48vh,480px)] min-h-[260px] overflow-hidden bg-stone-900 md:h-[55vh]">
          <div className="absolute inset-0">
            <img
              src={GRIND_HERO_IMAGE}
              alt="Coffee grinder—precision and consistency for the perfect brew"
              className="h-full w-full object-cover object-center"
              width={2000}
              height={1333}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-stone-900/25" />
          <div className="relative flex h-full flex-col items-center justify-end px-4 pb-10 text-center md:justify-center md:pb-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              ⚙️ Grind types
            </p>
            <h1 className="mb-4 max-w-3xl font-black text-4xl tracking-tight text-white md:text-5xl">
              Grind options
            </h1>
            <p className="max-w-lg text-stone-200">
              The right particle size balances extraction—method by method.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <p className="text-lg leading-relaxed text-stone-600 md:text-xl">
              Grind size plays a critical role in how your coffee tastes. It controls how quickly
              water extracts flavor from the coffee grounds during brewing.
            </p>
            <p className="text-lg leading-relaxed text-stone-600 md:text-xl">
              If the grind is too coarse, the coffee can taste weak or under-extracted. Too fine, and
              it may become bitter or over-extracted. Each brewing method is designed for a specific
              grind size to achieve the best balance of flavor.
            </p>
            <p className="text-lg leading-relaxed text-stone-600 md:text-xl">
              Choosing the right grind ensures a smoother, more consistent cup—whether you&apos;re
              using a French press, drip machine, or espresso maker.
            </p>
          </motion.div>
        </div>

        <section className="mx-auto max-w-3xl px-4 pb-20">
          <Accordion type="multiple" className="rounded-xl border border-stone-200 bg-white px-2 shadow-sm md:px-4">
            {grindItems.map((item) => {
              const Icon = item.Icon;
              return (
                <AccordionItem key={item.value} value={item.value} className="border-stone-100">
                  <AccordionTrigger className="py-5 hover:no-underline [&[data-state=open]]:bg-stone-50/80">
                    <div className="flex w-full items-start gap-3 pr-2 text-left">
                      <span className="text-xl leading-none" aria-hidden>
                        {item.emoji}
                      </span>
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-900"
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="block font-bold text-stone-900">{item.title}</span>
                        <span className="mt-0.5 block text-sm font-semibold text-amber-800">
                          {item.summary}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-stone-50 bg-stone-50/40">
                    <p className="pl-3 pr-3 pb-4 pt-1 text-base leading-relaxed text-stone-600 sm:pl-[5.25rem]">
                      {item.expanded}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="mt-16 flex flex-col items-center gap-4 border-t border-stone-200 pt-12 text-center sm:flex-row sm:justify-center">
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
