
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mountain, Flame, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import MasonryGallery from '@/components/MasonryGallery';
import EcwidPurchaseButton from '@/components/EcwidPurchaseButton';
import {
  ECWID_COSTA_RICA_PRODUCT_URL,
  ECWID_GUATEMALA_PRODUCT_URL,
  ECWID_HONDURAS_PRODUCT_URL,
  ECWID_INDONESIA_PRODUCT_URL,
  ECWID_PERU_PRODUCT_URL,
  ECWID_PRODUCT_BY_ORIGIN,
} from '@/config/ecwid';

const originData = {
  'costa-rica': {
    id: 'costa-rica',
    title: 'Primera Luz', 
    country: 'Costa Rica',
    region: 'Arenal Volcano Region',
    description: 'Grown on Costa Rica\'s volcanic slopes, Primera Luz is shaped by mineral-rich soil, high elevations, and cool mountain conditions that slow maturation and enhance balance. The result is a clean, vibrant cup with refined brightness, natural sweetness, and exceptional clarity—an elegant expression of Costa Rica\'s volcanic landscape.', 
    tastingNotes: ['Citrus', 'Honey', 'Milk Chocolate'],
    roastLevel: 'Light',
    elevation: '1,300 - 1,800m',
    process: 'Honey Processed',
    imageAlt: 'Costa Rican coffee plantation near volcano',
    storyImage: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/98d89109a9d6fc0a4e802a837d54688d.jpg'
  },
  'guatemala': {
    id: 'guatemala',
    title: 'Antigua Ember',
    country: 'Guatemala',
    region: 'Antigua Valley',
    description: 'Grown in Guatemala\'s storied Antigua Valley, Antigua Ember is shaped by the surrounding volcanoes of Agua, Fuego, and Acatenango. Nutrient-rich volcanic soil and dramatic temperature shifts foster slow, even maturation, resulting in a rich, layered cup with natural sweetness, cocoa and caramel depth, subtle spice, and a clean, balanced finish—an enduring expression of its volcanic origin.',
    tastingNotes: ['Cocoa', 'Caramel', 'Subtle Spice'],
    roastLevel: 'Medium',
    elevation: '1,500 - 1,700m',
    process: 'Washed',
    imageAlt: 'Guatemala Antigua coffee farm',
    storyImage: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/6db328cd5083ec53e63b24b8eb012914.jpg'
  },
  'indonesia': {
    id: 'indonesia',
    title: 'Sumatra Black',
    country: 'Indonesia',
    region: 'Lake Toba',
    description: "Grown in Sumatra's rugged volcanic highlands, this coffee is shaped by dense rainforest terrain, mineral-rich soil, and time-honoured wet-hulling methods. These conditions produce a deep, full-bodied cup with grounded earthy character, subtle smoky depth, and naturally low acidity—an expression as powerful and untamed as the land itself.",
    tastingNotes: ['Earthy', 'Dark Chocolate', 'Smoky'],
    roastLevel: 'Dark',
    elevation: '3,404m',
    process: 'Wet-Hulled',
    imageAlt: 'Sumatra volcanic highlands coffee',
    storyImage: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/f413b2f085078ba9960d7a119ee62f80.jpg'
  },
  'peru': {
    id: 'peru',
    title: 'Inca Ascent',
    country: 'Peru',
    region: 'Andes Volcanic Belt',
    description: 'Grown high in Peru\'s Andean highlands, Inca Ascent is shaped by cool mountain air, fertile soil, and elevated terrain that slows cherry maturation. This natural pace allows the coffee to develop a clean, balanced profile with gentle acidity and natural sweetness, revealing soft citrus, stone fruit, and subtle cocoa notes—an elegant expression of its high-altitude origin.',
    tastingNotes: ['Soft Citrus', 'Stone Fruit', 'Subtle Cocoa'],
    roastLevel: 'Light-Medium',
    elevation: '1,800 - 2,200m',
    process: 'Washed',
    imageAlt: 'Peruvian Andes coffee farming',
    storyImage: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/13588fb50cd1cb7db85abcf3b31278dd.jpg'
  },
  'honduras': {
    id: 'honduras',
    title: 'Copán Rise',
    country: 'Honduras',
    region: 'Western Highlands',
    description: 'Grown in the highlands of western Honduras, Copán Rise is shaped by fertile soil, warm days, and cool mountain nights that allow the coffee to mature slowly. This balance produces a smooth, well-rounded cup with gentle acidity and natural sweetness, layered with notes of caramel, cocoa, and subtle stone fruit—an inviting expression of its highland origin.',
    tastingNotes: ['Citrus', 'Stone Fruit', 'Cocoa'],
    roastLevel: 'Medium-Dark',
    elevation: '1,400 - 1,900m',
    process: 'Natural',
    imageAlt: 'Honduras coffee mountains',
    storyImage: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/5356f328654b16d36916df7784e7eb71.jpg'
  }
};

