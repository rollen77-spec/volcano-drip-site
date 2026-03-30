
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Mountain, BookOpen, Quote, Star, Zap, Check, Flame, Coffee, ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WelcomeMessage from '@/components/WelcomeMessage';
import CallToAction from '@/components/CallToAction';
import { Link } from 'react-router-dom';
import EcwidPurchaseButton from '@/components/EcwidPurchaseButton';
import {
  ECWID_COSTA_RICA_PRODUCT_URL,
  ECWID_GUATEMALA_PRODUCT_URL,
  ECWID_HONDURAS_PRODUCT_URL,
  ECWID_INDONESIA_PRODUCT_URL,
  ECWID_PERU_PRODUCT_URL,
  ECWID_PRODUCT_BY_ORIGIN,
  ECWID_SUBSCRIPTION_PRODUCT_ID,
  ECWID_SUBSCRIPTION_PRODUCT_URL,
} from '@/config/ecwid';

/**
 * Square media frame.
 * - Single-bag tiles (`fit="cover"`): bottom-aligned `object-contain` in a fixed-height slot so bags read
 *   at a similar scale despite different camera distances; no image zoom on hover (avoids “size shift”).
 * - `fit="contain"`: full asset visible (e.g. Volcanic wide lineup).
 */
function ProductTileMedia({ to, src, alt, fit = 'cover', bagScale = 1 }) {
  const isContain = fit === 'contain';
  return (
    <Link to={to} className="block relative aspect-square overflow-hidden bg-stone-950/80">
      {isContain ? (
        <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-3">
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-end justify-center px-2 pb-1 pt-12 sm:px-3 sm:pt-14">
          <img
            src={src}
            alt={alt}
            className="h-auto w-full max-h-[82%] object-contain object-bottom"
            style={{
              transform: bagScale !== 1 ? `scale(${bagScale})` : undefined,
              transformOrigin: 'bottom center',
            }}
          />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-60" />
    </Link>
  );
}

/** Country label above the image; organic SKUs (e.g. Honduras, Peru) use a leaf icon + label — no pill/glow. */
function SingleOriginTileCountryHeader({ country, organic }) {
  return (
    <div className="shrink-0 border-b border-stone-800 bg-stone-900 px-3 pt-5 pb-4 text-center sm:px-4">
      <div className="mb-3 flex min-h-[30px] items-center justify-center">
        {organic ? (
          <span
            className="inline-flex items-center justify-center gap-1.5 text-stone-400"
            aria-label="Organic coffee"
          >
            <Leaf className="h-4 w-4 shrink-0 text-emerald-600/85" strokeWidth={2} aria-hidden />
            <span className="text-xs font-semibold tracking-wide text-stone-300">Organic</span>
          </span>
        ) : null}
      </div>
      <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">{country}</p>
    </div>
  );
}

const HomePage = () => {
  const features = [{
    icon: <img src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/volcano-drip-icon-flame-orange-for-ui-and-web-elements-a3vCm.png" alt="Burgundy Flame" className="w-8 h-8 object-contain" />,
    title: "Born of Fire",
    description: "Great coffee begins with heat. Our beans are carefully roasted to unlock the bold flavors and natural character shaped by volcanic soil."
  }, {
    icon: <img src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/volcano-drip-icon-coffee-cup-teal-for-ui-and-web-elements-XbmPV.png" alt="Teal Coffee Cup" className="w-8 h-8 object-contain" />,
    title: "The Perfect Cup",
    description: "Mineral-rich volcanic regions produce beans with deeper, more vibrant flavor—crafted to deliver a truly exceptional cup of coffee."
  }, {
    icon: <img src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/volcano-drip-icon-heart-for-ui-and-web-elements-QBjnW.png" alt="Orange Heart" className="w-8 h-8 object-contain" />,
    title: "Brings People Together",
    description: "Coffee is meant to be shared. Every cup is an invitation to slow down, connect, and enjoy the moment with others."
  }];
  
  const testimonials = [{
    name: "Santiago C.",
    role: "Mississauga",
    content: "I've tried a lot of small-batch coffees, but this one actually surprised me. The flavor is smooth but still bold, and it doesn't have that bitter aftertaste. You can tell there's real care behind it.",
    rating: 5
  }, {
    name: "Siva.",
    role: "Vancouver",
    content: "I signed up for the newsletter just out of curiosity, but ended up ordering a bag—and now I'm hooked. It's become part of my morning routine.",
    rating: 5
  }, {
    name: "Hailey S.",
    role: "Toronto",
    content: "What stood out to me was the balance. It's rich without being overpowering. Definitely one of the better coffees I've had in a while.",
    rating: 5
  }];

  return <>
      <Helmet>
        <title>Volcano Drip | Exceptional Volcanic Soil Coffee</title>
        <meta name="description" content="Experience the explosive flavor of coffee grown in nutrient-rich volcanic soil. Small-batch roasted and ethically sourced." />
      </Helmet>

      <div className="flex flex-col w-full overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center bg-stone-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img alt="Active volcano erupting at night with lava" src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/05c61514a48c26a3970780f69c046190.png" className="w-full h-full object-cover object-[center_80%]" />
            <div className="absolute inset-0 bg-black/60 z-10" />
          </div>
          
          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-20">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <span className="inline-block mb-6 px-4 py-1.5 border border-amber-500/30 rounded-full bg-amber-500/10 backdrop-blur-md text-amber-400 font-bold tracking-widest text-xs uppercase">
                Est. 2025 • Small Batch Roasters
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                FUEL YOUR <br />
                <span className="text-amber-500">INNER FIRE.</span>
              </h1>
              <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                Exceptional single-origin coffee sourced from the world's most nutrient-rich volcanic soils.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-32 mb-10">
                <Button asChild className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-4 text-base rounded-full h-auto transition-all shadow-xl shadow-amber-900/20">
                  <a href="#products">Explore Roasts</a>
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block">
            <motion.div animate={{
            y: [0, 10, 0]
          }} transition={{
            repeat: Infinity,
            duration: 2
          }} className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-amber-500 rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* Coffee Product Image Section */}
        <section className="bg-stone-50 py-10 px-4 flex justify-center relative z-30 -mt-10">
          <div className="container mx-auto flex justify-center w-full">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="w-full max-w-7xl group">
              <img src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/adb8ea4f717435f5de5f3b94549f48d4.png" alt="Volcano Drip Coffee product display showing 5 coffee bags" className="w-full h-auto rounded-xl shadow-lg transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl bg-white p-2" />
            </motion.div>
          </div>
        </section>

        {/* Welcome Message (Dynamic) */}
        <WelcomeMessage />

        {/* Feature Highlights */}
        <section className="py-20 bg-stone-50 border-y border-stone-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4 tracking-tight">Crafted by nature. Powered by volcanoes.</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">Volcanic soil fuels exceptional coffee—rich minerals, high elevations, and bold flavor in every brew.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="flex flex-col items-center text-center group">
                  <div className="mb-6 p-5 rounded-2xl bg-white shadow-sm border border-stone-100 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed max-w-xs">{feature.description}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Featured Products with Coffee Shop title */}
        <section id="products" className="pt-24 pb-12 bg-white scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-3 block">Coffee Shop</span>
                <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-none mb-6">
                  FRESH FROM <br />THE ROASTERY.
                </h2>
                <p className="text-stone-600 text-lg">Our master roaster carefully selects beans that showcase the unique mineral profiles of their volcanic origins.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Antigua Ember */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="group relative h-full flex flex-col bg-stone-900 border border-stone-800 overflow-hidden shadow-lg"
              >
                <SingleOriginTileCountryHeader country="Guatemala" organic={false} />
                <ProductTileMedia
                  to="/origins/guatemala"
                  src="/antigua-ember-front.png"
                  alt="Antigua Ember"
                />
                <div className="p-6 flex flex-col flex-grow text-center">
                  <div className="mb-4">
                    <Link to="/origins/guatemala" className="block group-hover:text-amber-500 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-1 leading-tight">Antigua Ember</h3>
                    </Link>
                    <p className="text-stone-400 text-sm">Antigua Valley</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-[10px] uppercase text-stone-500 font-bold mb-2 tracking-widest">Tasting Notes</h4>
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-stone-300 font-medium">
                      <span>Cocoa •</span><span>Caramel •</span><span>Subtle Spice</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-stone-800 mb-6 mt-auto">
                     <div className="flex flex-col items-center text-center gap-1">
                        <Mountain className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase">Elevation</span>
                        <span className="text-xs font-medium text-stone-300">1,500m</span>
                     </div>
                     <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                        <Flame className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase">Roast</span>
                        <span className="text-xs font-medium text-stone-300">Medium</span>
                     </div>
                     <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                        <Coffee className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase">Body</span>
                        <span className="text-xs font-medium text-stone-300">Medium</span>
                     </div>
                  </div>

                  <div className="mt-auto flex w-full">
                    <EcwidPurchaseButton
                      productId={ECWID_PRODUCT_BY_ORIGIN.guatemala}
                      productPageUrl={ECWID_GUATEMALA_PRODUCT_URL}
                      label="View Details"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Primera Luz */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative h-full flex flex-col bg-stone-900 border border-stone-800 overflow-hidden shadow-lg"
              >
                <SingleOriginTileCountryHeader country="Costa Rica" organic={false} />
                <ProductTileMedia
                  to="/origins/costa-rica"
                  src="/primera-luz-front.png"
                  alt="Primera Luz"
                />
                <div className="p-6 flex flex-col flex-grow text-center">
                  <div className="mb-4">
                    <Link to="/origins/costa-rica" className="block group-hover:text-amber-500 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-1 leading-tight">Primera Luz</h3>
                    </Link>
                    <p className="text-stone-400 text-sm">Arenal Volcano</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-[10px] uppercase text-stone-500 font-bold mb-2 tracking-widest">Tasting Notes</h4>
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-stone-300 font-medium">
                      <span>Citrus •</span><span>Honey •</span><span>Milk Chocolate</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-stone-800 mb-6 mt-auto">
                     <div className="flex flex-col items-center text-center gap-1">
                        <Mountain className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase">Elevation</span>
                        <span className="text-xs font-medium text-stone-300">1,400m</span>
                     </div>
                     <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                        <Flame className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase">Roast</span>
                        <span className="text-xs font-medium text-stone-300">Light</span>
                     </div>
                     <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                        <Coffee className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase">Body</span>
                        <span className="text-xs font-medium text-stone-300">Medium</span>
                     </div>
                  </div>

                  <div className="mt-auto flex w-full">
                    {ECWID_PRODUCT_BY_ORIGIN['costa-rica'] || ECWID_COSTA_RICA_PRODUCT_URL ? (
                      <EcwidPurchaseButton
                        productId={ECWID_PRODUCT_BY_ORIGIN['costa-rica']}
                        productPageUrl={ECWID_COSTA_RICA_PRODUCT_URL}
                        label="View Details"
                      />
                    ) : (
                      <Link to="/origins/costa-rica" className="w-full">
                        <Button className="w-full bg-white hover:bg-stone-200 text-stone-900 font-bold h-10 rounded-none transition-colors">
                          View Details
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative h-full flex flex-col bg-stone-900 border border-stone-800 overflow-hidden shadow-lg"
              >
                <SingleOriginTileCountryHeader country="Indonesia" organic={false} />
                <ProductTileMedia
                  to="/origins/indonesia"
                  src="/sumatra-black-front.png"
                  alt="Sumatra Black"
                />
                <div className="p-6 flex flex-col flex-grow text-center">
                  <div className="mb-4">
                    <Link to="/origins/indonesia" className="block group-hover:text-amber-500 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-1 leading-tight">Sumatra Black</h3>
                    </Link>
                    <p className="text-stone-400 text-sm">Lake Toba</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-[10px] uppercase text-stone-500 font-bold mb-2 tracking-widest">Tasting Notes</h4>
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-stone-300 font-medium">
                      <span>Earthy •</span><span>Dark Chocolate •</span><span>Smoky</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-stone-800 mb-6 mt-auto">
                     <div className="flex flex-col items-center text-center gap-1">
                        <Mountain className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase">Elevation</span>
                        <span className="text-xs font-medium text-stone-300">3,404m</span>
                     </div>
                     <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                        <Flame className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase">Roast</span>
                        <span className="text-xs font-medium text-stone-300">Dark</span>
                     </div>
                     <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                        <Coffee className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-[10px] text-stone-500 uppercase">Body</span>
                        <span className="text-xs font-medium text-stone-300">Full</span>
                     </div>
                  </div>

                  <div className="mt-auto flex w-full">
                    {ECWID_PRODUCT_BY_ORIGIN.indonesia || ECWID_INDONESIA_PRODUCT_URL ? (
                      <EcwidPurchaseButton
                        productId={ECWID_PRODUCT_BY_ORIGIN.indonesia}
                        productPageUrl={ECWID_INDONESIA_PRODUCT_URL}
                        label="View Details"
                      />
                    ) : (
                      <Link to="/origins/indonesia" className="w-full">
                        <Button className="w-full bg-white hover:bg-stone-200 text-stone-900 font-bold h-10 rounded-none transition-colors">
                          View Details
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Copán Rise (Honduras) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group relative h-full flex flex-col bg-stone-900 border border-stone-800 overflow-hidden shadow-lg"
              >
                <SingleOriginTileCountryHeader country="Honduras" organic />
                <ProductTileMedia
                  to="/origins/honduras"
                  src="/copan-rise-front.png"
                  alt="Copán Rise Honduras coffee bag"
                />
                <div className="p-6 flex flex-col flex-grow text-center">
                  <div className="mb-4">
                    <Link to="/origins/honduras" className="block group-hover:text-amber-500 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-1 leading-tight">Copán Rise</h3>
                    </Link>
                    <p className="text-stone-400 text-sm">Western Highlands</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-[10px] uppercase text-stone-500 font-bold mb-2 tracking-widest">Tasting Notes</h4>
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-stone-300 font-medium">
                      <span>Citrus •</span><span>Stone Fruit •</span><span>Cocoa</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-stone-800 mb-6 mt-auto">
                    <div className="flex flex-col items-center text-center gap-1">
                      <Mountain className="w-4 h-4 text-amber-600 mb-1" />
                      <span className="text-[10px] text-stone-500 uppercase">Elevation</span>
                      <span className="text-xs font-medium text-stone-300">1,400m</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                      <Flame className="w-4 h-4 text-amber-600 mb-1" />
                      <span className="text-[10px] text-stone-500 uppercase">Roast</span>
                      <span className="text-xs font-medium text-stone-300">Med-Dark</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                      <Coffee className="w-4 h-4 text-amber-600 mb-1" />
                      <span className="text-[10px] text-stone-500 uppercase">Body</span>
                      <span className="text-xs font-medium text-stone-300">Medium</span>
                    </div>
                  </div>

                  <div className="mt-auto flex w-full">
                    <EcwidPurchaseButton
                      productId={ECWID_PRODUCT_BY_ORIGIN.honduras}
                      productPageUrl={ECWID_HONDURAS_PRODUCT_URL}
                      label="View Details"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Inca Ascent (Peru) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="group relative h-full flex flex-col bg-stone-900 border border-stone-800 overflow-hidden shadow-lg"
              >
                <SingleOriginTileCountryHeader country="Peru" organic />
                <ProductTileMedia
                  to="/origins/peru"
                  src="/inca-ascent-front.png"
                  alt="Inca Ascent Peru coffee bag"
                />
                <div className="p-6 flex flex-col flex-grow text-center">
                  <div className="mb-4">
                    <Link to="/origins/peru" className="block group-hover:text-amber-500 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-1 leading-tight">Inca Ascent</h3>
                    </Link>
                    <p className="text-stone-400 text-sm">Andes Volcanic Belt</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-[10px] uppercase text-stone-500 font-bold mb-2 tracking-widest">Tasting Notes</h4>
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-stone-300 font-medium">
                      <span>Soft Citrus •</span><span>Stone Fruit •</span><span>Subtle Cocoa</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-stone-800 mb-6 mt-auto">
                    <div className="flex flex-col items-center text-center gap-1">
                      <Mountain className="w-4 h-4 text-amber-600 mb-1" />
                      <span className="text-[10px] text-stone-500 uppercase">Elevation</span>
                      <span className="text-xs font-medium text-stone-300">2,000m</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                      <Flame className="w-4 h-4 text-amber-600 mb-1" />
                      <span className="text-[10px] text-stone-500 uppercase">Roast</span>
                      <span className="text-[11px] font-medium text-stone-300 leading-tight">Light-Med</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 border-l border-stone-800">
                      <Coffee className="w-4 h-4 text-amber-600 mb-1" />
                      <span className="text-[10px] text-stone-500 uppercase">Body</span>
                      <span className="text-xs font-medium text-stone-300">Medium</span>
                    </div>
                  </div>

                  <div className="mt-auto flex w-full">
                    <EcwidPurchaseButton
                      productId={ECWID_PRODUCT_BY_ORIGIN.peru}
                      productPageUrl={ECWID_PERU_PRODUCT_URL}
                      label="View Details"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Volcanic Origins — subscription */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="group relative h-full flex flex-col bg-stone-900 border border-stone-800 overflow-hidden shadow-lg"
              >
                <ProductTileMedia
                  to="/subscription"
                  src="/volcanic-origins-five-bags.png"
                  alt="Five Volcano Drip single-origin coffee bags"
                  fit="contain"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <Link to="/subscription" className="block group-hover:text-amber-500 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-1 leading-tight">Volcanic Origins</h3>
                    </Link>
                  </div>

                  <p className="text-sm text-stone-300 leading-relaxed mb-6 flex-grow">
                    <span className="font-bold text-white block mb-2">The Volcano Drip Subscription</span>
                    Explore the world&apos;s volcanic coffee regions with every delivery. Each box includes 4
                    freshly roasted coffees grown in mineral-rich volcanic soil—known for producing bold,
                    complex flavors.
                  </p>

                  <div className="mt-auto flex w-full">
                    {ECWID_SUBSCRIPTION_PRODUCT_ID || ECWID_SUBSCRIPTION_PRODUCT_URL ? (
                      <EcwidPurchaseButton
                        productId={ECWID_SUBSCRIPTION_PRODUCT_ID}
                        productPageUrl={ECWID_SUBSCRIPTION_PRODUCT_URL}
                        label="View Details"
                      />
                    ) : (
                      <Link to="/subscription" className="w-full">
                        <Button className="w-full bg-white hover:bg-stone-200 text-stone-900 font-bold h-10 rounded-none transition-colors">
                          View Details
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story/Origin Grid */}
        <section className="pt-12 pb-24 bg-stone-900 text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" alt="Barista preparing coffee" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-600 rounded-3xl p-8 flex flex-col justify-end hidden md:flex shadow-2xl">
                  <Mountain className="w-12 h-12 text-white mb-4" />
                  <p className="text-2xl font-bold leading-tight">Grown at 1300m+ altitude.</p>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="flex flex-col">
                <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-4 block">The Soil Story</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
                  MINERAL RICH <br />FLAVOUR DEEP.
                </h2>
                <div className="space-y-6 text-stone-400 text-lg leading-relaxed">
                  <p>Volcanic soil is naturally porous and nutrient-rich, acting as a filter and a fertilizer for coffee plants. This unique environment produces beans with exceptional complexity and vibrant acidity.</p>
                  <p>At Volcano Drip, we scout regions like the slopes of Honduras, the high plateaus of Guatemala, and the lush volcanic belts of Sumatra to bring you beans with a "terroir" you can actually taste.</p>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button asChild className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full px-8 shadow-xl shadow-amber-900/20">
                    <Link to="/sourcing">Sourcing Ethics</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Subscription CTA */}
        <section className="py-24 bg-amber-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <Zap className="w-full h-full text-amber-600" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-4 block">Membership</span>
                <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-6">
                  THE VOLCANIC <br />ORIGINS CLUB.
                </h2>
                <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                  Never run out of your favorite roasts. Subscribe to receive monthly rotations of our rarest single-origin beans, delivered fresh to your door.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 font-bold text-stone-800">
                    <div className="bg-amber-100 p-1 rounded-full"><Check className="w-4 h-4 text-amber-600" /></div>
                    Save up to 20% on every bag
                  </li>
                  <li className="flex items-center gap-3 font-bold text-stone-800">
                    <div className="bg-amber-100 p-1 rounded-full"><Check className="w-4 h-4 text-amber-600" /></div>
                    Convenient shipping to your front door
                  </li>
                  <li className="flex items-center gap-3 font-bold text-stone-800">
                    <div className="bg-amber-100 p-1 rounded-full"><Check className="w-4 h-4 text-amber-600" /></div>
                    Cancel or skip anytime
                  </li>
                </ul>
                <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="w-fit">
                  <Button asChild size="lg" className="bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-full w-full px-10">
                    <Link to="/subscription">Start Subscription</Link>
                  </Button>
                </motion.div>
              </div>
              <div className="lg:w-1/2 min-h-[400px]">
                <img src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/hero-2-jTlVw.png" alt="Box of fresh coffee beans" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Brewing Guide CTA */}
        <section className="py-24 bg-white border-b border-stone-200">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <BookOpen className="w-12 h-12 text-amber-500 mx-auto mb-6" />
              <h2 className="text-4xl font-black text-stone-900 mb-6">Master the Ritual</h2>
              <p className="text-stone-600 text-lg mb-10">Great beans deserve great preparation. Explore our detailed brewing guides for Chemex, V60, and Espresso to unlock the full potential of your volcanic coffee.</p>
              <Button asChild variant="outline" className="border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white font-bold px-8 rounded-full">
                <Link to="/brewing">Brewing Guides</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-stone-900 mb-4">Loved by the Community</h2>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />)}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => <motion.div key={i} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: i * 0.1
            }} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-between">
                  <div>
                    <Quote className="w-10 h-10 text-stone-100 mb-4" />
                    <p className="text-stone-700 italic mb-6 leading-relaxed">"{t.content}"</p>
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">{t.name}</p>
                    <p className="text-stone-500 text-sm">{t.role}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CallToAction />
      </div>
    </>;
};
export default HomePage;
