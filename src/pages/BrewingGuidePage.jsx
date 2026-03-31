import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Droplet, Scale, Thermometer } from 'lucide-react';

/** Same asset as brew-method cards — restores photo hero from earlier Horizons build. */
const BREWING_HERO_IMG =
  'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/generated-image-1773098695367-gP1kZ.jpeg';
const BrewingGuidePage = () => {
  return <>
      <Helmet>
        <title>Brewing Guides | Volcano Drip</title>
        <meta name="description" content="Master the art of brewing volcanic coffee." />
      </Helmet>
      
      <div className="min-h-screen bg-stone-50">
        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-stone-900 py-20 text-center text-white md:min-h-[360px]">
          <div className="absolute inset-0 z-0 opacity-55">
            <img
              alt="Coffee brewing — rich pour and aromatic cup"
              className="h-full w-full object-cover object-center"
              src={BREWING_HERO_IMG}
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-900 via-stone-900/55 to-stone-900/35" />
          <div className="relative z-20 max-w-4xl px-4">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Master the Eruption</h1>
            <p className="mx-auto max-w-xl text-lg text-stone-200">
              Volcanic beans are dense and complex. Brewing them requires patience and precision to unlock the
              full spectrum of flavor.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-16">
          
          <Tabs defaultValue="v60">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white border border-stone-200 p-1 h-auto">
                <TabsTrigger value="v60" className="px-6 py-3 data-[state=active]:bg-stone-900 data-[state=active]:text-white">Pour Over (V60)</TabsTrigger>
                <TabsTrigger value="chemex" className="px-6 py-3 data-[state=active]:bg-stone-900 data-[state=active]:text-white">Chemex</TabsTrigger>
                <TabsTrigger value="french" className="px-6 py-3 data-[state=active]:bg-stone-900 data-[state=active]:text-white">French Press</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="v60">
              <BrewMethod title="V60 Pour Over" description="The V60 highlights the bright acidity and floral notes of our lighter roasts like the Primera Luz." ratio="1:16" grind="Medium-Fine (Sea Salt)" temp="93°C / 200°F" time="2:30 - 3:00" steps={["Rinse the paper filter with hot water to remove paper taste and warm the dripper.", "Add 20g of ground coffee. Create a small divot in the center.", "Pour 60g of water (bloom) and wait 30 seconds. Watch the gas escape.", "Pour the remaining water in slow, concentric circles, keeping the water level steady.", "Let it draw down completely. The coffee bed should be flat."]} imageQuery="Pour over coffee brewing v60" />
            </TabsContent>

            <TabsContent value="chemex">
               <BrewMethod title="Chemex" description="Perfect for clean, sweet cups. The thick filter removes oils, resulting in a tea-like body ideal for our Costa Rican beans." ratio="1:16" grind="Medium-Coarse (Kosher Salt)" temp="94°C / 201°F" time="4:00 - 5:00" steps={["Unfold the filter (3 layers on the spout side) and rinse thoroughly with hot water.", "Add 30g of coffee. Give it a gentle shake to level the grounds.", "Bloom with 60g of water for 45 seconds.", "Pour steadily in the center, then spiral out, avoiding the walls.", "Pour in stages if necessary to maintain temperature.", "Discard the filter and swirl the coffee before serving."]} imageQuery="Chemex coffee brewing" />
            </TabsContent>

            <TabsContent value="french">
               <BrewMethod title="French Press" description="The choice for heavy bodies and deep, earthy flavors. Ideal for our Sumatra Black." ratio="1:15" grind="Coarse (Breadcrumbs)" temp="95°C / 203°F" time="4:00" steps={["Preheat your press with hot water, then discard it.", "Add 40g of coarse coffee grounds.", "Pour 600g of water vigorously to ensure all grounds are wet.", "Place the lid on but do not plunge. Wait 4 minutes.", "Stir the crust that formed on top. Most grounds will sink.", "Scoop off any remaining foam/oil for a cleaner cup (optional).", "Plunge gently and serve immediately."]} imageQuery="French press coffee brewing" />
            </TabsContent>
          </Tabs>

          {/* Storage Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 border border-stone-200">
             <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Storage & Freshness</h3>
                <p className="text-stone-600 mb-4">To keep the flavors potent, treat your beans like fresh produce.</p>
                <ul className="space-y-2 text-stone-600 text-sm">
                   <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-700">DO:</span> Keep in an airtight container in a cool, dark place.
                   </li>
                   <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-700">DO:</span> Buy whole beans and grind just before brewing.
                   </li>
                   <li className="flex items-start gap-2">
                      <span className="font-bold text-stone-400">DON'T:</span> Store coffee in the fridge (moisture is the enemy).
                   </li>
                </ul>
             </div>
             <div className="h-48 md:h-full bg-stone-100">
               <img alt="Coffee beans in a glass jar airtight" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1552546714-b5e571b88c22" />
             </div>
          </div>
        </div>
      </div>
    </>;
};
const BrewMethod = ({
  title,
  description,
  ratio,
  grind,
  temp,
  time,
  steps,
  imageQuery
}) => <motion.div initial={{
  opacity: 0,
  y: 10
}} animate={{
  opacity: 1,
  y: 0
}} className="bg-white border border-stone-200 p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
      <div>
         <h2 className="text-3xl font-bold text-stone-900 mb-4">{title}</h2>
         <p className="text-stone-600 mb-8">{description}</p>
         
         <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
               <Scale className="text-stone-400" />
               <div>
                  <div className="text-xs uppercase tracking-wide text-stone-400">Ratio</div>
                  <div className="font-bold text-stone-900">{ratio}</div>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <Droplet className="text-stone-400" />
               <div>
                  <div className="text-xs uppercase tracking-wide text-stone-400">Grind</div>
                  <div className="font-bold text-stone-900">{grind}</div>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <Thermometer className="text-stone-400" />
               <div>
                  <div className="text-xs uppercase tracking-wide text-stone-400">Temp</div>
                  <div className="font-bold text-stone-900">{temp}</div>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <Clock className="text-stone-400" />
               <div>
                  <div className="text-xs uppercase tracking-wide text-stone-400">Time</div>
                  <div className="font-bold text-stone-900">{time}</div>
               </div>
            </div>
         </div>
      </div>
      <div className="h-64 md:h-auto bg-stone-100">
         <img alt={imageQuery} className="w-full h-full object-cover" src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/generated-image-1773098695367-gP1kZ.jpeg" />
      </div>
    </div>

    <div className="border-t border-stone-100 pt-8">
       <h3 className="text-xl font-bold text-stone-900 mb-6">The Ritual</h3>
       <ol className="space-y-4">
          {steps.map((step, i) => <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
                   {i + 1}
                </span>
                <p className="text-stone-600 pt-1">{step}</p>
             </li>)}
       </ol>
    </div>
  </motion.div>;
export default BrewingGuidePage;