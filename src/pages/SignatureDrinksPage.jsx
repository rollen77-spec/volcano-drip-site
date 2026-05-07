import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Coffee, Droplets, Sparkles } from 'lucide-react';
import PageHero from '@/components/PageHero';

const SignatureDrinksPage = () => {
  const drinks = [
    {
      id: "lava-shot",
      name: "The Lava Shot (Espresso Tonic)",
      image: "https://images.unsplash.com/photo-1554393335-7eb00f0525f4?auto=format&fit=crop&q=80&w=800",
      description: "A bright, effervescent collision of bold espresso and crisp tonic water.",
      recipe: [
        "Fill a glass with ice.",
        "Add 4–6 oz of premium tonic water.",
        "Extract 1 double espresso shot.",
        "Slowly pour the espresso over the back of a spoon to layer.",
        "Garnish with a fresh orange peel."
      ],
      twist: "Add blood orange or pineapple syrup and garnish with a dehydrated orange slice.",
      icon: <Droplets className="w-5 h-5 text-[#FF8C00]" />
    },
    {
      id: "eruption-pour",
      name: "The Eruption Pour (Volcano Bloom)",
      image: "https://images.unsplash.com/photo-1599861495612-556054ec5eb3?auto=format&fit=crop&q=80&w=800",
      description: "Experience the explosive bloom of freshly roasted single-origin beans.",
      recipe: [
        "Prepare your V60 or preferred pour-over brewer.",
        "Grind 20 g of Volcano Drip coffee (medium-fine).",
        "Heat 300 g of water to 205°F.",
        "Pour 50 g of water to bloom for 30 seconds.",
        "Slowly pour the remaining water in concentric circles."
      ],
      twist: "Add a tiny pinch of orange zest or cinnamon directly to the dry grounds before the bloom.",
      icon: <Coffee className="w-5 h-5 text-[#FF8C00]" />
    },
    {
      id: "magma-cold-brew",
      name: "The Magma Cold Brew",
      image: "https://images.unsplash.com/photo-1691514484609-0051bc49f2c0?auto=format&fit=crop&q=80&w=800",
      description: "A refreshing, tropical take on our intense volcanic cold brew.",
      recipe: [
        "Fill a tall glass with ice.",
        "Pour pineapple juice or coconut water to fill halfway.",
        "Carefully layer Volcano Drip cold brew concentrate on top.",
        "Garnish with a fresh orange slice."
      ],
      flavorProfile: "Sweet tropical start, bright citrus middle, and a smooth, bold coffee finish.",
      icon: <Sparkles className="w-5 h-5 text-[#FF8C00]" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Signature Drinks | Volcano Drip</title>
        <meta name="description" content="Discover Volcano Drip's signature coffee recipes including the Lava Shot, Eruption Pour, and Magma Cold Brew." />
      </Helmet>

      <div className="bg-stone-50 min-h-screen pb-20 pt-0">
        <PageHero
          kicker="Crafted recipes"
          title={
            <>
              SIGNATURE
              <br />
              DRINKS.
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1554393335-7eb00f0525f4?auto=format&fit=crop&q=80&w=1600"
          imageAlt="Espresso drink preparation"
          overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/60"
          contentMaxWidthClassName="max-w-4xl"
        >
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-stone-200">
            Unleash the full potential of volcanic coffee with our signature recipes. Bold flavors, explosive blooms,
            and magma-inspired creations to fuel your day.
          </p>
        </PageHero>

        {/* Recipes Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {drinks.map((drink, index) => (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={drink.image} 
                    alt={drink.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-stone-100 rounded-lg">
                      {drink.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900">{drink.name}</h3>
                  </div>
                  
                  <p className="text-stone-600 mb-6 italic">
                    {drink.description}
                  </p>

                  <div className="mb-6 flex-grow">
                    <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">Recipe</h4>
                    <ul className="space-y-2">
                      {drink.recipe.map((step, i) => (
                        <li key={i} className="text-stone-600 text-sm flex items-start gap-2">
                          <span className="text-[#FF8C00] font-bold shrink-0">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Twist / Profile Box */}
                  <div className="mt-auto bg-stone-900 text-white p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-[#FF8C00] uppercase tracking-wider mb-2">
                      {drink.twist ? "Volcano Drip Twist" : "Flavor Profile"}
                    </h4>
                    <p className="text-sm text-stone-300">
                      {drink.twist || drink.flavorProfile}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default SignatureDrinksPage;