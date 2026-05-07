import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Leaf, ShieldCheck, MapPin } from 'lucide-react';
import PageHero from '@/components/PageHero';

const SourcingPage = () => {
  return <>
      <Helmet>
        <title>Sourcing & Sustainability | Volcano Drip</title>
        <meta name="description" content="Our commitment to the earth and the farmers who tend it." />
      </Helmet>
      
      <div className="min-h-screen bg-stone-50">
        <PageHero
          kicker="Sourcing"
          title={
            <>
              ROOTED IN
              <br />
              RESPECT.
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1670758611084-e216510c5433"
          imageAlt="Coffee farmer holding fresh red coffee cherries"
          imageWrapperExtraClassName="opacity-90"
          overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/50"
          sectionClassName="min-h-0 md:min-h-0 md:h-[80vh] h-[60vh]"
          contentMaxWidthClassName="max-w-5xl"
        />

        {/* Introduction */}
        <section className="py-20 px-4 max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-light text-stone-600 leading-relaxed">
            Volcanic soil is incredibly fertile, but it's also fragile. We work directly with farmers who understand that to harvest the fire of the earth, one must also protect it.
          </p>
        </section>

        {/* Pillars of Sustainability */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
           {/* Pillar 1: Organic Farming */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
              <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="order-2 md:order-1">
                 <h2 className="text-3xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                   <Leaf className="text-green-700" /> Organic Farming
                 </h2>
                 <p className="text-stone-600 text-lg leading-relaxed mb-6">
                   90% of our beans are certified organic. Our partners use natural composting methods, often utilizing volcanic ash itself to balance soil pH, eliminating the need for synthetic fertilizers that harm local waterways.
                 </p>
                 <ul className="space-y-3 text-stone-600">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-900 rounded-full" /> No synthetic pesticides</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-900 rounded-full" /> Shade-grown under native canopies</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-900 rounded-full" /> Natural pest control</li>
                 </ul>
              </motion.div>
              <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="order-1 md:order-2 h-[500px] bg-stone-200 rounded-sm overflow-hidden">
                 <img alt="Lush green coffee farm with shade trees" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1681174379234-7b94c277b53b" />
              </motion.div>
           </div>
           
           {/* Pillar 2: Beyond Fair Trade */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="h-[600px] bg-stone-200 rounded-sm overflow-hidden order-1">
                 <img alt="Volcanic landscape with coffee plants" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1654727317205-c0efb54ceb7e" />
              </motion.div>
              
              <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="order-2">
                 <h2 className="text-3xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                   <ShieldCheck className="text-amber-700" /> Beyond Fair Trade
                 </h2>
                 <p className="text-stone-600 text-lg leading-relaxed mb-6">We believe Fair Trade is just the starting point. Through Direct Trade, we work directly with producers and pay well above market rates—so communities in these demanding volcanic regions can truly thrive.
            </p>
                 <p className="text-stone-600 text-lg leading-relaxed mb-10">
                   By cutting out the middlemen, we ensure transparency and quality while putting more profit into the hands of the people who do the hard work.
                 </p>
                 
                 <div className="flex flex-wrap items-center gap-8">
                     <div className="w-24 md:w-32">
                        <img src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/9efb789db7ed0895dccd945c32cdccce.png" alt="Canada Organic Certified Logo" className="w-full h-auto object-contain" />
                     </div>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* Canadian Roasting Section */}
        <section className="bg-stone-100 py-16 px-4 border-t border-stone-200">
           <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-6"> {/* Increased size for better visibility */}
                 <img src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/6fe18c735163feea65123456f1b18613.jpg" alt="Red Maple Leaf icon" className="w-full h-full object-contain mix-blend-multiply opacity-70" />
              </div>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Globally Sourced. Canadian Roasted.</h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">While our beans travel from the ends of the earth, our craft is homed in Canada. Every batch is carefully roasted, tested, and packaged locally to ensure the "volcanic" profile remains intact.</p>
           </div>
        </section>
      </div>
    </>;
};
export default SourcingPage;