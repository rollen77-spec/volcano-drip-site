import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2, Mountain, Flame, ArrowRight, AlertCircle, Coffee } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi.js';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnL3N2Zz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0NTE1Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIjlDQTMzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+Cg==";

const stripHtml = html => {
  if (!html) return '';
  const processed = html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n');
  const tmp = document.createElement("DIV");
  tmp.innerHTML = processed;
  return tmp.textContent || tmp.innerText || "";
};

const extractTastingNotes = product => {
  if (!product) return null;
  const splitRegex = /[,•|/&\n]|\s+and\s+/i;
  
  if (product.additional_info && Array.isArray(product.additional_info)) {
    const infoSection = product.additional_info.find(info => 
      info.title && (info.title.toLowerCase().includes('tasting notes') || info.title.toLowerCase().includes('flavor'))
    );
    if (infoSection && infoSection.description) {
      const text = stripHtml(infoSection.description);
      const notes = text.split(splitRegex).map(n => n.trim()).filter(n => n.length > 0);
      if (notes.length > 0) return notes;
    }
  }
  
  const descriptionText = stripHtml(product.description || '');
  const notesMatch = descriptionText.match(/(?:Tasting Notes|Flavor Profile|Notes):\s*([^.\n]+)/i);
  if (notesMatch && notesMatch[1]) {
    return notesMatch[1].split(splitRegex).map(n => n.trim()).filter(n => n.length > 0 && n.length < 40);
  }
  return null;
};

const DEFAULT_ENRICHMENT = {
  elevation: '1,400–1,900m',
  process: 'Washed',
  roast: 'Medium',
  notes: ['Citrus', 'Stone Fruit', 'Cocoa'],
  body: 'Medium'
};

const ENRICHMENT_DATA = {
  'costa': {
    ...DEFAULT_ENRICHMENT,
    process: 'Honey',
    roast: 'Medium'
  },
  'primera luz': {
    ...DEFAULT_ENRICHMENT,
    elevation: '1,300–1,800m',
    process: 'Honey',
    roast: 'Light',
    body: 'Medium'
  },
  'guatemala': {
    ...DEFAULT_ENRICHMENT,
    process: 'Washed',
    roast: 'Dark'
  },
  'antigua': {
    ...DEFAULT_ENRICHMENT,
    elevation: '1,500–1,700m',
    process: 'Washed',
    roast: 'Medium',
    body: 'Medium'
  },
  'indonesia': {
    ...DEFAULT_ENRICHMENT,
    process: 'Wet-Hulled',
    roast: 'Extra Dark'
  },
  'sumatra': {
    ...DEFAULT_ENRICHMENT,
    elevation: '3,404m',
    process: 'Wet-Hulled',
    roast: 'Dark',
    body: 'Medium'
  },
  'peru': {
    ...DEFAULT_ENRICHMENT,
    process: 'Washed',
    roast: 'Light-Medium'
  },
  'inca': {
    ...DEFAULT_ENRICHMENT,
    elevation: '1,800–2,200m',
    process: 'Washed',
    roast: 'Light-Medium',
    body: 'Medium'
  },
  'honduras': {
    ...DEFAULT_ENRICHMENT,
    process: 'Natural',
    roast: 'Med-Dark'
  },
  'copan': {
    ...DEFAULT_ENRICHMENT,
    elevation: '1,400–1,900m',
    process: 'Natural',
    roast: 'Medium-Dark',
    body: 'Medium'
  }
};

const getEnrichedData = title => {
  if (!title) return DEFAULT_ENRICHMENT;
  const lowerTitle = title.toLowerCase();
  for (const [key, data] of Object.entries(ENRICHMENT_DATA)) {
    if (lowerTitle.includes(key)) return data;
  }
  return DEFAULT_ENRICHMENT;
};

