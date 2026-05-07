import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Truck, RefreshCw as Refreshcw, ShieldCheck, Loader2, Minus, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { getProduct, getProductQuantities } from '@/api/EcommerceApi';
import { Helmet } from 'react-helmet';
import GrindSelector from '@/components/GrindSelector';
import GiftToggle from '@/components/GiftToggle';
import PageHero from '@/components/PageHero';

const formatDescription = (content) => {
  if (!content) return { type: 'empty' };

  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(content);

  if (hasHtmlTags) {
    return { type: 'html', content };
  }

  const hasDoubleNewlines = /\n\s*\n/.test(content);

  if (hasDoubleNewlines) {
    const formattedHtml = content
      .split(/\n\s*\n/)
      .filter(p => p.trim())
      .map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');
      
    return { type: 'html', content: formattedHtml };
  }

  return { type: 'text', content };
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState("Whole Bean (not ground)");
  const [giftInfo, setGiftInfo] = useState({ isGift: false, details: null });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let productData;
        try {
          productData = await getProduct(id);
          console.log('--- DEBUG: RAW API RESPONSE FROM getProduct ---');
          console.log(JSON.parse(JSON.stringify(productData)));
        } catch (apiError) {
          console.error("API Error fetching product:", apiError);
          if (apiError.message && (apiError.message.includes('404') || apiError.message.includes('not found'))) {
             throw new Error('Product not found');
          }
          throw new Error('Failed to load product details');
        }

        if (!productData) {
          throw new Error('Product not found');
        }
        
        let quantitiesResponse;
        try {
          quantitiesResponse = await getProductQuantities({
            fields: 'inventory_quantity',
            product_ids: [productData.id]
          });
        } catch (qtyError) {
          console.warn("Failed to fetch quantities, assuming default stock", qtyError);
          quantitiesResponse = { variants: [] };
        }

        const variantQuantityMap = new Map();
        if (quantitiesResponse && Array.isArray(quantitiesResponse.variants)) {
          quantitiesResponse.variants.forEach(variant => {
            variantQuantityMap.set(variant.id, variant.inventory_quantity);
          });
        }

        const productWithQuantities = {
          ...productData,
          variants: (productData.variants || []).map(variant => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
          }))
        };

        console.log('--- DEBUG: PRODUCT DATA STRUCTURE ---');
        console.log('Full product data:', JSON.parse(JSON.stringify(productWithQuantities)));
        console.log('Product custom_fields (root level):', productWithQuantities.custom_fields);
        console.log('Product variants array:', productWithQuantities.variants);
        console.log('First variant full structure:', productWithQuantities.variants?.[0]);
        console.log('First variant options:', productWithQuantities.variants?.[0]?.options);
        console.log('First variant custom_fields (if any exist here):', productWithQuantities.variants?.[0]?.custom_fields);
        console.log('-------------------------------------');

        setProduct(productWithQuantities);
        if (productWithQuantities.variants && productWithQuantities.variants.length > 0) {
          setSelectedVariant(productWithQuantities.variants[0]);
        }
      } catch (err) {
        console.error("Error in fetchProduct:", err);
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const newVal = prev + delta;
      if (newVal < 1) return 1;
      if (selectedVariant && newVal > selectedVariant.inventory_quantity) {
        toast({
          title: "Max quantity reached",
          description: `Only ${selectedVariant.inventory_quantity} available.`,
          variant: "destructive"
        });
        return selectedVariant.inventory_quantity;
      }
      return newVal;
    });
  };

  const validateGiftInfo = () => {
    if (!giftInfo.isGift || !giftInfo.details) return true;
    const { recipientName, recipientEmail, street, city, state, zip, country } = giftInfo.details;
    if (!recipientName || !recipientEmail || !street || !city || !state || !zip || !country) {
      toast({
        title: "Incomplete Gift Details",
        description: "Please fill out all required fields in the gift form before adding to cart.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    
    if (!validateGiftInfo()) return;

    try {
      const giftPayload = giftInfo.isGift ? giftInfo.details : null;
      await addToCart(product, selectedVariant, quantity, selectedVariant.inventory_quantity, selectedGrind, giftPayload);
      
      const giftMessage = giftPayload ? ` (as a gift)` : '';
      toast({
        title: "Added to Cart! 🛒",
        description: `${quantity}x ${product.title} (${selectedGrind})${giftMessage} added to your cart.`,
        className: "bg-stone-900 text-white border-none",
      });
      
      // Reset gift form after successful add
      if (giftInfo.isGift) {
        setGiftInfo({ isGift: false, details: null });
      }
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error adding to cart",
        description: error.message,
      });
    }
  };

  const displayPrice = useMemo(() => {
    if (!selectedVariant) return '';
    return selectedVariant.sale_price_in_cents 
      ? selectedVariant.sale_price_formatted 
      : selectedVariant.price_formatted;
  }, [selectedVariant]);
  
  const originalPrice = useMemo(() => {
    if (!selectedVariant || !selectedVariant.sale_price_in_cents) return null;
    return selectedVariant.price_formatted;
  }, [selectedVariant]);

  const descriptionData = useMemo(() => formatDescription(product?.description), [product?.description]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-stone-50">
        <Loader2 className="h-16 w-16 text-stone-900 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-stone-50 gap-6 p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full flex flex-col items-center">
          <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Product Not Found</h2>
          <p className="text-stone-600 text-lg mb-6">
            {error === 'Product not found' 
              ? "We couldn't find the product you're looking for. It may have been removed or is temporarily unavailable." 
              : "Something went wrong while loading this product."}
          </p>
          <Button onClick={() => navigate('/store')} className="w-full bg-stone-900 hover:bg-stone-800 text-white">
            Return to Store
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-12">
      <Helmet>
        <title>{product.title} | Volcano Drip</title>
        <meta name="description" content={product.description || `Buy ${product.title} from Volcano Drip.`} />
      </Helmet>

      <PageHero
        size="compact"
        kicker="Shop"
        title={product.title}
        titleClassName="!normal-case text-3xl !leading-tight md:text-5xl md:!leading-[1.05]"
        imageSrc={product.image || 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1600'}
        imageAlt=""
        overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/60"
        sectionClassName="py-12 md:py-16"
      />

      <div className="max-w-7xl mx-auto px-4 pt-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 hover:bg-stone-200 text-stone-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 md:p-12 shadow-sm rounded-sm">
          <div className="space-y-4">
            <div className="aspect-square bg-stone-100 overflow-hidden rounded-sm relative">
              <img 
                src={product.image || "https://placehold.co/600x600?text=No+Image"} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
              {product.ribbon_text && (
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-lg">
                  {product.ribbon_text}
                </div>
              )}
            </div>
          </div>

            <div className="flex flex-col">
            <div className="flex items-baseline gap-4 mb-6">
              {originalPrice && (
                <span className="text-xl text-stone-400 line-through">{originalPrice}</span>
              )}
              <span className="text-2xl font-bold text-amber-600">{displayPrice}</span>
            </div>
            
            {descriptionData.type === 'html' ? (
              <div 
                className="prose prose-stone text-stone-600 mb-8 max-w-none [&_p]:mb-4" 
                dangerouslySetInnerHTML={{ __html: descriptionData.content }} 
              />
            ) : (
              <div className="prose prose-stone text-stone-600 mb-8 whitespace-pre-line max-w-none">
                {descriptionData.content}
              </div>
            )}

            {product.variants && product.variants.length > 1 && (
               <div className="mb-6">
                 <label className="block text-sm font-bold text-stone-900 mb-2">Select Option</label>
                 <div className="flex flex-wrap gap-2">
                   {product.variants.map(variant => (
                     <button
                       key={variant.id}
                       onClick={() => setSelectedVariant(variant)}
                       className={`px-4 py-2 border text-sm font-medium transition-colors ${
                         selectedVariant?.id === variant.id
                           ? 'border-amber-600 bg-amber-50 text-amber-700'
                           : 'border-stone-200 text-stone-600 hover:border-stone-300'
                       }`}
                     >
                       {variant.title}
                     </button>
                   ))}
                 </div>
               </div>
            )}
            
            <GrindSelector selectedGrind={selectedGrind} onGrindChange={setSelectedGrind} />

            <div className="mb-6">
              <GiftToggle 
                key={giftInfo.isGift ? 'active' : 'inactive'} // force re-render on toggle if needed
                onGiftChange={setGiftInfo} 
                isDarkTheme={false} 
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b border-stone-100 mt-2">
               <div className="flex items-center border border-stone-200 rounded-sm bg-white">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-stone-50 text-stone-500 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-stone-900">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-stone-50 text-stone-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
               </div>
               
               <Button 
                 onClick={handleAddToCart}
                 className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold h-12 rounded-sm text-lg"
                 disabled={!selectedVariant || selectedVariant.inventory_quantity === 0}
               >
                 <ShoppingCart className="mr-2 h-5 w-5" />
                 {selectedVariant?.inventory_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
               </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm text-stone-500">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-amber-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <Refreshcw className="w-5 h-5 text-amber-600" />
                <span>Freshly roasted within 48 hours of shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Secure payment & satisfaction guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;