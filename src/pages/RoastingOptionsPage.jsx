import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Flame, Thermometer, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Hero: coffee roasting / drum — alternatives you can swap in Unsplash:
 * - photo-1461023058943-07fcbe16d735 (espresso pull / bar)
 * - photo-1495474472287-4d71bcdd2085 (brew bar, warm)
 * - photo-1559056199-641a0ac8b55e (beans)
 */
const ROASTING_HERO_IMAGE =
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=2000&q=80';

const roastLevels = [
  {
    emoji: '🌅',
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
    emoji: '🌄',
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
    emoji: '🌋',
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

      <div className="min-h-screen bg-stone-50">
        <div className="relative h-[min(52vh,520px)] min-h-[280px] overflow-hidden bg-stone-900 md:h-[60vh]">
          <div className="absolute inset-0">
            <img
              src={ROASTING_HERO_IMAGE}
              alt="Coffee roasting—warm tones and craft in the roastery"
              className="h-full w-full object-cover object-center"
              width={2000}
              height={1333}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/55 to-stone-900/30" />
          <div className="relative flex h-full flex-col items-center justify-end px-4 pb-12 text-center md:justify-center md:pb-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              🔥 Roast levels
            </p>
            <h1 className="mb-4 max-w-3xl font-black text-4xl tracking-tight text-white md:text-6xl">
              Flavor, forged by fire
            </h1>
            <p className="max-w-xl text-base text-stone-200 md:text-lg">
              Coffee begins its transformation in the flame.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed text-stone-600 md:text-xl"
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
            className="mt-6 text-lg leading-relaxed text-stone-600 md:text-xl"
          >
            From bright and vibrant to deep and bold, each roast level tells a different story in the cup.
          </motion.p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-8">
          <div className="rounded-xl border border-amber-200/80 bg-amber-50 px-6 py-5 text-stone-800 shadow-sm">
            <p className="text-center text-base font-medium leading-relaxed md:text-lg">
              <span className="mr-2" aria-hidden>
                👉
              </span>
              Choose your roast based on the experience you want—crisp and complex, or rich and
              powerful.
            </p>
          </div>
        </div>

        <section className="mx-auto max-w-5xl px-4 pb-20">
          <div className="grid gap-8 md:grid-cols-1">
            {roastLevels.map((level, i) => (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="overflow-hidden border-stone-200 bg-white shadow-sm">
                  <CardHeader className="border-b border-stone-100 bg-stone-50/80 pb-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-2xl" aria-hidden>
                        {level.emoji}
                      </span>
                      <div>
                        <CardTitle className="text-2xl text-stone-900">{level.title}</CardTitle>
                        <p className="mt-1 text-sm font-medium text-amber-800">{level.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3 text-stone-600">
                      {level.points.map((line) => (
                        <li key={line} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="border-stone-900/10 bg-white shadow-md">
              <CardHeader className="border-b border-stone-100">
                <div className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden>
                    ⚡
                  </span>
                  <div>
                    <CardTitle className="text-2xl text-stone-900">Espresso (roast + method)</CardTitle>
                    <p className="mt-2 text-sm font-medium text-stone-500">
                      Espresso isn’t just a roast—it’s a brewing method.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <ul className="space-y-3 text-stone-600">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-900" />
                    <span>Typically uses medium-dark to dark roasts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-900" />
                    <span>Lower acidity, more soluble under pressure</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-900" />
                    <span>Produces a thicker, richer crema</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-900" />
                    <span>Best for: Espresso machines, lattes, cappuccinos</span>
                  </li>
                </ul>

                <div className="rounded-lg border border-amber-200 bg-amber-50/90 p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-stone-900">
                    <Thermometer className="h-5 w-5 text-amber-700" />
                    Brewing insight
                  </h3>
                  <ul className="space-y-2 text-stone-700">
                    <li className="flex gap-2">
                      <Flame className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <span>Dark roasts extract faster at lower temps (~195°F)</span>
                    </li>
                    <li className="flex gap-2">
                      <Flame className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <span>Light roasts need higher temps (~203°F)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mt-16 flex flex-col items-center gap-4 border-t border-stone-200 pt-12 text-center sm:flex-row sm:justify-center">
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