/**
 * Each origin gallery: exactly four images in this order —
 * [0] front, [1] side, [2] three-quarter, [3] back.
 * Use local `/…-front.png` for the hero front to avoid CDN mix-ups between SKUs.
 */
const costaRicaGalleryImages = [
  { src: '/primera-luz-front.png', alt: 'Primera Luz — front' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/411e9d119d8ab0564ed9ade25c9f83d5.png', alt: 'Primera Luz — side (volcano artwork)' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/06af6a885b40e55a21ac04a8cdd5b815.png', alt: 'Primera Luz — three-quarter view' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/5bf50b1e18a9d48bfbe35d0defb35294.png', alt: 'Primera Luz — back' },
];

const defaultGalleryImages = [
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/9c54b0318732594ba5bdff086a255122.png', alt: 'Coffee bag — front' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/411e9d119d8ab0564ed9ade25c9f83d5.png', alt: 'Coffee bag — side' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/06af6a885b40e55a21ac04a8cdd5b815.png', alt: 'Coffee bag — three-quarter' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/5bf50b1e18a9d48bfbe35d0defb35294.png', alt: 'Coffee bag — back' },
];

const guatemalaGalleryImages = [
  { src: '/antigua-ember-front.png', alt: 'Antigua Ember — front' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/87bb12de7fca5a0144bb5f8633c7bf05.png', alt: 'Antigua Ember — side (volcano graphic)' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/7f6100f1b889eab99b21c62d7c06cef1.png', alt: 'Antigua Ember — three-quarter (tan label)' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/0d34ece396d1895e402c73d11f0a566c.png', alt: 'Antigua Ember — back' },
];

const indonesiaGalleryImages = [
  { src: '/sumatra-black-front.png', alt: 'Sumatra Black — front' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/24917196317ac6f5bba04e662092a757.png', alt: 'Sumatra Black — side profile' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/7636b73b436367dfe1557ecf77904e1e.png', alt: 'Sumatra Black — three-quarter (logo + panel)' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/09a7af04d7d4691367261ff6b6677d5a.png', alt: 'Sumatra Black — back (brand story)' },
];

const peruGalleryImages = [
  { src: '/inca-ascent-front.png', alt: 'Inca Ascent — front' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/739b44385c1031f952fe30480becaf36.png', alt: 'Inca Ascent — side' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/d77b7a11209bdb80cf284f1cdd967e7d.png', alt: 'Inca Ascent — three-quarter' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/3ffe7793b209d3738d5c264a6b48eb06.png', alt: 'Inca Ascent — back / detail' },
];

/** Copán Rise only — drop duplicate “front” CDN and generic gradient bottle that showed other SKUs. */
const hondurasGalleryImages = [
  { src: '/copan-rise-front.png', alt: 'Copán Rise — front' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/3f2132c122fff3c0f1bc7982e72fcbfe.png', alt: 'Copán Rise — side' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/0a7b694158eaebf3da40563c01636036.png', alt: 'Copán Rise — three-quarter' },
  { src: 'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/5a85e75d76ff01955d54aaefd721005b.png', alt: 'Copán Rise — back' },
];

const getHeroImage = key => {
  switch (key) {
    case 'costa-rica':
      return <img className="w-full h-full object-cover" alt="Costa Rican coffee plantation near volcano" src="https://images.unsplash.com/photo-1677123620899-dc5577ee51ec" />;
    case 'guatemala':
      return <img className="w-full h-full object-cover" alt="Guatemala Antigua coffee farm" src="https://images.unsplash.com/photo-1678377918724-fed576b84f43" />;
    case 'indonesia':
      return <img className="w-full h-full object-cover" alt="Sumatra volcanic highlands coffee" src="https://images.unsplash.com/photo-1681174379234-7b94c277b53b" />;
    case 'peru':
      return <img className="w-full h-full object-cover" alt="Peruvian Andes coffee farming" src="https://images.unsplash.com/photo-1504204266331-b80e10ebd4e5" />;
    case 'honduras':
      return <img className="w-full h-full object-cover" alt="Honduras coffee mountains" src="https://images.unsplash.com/photo-1642641374320-8be258f80ddd" />;
    default:
      return null;
  }
};

const CoffeeOriginPage = ({ originKey }) => {
  const data = originData[originKey];
  const { toast } = useToast();
  
  if (!data) return <div>Origin not found</div>;
  
  const currentGalleryImages = originKey === 'costa-rica'
    ? costaRicaGalleryImages
    : originKey === 'guatemala'
      ? guatemalaGalleryImages
      : originKey === 'indonesia'
        ? indonesiaGalleryImages
        : originKey === 'peru'
          ? peruGalleryImages
          : originKey === 'honduras'
            ? hondurasGalleryImages
            : defaultGalleryImages;
  
  const handleNotAvailable = () => {
    toast({
      title: "Online ordering coming soon",
      description: "This origin will be available in our online store shortly.",
      className: "bg-stone-900 text-white border-none"
    });
  };
  
  return <>
      <Helmet>
        <title>{data.title} - Volcano Drip</title>
        <meta name="description" content={data.description} />
      </Helmet>
      
      <div className="min-h-screen bg-stone-50 pb-20">
        {/* Hero Header */}
        <div className="relative h-[60vh] bg-stone-900 overflow-hidden">
          <div className="absolute inset-0 opacity-60">
             {getHeroImage(originKey)}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/50" />
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start text-white">
            <motion.span initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-amber-500 font-bold tracking-widest uppercase mb-2">
              {data.country}
            </motion.span>
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="text-5xl md:text-7xl font-bold mb-4">
              {data.title}
            </motion.h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="bg-white p-8 md:p-12 shadow-xl rounded-sm border border-stone-100">
            {/* Main Content Area */}
            <div className="flex flex-col gap-10 mb-10">
              {/* Specs & Origin Story */}
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-stone-100 pb-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-stone-100 p-3 rounded-full mb-3 text-stone-700">
                      <Mountain size={24} />
                    </div>
                    <span className="text-sm text-stone-500 uppercase tracking-wide">Elevation</span>
                    <span className="font-semibold text-stone-900">{data.elevation}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-stone-100 p-3 rounded-full mb-3 text-stone-700">
                      <Flame size={24} />
                    </div>
                    <span className="text-sm text-stone-500 uppercase tracking-wide">Roast Level</span>
                    <span className="font-semibold text-stone-900">{data.roastLevel}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-stone-100 p-3 rounded-full mb-3 text-stone-700">
                      <Droplets size={24} />
                    </div>
                    <span className="text-sm text-stone-500 uppercase tracking-wide">Process</span>
                    <span className="font-semibold text-stone-900">{data.process}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-stone-900">The Origin Story</h2>
                <p className="text-lg text-stone-600 leading-relaxed mb-6">
                  {data.description}
                </p>
                {data.storyImage && <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.5,
                duration: 0.8
              }} className="w-full overflow-hidden rounded-sm shadow-lg mb-10">
                    <img src={data.storyImage} alt={`${data.title} volcanic landscape and coffee cherries`} className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
                  </motion.div>}
              </div>

              <div className="w-full">
                 <MasonryGallery images={currentGalleryImages} />
              </div>
            </div>

            <div className="bg-stone-900 text-stone-100 p-6 rounded-sm mb-10">
              <h3 className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-4">Tasting Notes</h3>
              <div className="flex flex-wrap gap-4">
                {data.tastingNotes.map((note, index) => <span key={index} className="px-4 py-2 border border-stone-700 rounded-full text-sm">
                    {note}
                  </span>)}
              </div>
            </div>
            
            <div className="border-t border-stone-200 pt-8">
              <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
                 {ECWID_PRODUCT_BY_ORIGIN[originKey] ? (
                   <EcwidPurchaseButton
                     variant="origin"
                     productId={ECWID_PRODUCT_BY_ORIGIN[originKey]}
                     productPageUrl={
                       originKey === 'guatemala'
                         ? ECWID_GUATEMALA_PRODUCT_URL
                         : originKey === 'honduras'
                           ? ECWID_HONDURAS_PRODUCT_URL
                           : originKey === 'indonesia'
                             ? ECWID_INDONESIA_PRODUCT_URL
                             : originKey === 'peru'
                               ? ECWID_PERU_PRODUCT_URL
                               : originKey === 'costa-rica'
                                 ? ECWID_COSTA_RICA_PRODUCT_URL
                                 : ''
                     }
                   />
                 ) : (
                   <Button onClick={handleNotAvailable} className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 px-8 rounded-none min-w-[160px]">
                     Coming Soon
                   </Button>
                 )}
              </div>
              
              <div className="mt-8 text-center sm:text-left">
                <Link to="/" className="text-stone-500 hover:text-stone-900 hover:underline text-sm inline-flex items-center gap-2">
                   <ArrowLeft size={16} /> Back to Home
                </Link>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </>;
};

export default CoffeeOriginPage;