// Check if a product is "Primera Luz" and return the specific image override
const getProductImage = product => {
  if (product && product.title && product.title.toLowerCase().includes('primera luz')) {
    return '/primera-luz-front.png';
  }
  return product.image || placeholderImage;
};

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const displayVariant = useMemo(() => product.variants && product.variants.length > 0 ? product.variants[0] : null, [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  
  const displayPrice = useMemo(() => {
    if (!displayVariant) return 'N/A';
    return hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted;
  }, [displayVariant, hasSale]);
  
  const originalPrice = useMemo(() => hasSale ? displayVariant.price_formatted : null, [displayVariant]);
  
  const staticData = useMemo(() => getEnrichedData(product.title), [product.title]);
  const dynamicNotes = useMemo(() => extractTastingNotes(product), [product]);
  const displayNotes = dynamicNotes && dynamicNotes.length > 0 ? dynamicNotes : staticData.notes;

  // Get overridden or actual image
  const displayImage = getProductImage(product);
  
  // Check if this is the Volcanic Origins Box
  const isVolcanicBox = product.title && product.title.toLowerCase().includes('volcanic origins box');
  
  const handleAddToCart = useCallback(async e => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.variants || product.variants.length === 0) {
      toast({
        variant: "destructive",
        title: "Unavailable",
        description: "This product is currently unavailable."
      });
      return;
    }
    if (product.variants.length > 1) {
      navigate(`/product/${product.id}`);
      return;
    }
    const defaultVariant = product.variants[0];
    const defaultGrind = "Whole Bean (not ground)";
    try {
      await addToCart({
        ...product,
        image: displayImage
      }, defaultVariant, 1, defaultVariant.inventory_quantity, defaultGrind);
      toast({
        title: "Added to Cart! 🛒",
        description: `${product.title} (${defaultGrind}) has been added to your cart.`,
        className: "bg-stone-900 text-white border-none"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error adding to cart",
        description: error.message
      });
    }
  }, [product, addToCart, toast, navigate, displayImage]);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay: index * 0.1 }} 
      className="h-full"
    >
      <div className="group relative h-full flex flex-col bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1">
        
        {/* Image Section */}
        <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-white/5">
           <img 
             src={displayImage} 
             alt={product.title} 
             className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 p-4" 
           />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-60" />

            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md border border-stone-800 px-3 py-1.5 flex items-baseline gap-2 shadow-xl">
               {hasSale && <span className="text-xs text-stone-500 line-through font-medium">{originalPrice}</span>}
               <span className="text-amber-500 font-bold">{displayPrice}</span>
            </div>

            {/* Ribbon */}
            {product.ribbon_text && (
              <div className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-lg">
                {product.ribbon_text}
              </div>
            )}
        </Link>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title & Subtitle */}
          <div className="mb-4">
            <Link to={`/product/${product.id}`} className="block group-hover:text-amber-500 transition-colors">
              <h3 className="text-xl font-bold text-white mb-1 leading-tight">{product.title}</h3>
            </Link>
            <p className="text-stone-400 text-sm line-clamp-2 min-h-[2.5em] whitespace-pre-wrap">{product.subtitle}</p>
          </div>

          {isVolcanicBox ? (
            <div className="mb-6 mt-auto">
              <h4 className="text-sm font-bold text-amber-500 mb-2">Four Coffees. Four Volcanic Origins.</h4>
              <p className="text-sm text-stone-300 leading-relaxed">Each delivery features 4 premium coffees from volcanic regions around the world, where mineral-rich soil creates deeper, more vibrant flavor.</p>
            </div>
          ) : (
            <>
              {/* Tasting Notes Section with Title */}
              <div className="mb-6">
                <h4 className="text-[10px] uppercase text-stone-500 font-bold mb-2 tracking-widest">Tasting Notes</h4>
                <div className="flex flex-wrap gap-2 text-sm text-stone-300 font-medium">
                   {displayNotes.slice(0, 4).map((note, i) => (
                     <span key={i}>{note}{i < Math.min(displayNotes.length, 4) - 1 ? ' •' : ''}</span>
                   ))}
                </div>
              </div>

              {/* Tech Specs Grid */}
              <div className="grid grid-cols-3 gap-2 py-4 border-t border-stone-800 mb-6 mt-auto">
                 <div className="flex flex-col items-center justify-center text-center gap-1">
                    <Mountain className="w-4 h-4 text-amber-600 mb-1" />
                    <span className="text-[10px] text-stone-500 uppercase">Elevation</span>
                    <span className="text-xs font-medium text-stone-300">{staticData.elevation}</span>
                 </div>
                 <div className="flex flex-col items-center justify-center text-center gap-1 border-l border-stone-800">
                    <Flame className="w-4 h-4 text-amber-600 mb-1" />
                    <span className="text-[10px] text-stone-500 uppercase">Roast</span>
                    <span className="text-xs font-medium text-stone-300">{staticData.roast}</span>
                 </div>
                 <div className="flex flex-col items-center justify-center text-center gap-1 border-l border-stone-800">
                    <Coffee className="w-4 h-4 text-amber-600 mb-1" />
                    <span className="text-[10px] text-stone-500 uppercase">Body</span>
                    <span className="text-xs font-medium text-stone-300">{staticData.body}</span>
                 </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="mt-auto flex gap-3">
             <Button onClick={handleAddToCart} className="flex-1 bg-white hover:bg-stone-200 text-stone-900 font-bold h-10 rounded-none transition-colors">
               <ShoppingCart className="w-4 h-4 mr-2" />
               Add to Cart
             </Button>
             <Link to={`/product/${product.id}`}>
               <Button variant="outline" className="px-3 border-stone-700 bg-transparent text-stone-400 hover:text-white hover:bg-stone-800 hover:border-stone-600 h-10 rounded-none">
                 <ArrowRight className="w-4 h-4" />
               </Button>
             </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProductsWithQuantities = async () => {
      try {
        setLoading(true);
        setError(null);
        let productsResponse;
        try {
          productsResponse = await getProducts({
            _t: Date.now()
          });
        } catch (apiError) {
          console.error("Failed to fetch products list:", apiError);
          throw new Error("Unable to load products at this time.");
        }
        
        if (!productsResponse || !productsResponse.products || productsResponse.products.length === 0) {
          setProducts([]);
          return;
        }
        
        const productIds = productsResponse.products.map(product => product.id);
        let quantitiesResponse = { variants: [] };
        
        try {
          quantitiesResponse = await getProductQuantities({
            fields: 'inventory_quantity',
            product_ids: productIds
          });
        } catch (qtyError) {
          console.warn("Failed to fetch product quantities, proceeding with default stock info", qtyError);
        }
        
        const variantQuantityMap = new Map();
        if (quantitiesResponse && Array.isArray(quantitiesResponse.variants)) {
          quantitiesResponse.variants.forEach(variant => {
            variantQuantityMap.set(variant.id, variant.inventory_quantity);
          });
        }
        
        const productsWithQuantities = productsResponse.products.map(product => ({
          ...product,
          variants: (product.variants || []).map(variant => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
          }))
        }));
        
        setProducts(productsWithQuantities);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductsWithQuantities();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-16 w-16 text-stone-900 animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-stone-100 rounded-sm border border-stone-200">
        <AlertCircle className="h-10 w-10 text-stone-400 mb-3" />
        <p className="text-stone-600 font-medium mb-2">Unable to load products</p>
        <p className="text-stone-500 text-sm">{error}</p>
        <Button variant="outline" className="mt-4 border-stone-300 hover:bg-stone-200" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center text-stone-500 p-8 bg-stone-100 rounded-sm">
        <p>No products available at the moment.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductsList;