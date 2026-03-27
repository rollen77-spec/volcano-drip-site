import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Lock, Loader2, ArrowLeft, MapPin, Mail, CreditCard, Calendar, User, CheckCircle, AlertCircle, ShieldCheck, Settings, Edit2, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { initializeCheckout } from '@/api/EcommerceApi.js';
import { useToast } from '@/components/ui/use-toast';
import GrindSelector from '@/components/GrindSelector';
import GiftCheckoutSection from './GiftCheckoutSection';

const STEPS = {
  CART: 'cart',
  SHIPPING: 'shipping', 
  PAYMENT: 'payment',   
};

class CartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-lg max-w-md w-full text-center mx-4">
            <AlertCircle className="text-red-500 w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-xl text-white mb-2">Cart Error</h3>
            <Button 
              onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} 
              variant="outline"
              className="mt-4 min-h-[48px]"
            >
              Reload Page
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const InputField = ({ label, id, name, type = "text", value, onChange, placeholder, required, error, disabled, maxLength, icon: Icon }) => (
  <div className="space-y-1.5 w-full">
    <label htmlFor={id} className="text-xs sm:text-sm font-bold text-stone-400 uppercase tracking-wider flex justify-between items-center">
      <span>{label} {required && <span className="text-amber-500">*</span>}</span>
    </label>
    <div className="relative">
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`flex min-h-[48px] w-full rounded-sm border ${error ? 'border-red-500 bg-red-900/10' : 'border-stone-700 bg-stone-800'} pl-3 ${Icon ? 'pr-10' : 'pr-3'} py-2 text-sm sm:text-base text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all disabled:opacity-50 touch-manipulation`}
      />
      {Icon && <Icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-stone-500" />}
    </div>
    {error && <span className="text-xs text-red-400 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200">
      <span className="w-1 h-1 rounded-full bg-red-400" /> {error}
    </span>}
  </div>
);

const ShoppingCartContent = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, updateGrind, getCartTotal } = useCart();
  
  const [step, setStep] = useState(STEPS.CART); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [editingItemKey, setEditingItemKey] = useState(null); 
  
  const [email, setEmail] = useState('');
  
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'International'
  });

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'International'
  });

  const [useSameAddress, setUseSameAddress] = useState(true);

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: ''
  });
  
  const [orderGiftInfo, setOrderGiftInfo] = useState({ isGift: false, details: null });
  const [errors, setErrors] = useState({});

  const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  useEffect(() => {
    if (!isCartOpen) {
      const timer = setTimeout(() => {
        setStep(STEPS.CART);
        setErrors({});
        setIsProcessing(false);
        setEditingItemKey(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({ ...prev, [name]: value }));
    
    if (useSameAddress && !orderGiftInfo.isGift) {
       setShippingData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[`billing_${name}`]) setErrors(prev => ({ ...prev, [`billing_${name}`]: undefined }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
    if (errors[`shipping_${name}`]) setErrors(prev => ({ ...prev, [`shipping_${name}`]: undefined }));
  };

  const handleSameAddressChange = (e) => {
    const checked = e.target.checked;
    setUseSameAddress(checked);
    if (checked) {
      setShippingData({ ...billingData });
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith('shipping_')) delete newErrors[key];
      });
      setErrors(newErrors);
    }
  };

  const handleGrindUpdate = (variantId, oldGrind, newGrind, giftDetails) => {
    if (oldGrind === newGrind) {
      setEditingItemKey(null);
      return;
    }
    
    updateGrind(variantId, oldGrind, newGrind, giftDetails);
    toast({
      title: "Grind Updated",
      description: `Updated preference to ${newGrind}`,
      className: "bg-stone-900 text-white border-none",
    });
    setEditingItemKey(null);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      if (!/^[0-9\s]*$/.test(value)) return;
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      if (!/^[0-9/]*$/.test(value)) return;
      formattedValue = formatExpiry(value);
    } else if (name === 'cvc') {
      if (!/^[0-9]*$/.test(value) || value.length > 4) return;
    }

    setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const checkCartCustomFields = () => {
    let isValid = true;
    const newErrors = { ...errors };
    const validationErrorMessages = [];

    cartItems.forEach((item) => {
      const missingForThisItem = [];
      item.product.custom_fields?.forEach(field => {
         let value = "";
         const titleLower = field.title.toLowerCase();
         
         // Extract values from cart item state where they act as selectedOptions
         if (titleLower.includes('grind')) {
           value = item.grind;
         } else if (orderGiftInfo.isGift || item.giftDetails) {
            const giftDetails = orderGiftInfo.isGift ? orderGiftInfo.details : item.giftDetails;
            if (giftDetails) {
              if (titleLower.includes('name') || titleLower.includes('recipient')) {
                value = giftDetails.recipientName;
              } else if (titleLower.includes('email')) {
                value = giftDetails.recipientEmail;
              } else if (titleLower.includes('occasion')) {
                value = giftDetails.occasion;
              } else if (titleLower.includes('message') || titleLower.includes('note')) {
                value = giftDetails.personalMessage;
              }
            }
          }

         if (field.is_required && (!value || String(value).trim() === '')) {
            newErrors[`cart_custom_${item.variant.id}_${field.id}`] = `Please select ${field.title}`;
            missingForThisItem.push(field.title);
            isValid = false;
         }
      });
      
      if (missingForThisItem.length > 0) {
        validationErrorMessages.push(`Product '${item.product.title}' is missing: ${missingForThisItem.join(', ')}`);
      }
    });

    return { isValid, newErrors, validationErrorMessages };
  };

  const validateCartOptions = () => {
    const { isValid, newErrors, validationErrorMessages } = checkCartCustomFields();

    if (!isValid) {
       setErrors(newErrors);
       toast({
         title: "Please select all required options before proceeding",
         description: validationErrorMessages.join('. '),
         variant: "destructive"
       });
    }

    return isValid;
  };

  const validateShipping = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    
    if (!billingData.firstName.trim()) newErrors.billing_firstName = "Required";
    if (!billingData.lastName.trim()) newErrors.billing_lastName = "Required";
    if (!billingData.address.trim()) newErrors.billing_address = "Address is required";
    if (!billingData.city.trim()) newErrors.billing_city = "Required";
    if (!billingData.zip.trim()) newErrors.billing_zip = "Required";
    
    if (!orderGiftInfo.isGift && !useSameAddress) {
      if (!shippingData.firstName.trim()) newErrors.shipping_firstName = "Required";
      if (!shippingData.lastName.trim()) newErrors.shipping_lastName = "Required";
      if (!shippingData.address.trim()) newErrors.shipping_address = "Address is required";
      if (!shippingData.city.trim()) newErrors.shipping_city = "Required";
      if (!shippingData.zip.trim()) newErrors.shipping_zip = "Required";
    }
    
    if (orderGiftInfo.isGift && orderGiftInfo.details) {
      const { recipientName, recipientEmail, street, city, state, zip, country } = orderGiftInfo.details;
      if (!recipientName || !recipientEmail || !street || !city || !state || !zip || !country) {
         toast({
           title: "Incomplete Gift Details",
           description: "Please fill out all required fields in the gift form.",
           variant: "destructive"
         });
         return false; 
      }
      if (!emailRegex.test(recipientEmail)) {
         toast({
           title: "Invalid Email",
           description: "Please provide a valid email address for the gift recipient.",
           variant: "destructive"
         });
         return false;
      }
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    
    const cleanCard = paymentData.cardNumber.replace(/\s/g, '');
    if (cleanCard.length !== 16) newErrors.cardNumber = "Enter a valid 16-digit card number";
    
    if (!paymentData.expiry || paymentData.expiry.length !== 5) newErrors.expiry = "MM/YY";
    else {
      const [month, year] = paymentData.expiry.split('/');
      const numMonth = parseInt(month, 10);
      if (numMonth < 1 || numMonth > 12) newErrors.expiry = "Invalid month";
    }

    if (!paymentData.cvc || paymentData.cvc.length < 3) newErrors.cvc = "3-4 digits";
    if (!paymentData.cardName.trim()) newErrors.cardName = "Name on card is required";

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const goToShipping = () => {
    if (cartItems.length === 0) return;
    if (validateCartOptions()) {
      setStep(STEPS.SHIPPING);
    }
  };

  const goToPayment = () => {
    if (validateShipping()) {
      setStep(STEPS.PAYMENT);
    }
  };

  const goBack = () => {
    if (step === STEPS.PAYMENT) setStep(STEPS.SHIPPING);
    else if (step === STEPS.SHIPPING) setStep(STEPS.CART);
  };

  const buildCheckoutPayloadData = () => {
    const items = [];
    const { isValid, newErrors, validationErrorMessages } = checkCartCustomFields();

    if (isValid) {
      cartItems.forEach(item => {
        const custom_field_values = [];

        item.product.custom_fields?.forEach(field => {
          let value = "";
          const titleLower = field.title.toLowerCase();

          if (titleLower.includes('grind')) {
            value = item.grind;
          } else if (orderGiftInfo.isGift || item.giftDetails) {
            const giftDetails = orderGiftInfo.isGift ? orderGiftInfo.details : item.giftDetails;
            if (giftDetails) {
              if (titleLower.includes('name') || titleLower.includes('recipient')) {
                value = giftDetails.recipientName;
              } else if (titleLower.includes('email')) {
                value = giftDetails.recipientEmail;
              } else if (titleLower.includes('occasion')) {
                value = giftDetails.occasion;
              } else if (titleLower.includes('message') || titleLower.includes('note')) {
                value = giftDetails.personalMessage;
              }
            }
          }

          if (value && String(value).trim() !== '') {
            custom_field_values.push({
              custom_field_id: field.id,
              value: String(value)
            });
          }
        });

        const payloadItem = {
          variant_id: item.variant.id,
          quantity: item.quantity,
        };

        if (custom_field_values.length > 0) {
          payloadItem.custom_field_values = custom_field_values;
        }

        items.push(payloadItem);
      });
    }

    return { items, isValid, newErrors, validationErrorMessages };
  };

  const handleFinalPayment = async () => {
    console.log("--- DEBUG: CHECKOUT INITIATED ---");
    console.log("Cart items before checkout:", JSON.parse(JSON.stringify(cartItems)));

    // 1. Validate Payment details
    if (!validatePayment()) {
      toast({
        title: "Payment Error",
        description: "Please check your card details.",
        variant: "destructive"
      });
      return;
    }

    // 2. Build payload and validate all custom fields
    const { items, isValid, newErrors, validationErrorMessages } = buildCheckoutPayloadData();

    if (!isValid) {
      console.error("Validation failed: missing required custom fields.", validationErrorMessages);
      setErrors(newErrors);
      setStep(STEPS.CART); // Go back to cart to show custom field errors
      toast({
        title: "Please select all required options before proceeding",
        description: validationErrorMessages.join('. '),
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setLoadingMessage("Verifying order details...");

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;
      const locale = navigator.language || 'en-US';

      const payload = { 
        items, 
        successUrl, 
        cancelUrl, 
        locale
      };

      console.log("--- DEBUG: FINAL CHECKOUT PAYLOAD ---");
      console.log("Payload:", JSON.stringify(payload, null, 2));

      const result = await initializeCheckout(payload);
      
      if (result && result.url) {
        window.location.href = result.url;
      } else {
        throw new Error("No checkout URL returned from API");
      }
      
    } catch (error) {
      console.error("Payment Error:", error);
      setIsProcessing(false);
      toast({
        title: 'Transaction Failed',
        description: 'Unable to process payment. Please verify your order details and try again.',
        variant: 'destructive',
      });
    }
  };

  const getHeaderTitle = () => {
    switch(step) {
      case STEPS.SHIPPING: return 'Shipping Details';
      case STEPS.PAYMENT: return 'Payment Method';
      default: return 'Your Cart';
    }
  };

  const getStepIndicator = () => {
    if (step === STEPS.CART) return null;
    return (
      <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 mt-1">
        <span className={step === STEPS.SHIPPING ? "text-amber-500" : ""}>Step 1</span>
        <span>/</span>
        <span className={step === STEPS.PAYMENT ? "text-amber-500" : ""}>Step 2</span>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          onClick={() => !isProcessing && setIsCartOpen(false)} 
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-stone-900 shadow-2xl flex flex-col border-l border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            {isProcessing && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 z-[60] bg-stone-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 sm:p-6"
               >
                 <div className="relative mb-8">
                   <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                   <Loader2 className="w-16 h-16 text-amber-500 animate-spin relative z-10" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Processing Payment</h3>
                 <p className="text-stone-400 max-w-xs animate-pulse text-sm">{loadingMessage}</p>
                 <p className="text-stone-600 text-xs mt-12 flex items-center gap-2">
                   <Lock className="w-3 h-3" /> 256-bit SSL Encrypted
                 </p>
               </motion.div>
            )}

            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-800 bg-stone-900/50 shrink-0">
              <div className="flex items-center gap-3">
                 {step !== STEPS.CART ? (
                    <Button variant="ghost" size="icon" onClick={goBack} className="text-stone-400 hover:text-white -ml-2 hover:bg-stone-800 min-h-[44px] min-w-[44px]">
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                 ) : (
                    <ShoppingCartIcon className="text-amber-500 w-5 h-5" />
                 )}
                 <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide leading-none">
                        {getHeaderTitle()}
                    </h2>
                    {getStepIndicator()}
                 </div>
              </div>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="text-stone-400 hover:text-white hover:bg-stone-800 min-h-[44px] min-w-[44px]" disabled={isProcessing}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-grow overflow-y-auto bg-stone-900 scrollbar-thin scrollbar-thumb-stone-700">
               
               {step === STEPS.CART && (
                  <div className="p-4 sm:p-6 space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="text-center text-stone-500 h-64 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-2">
                           <ShoppingCartIcon size={32} className="text-stone-600" />
                        </div>
                        <p className="text-base sm:text-lg font-medium text-stone-300">Your cart is empty</p>
                        <Button 
                          onClick={() => setIsCartOpen(false)} 
                          variant="link" 
                          className="text-amber-500 hover:text-amber-400 font-bold min-h-[48px]"
                        >
                          Continue Shopping
                        </Button>
                      </div>
                    ) : (
                      cartItems.map((item, index) => {
                        const giftKey = item.giftDetails ? JSON.stringify(item.giftDetails) : 'no-gift';
                        const itemKey = `${item.variant.id}-${item.grind}-${giftKey}`;
                        const isEditing = editingItemKey === itemKey;

                        const grindField = item.product.custom_fields?.find(f => f.title.toLowerCase().includes('grind'));
                        const errorKey = grindField ? `cart_custom_${item.variant.id}_${grindField.id}` : null;
                        const hasError = errorKey ? !!errors[errorKey] : false;

                        return (
                          <motion.div 
                            layout
                            key={itemKey} 
                            className={`flex gap-3 sm:gap-4 bg-stone-800/50 p-3 sm:p-4 rounded-lg border group transition-colors ${hasError ? 'border-red-500/50' : 'border-stone-800 hover:border-stone-700'}`}
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-stone-700 rounded-md overflow-hidden flex-shrink-0 relative">
                              <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                              {item.giftDetails && (
                                <div className="absolute top-0 right-0 bg-amber-500 text-white p-1 rounded-bl-md">
                                  <Gift className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                            <div className="flex-grow flex flex-col justify-between min-w-0">
                              <div>
                                <h3 className="font-bold text-white text-sm leading-tight mb-1 truncate">{item.product.title}</h3>
                                <p className="text-xs text-stone-400 mb-1">{item.variant.title}</p>
                                
                                {item.giftDetails && (
                                  <div className="flex items-center gap-1 text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 w-max mb-1 max-w-full overflow-hidden">
                                    <Gift className="w-3 h-3 shrink-0" />
                                    <span className="truncate">Gift for {item.giftDetails.recipientName.split(' ')[0]}</span>
                                  </div>
                                )}

                                {(item.grind || grindField) && (
                                  <div className="relative mt-2">
                                    {(isEditing || (!item.grind && hasError)) ? (
                                      <div className="animate-in slide-in-from-top-1 fade-in duration-200">
                                         <GrindSelector 
                                            selectedGrind={item.grind || ""} 
                                            onGrindChange={(newGrind) => {
                                              handleGrindUpdate(item.variant.id, item.grind, newGrind, item.giftDetails);
                                              if (errorKey && errors[errorKey]) {
                                                const newErrors = {...errors};
                                                delete newErrors[errorKey];
                                                setErrors(newErrors);
                                              }
                                            }} 
                                            showLabel={false}
                                            className={`mb-1 ${hasError ? 'ring-1 ring-red-500 rounded-md p-1' : ''}`}
                                            idPrefix={`cart-${index}`}
                                         />
                                         {hasError && <p className="text-xs text-red-400 mt-1 mb-1">{errors[errorKey]}</p>}
                                         <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => setEditingItemKey(null)} 
                                            className="h-8 min-h-[32px] text-xs text-stone-500 hover:text-stone-300 px-0"
                                         >
                                           {item.grind ? 'Cancel' : 'Close'}
                                         </Button>
                                      </div>
                                    ) : (
                                      <div className="group/grind">
                                        <p className={`text-xs flex flex-wrap items-center gap-1 ${hasError ? 'text-red-400' : 'text-amber-500/80'}`}>
                                          <Settings className="w-3 h-3 shrink-0" /> 
                                          <span className="truncate">{item.grind || `Select ${grindField?.title || 'Grind'}`}</span>
                                          <button 
                                            onClick={() => setEditingItemKey(itemKey)} 
                                            className="ml-1 text-stone-500 hover:text-amber-400 opacity-100 sm:opacity-0 sm:group-hover/grind:opacity-100 transition-opacity focus:opacity-100 p-1 sm:p-0"
                                            title="Edit Grind"
                                          >
                                            <Edit2 className="w-3 h-3" />
                                          </button>
                                        </p>
                                        {hasError && <p className="text-xs text-red-400 mt-1">{errors[errorKey]}</p>}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-sm text-amber-500 font-bold">
                                  {item.variant.sale_price_formatted || item.variant.price_formatted}
                                </p>
                                <div className="flex items-center bg-stone-900 rounded-md border border-stone-700 h-8">
                                  <button 
                                    onClick={() => updateQuantity(item.variant.id, item.grind, Math.max(1, item.quantity - 1), item.giftDetails)} 
                                    className="px-3 h-full flex items-center justify-center text-stone-400 hover:text-white touch-manipulation"
                                  >
                                    -
                                  </button>
                                  <span className="px-1 text-xs text-white min-w-[1.5rem] text-center">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.variant.id, item.grind, item.quantity + 1, item.giftDetails)} 
                                    className="px-3 h-full flex items-center justify-center text-stone-400 hover:text-white touch-manipulation"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.variant.id, item.grind, item.giftDetails)} 
                              className="self-start text-stone-500 hover:text-red-400 p-2 -m-2 sm:p-1 sm:m-0 touch-manipulation"
                            >
                              <X size={16} />
                            </button>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
               )}

               {step === STEPS.SHIPPING && (
                  <div className="p-4 sm:p-6 space-y-6">
                    <OrderSummary totalItems={totalItems} total={getCartTotal()} />
                    
                    <GiftCheckoutSection onGiftChange={setOrderGiftInfo} />

                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); goToPayment(); }}>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider">
                          <Mail className="w-4 h-4" /> Contact
                        </div>
                        <InputField 
                          id="email" 
                          name="email"
                          label="Email Address" 
                          type="email" 
                          value={email}
                          onChange={handleEmailChange}
                          error={errors.email}
                          required
                        />
                      </div>
                      
                      <div className="space-y-4 pt-4 border-t border-stone-800">
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider">
                          <MapPin className="w-4 h-4" /> Billing Address
                        </div>
                        {orderGiftInfo.isGift && (
                          <p className="text-xs text-stone-400 mb-2">Please provide your billing details. The recipient's shipping address is collected in the gift form above.</p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField 
                            id="billing_firstName" 
                            name="firstName"
                            label="First Name" 
                            value={billingData.firstName}
                            onChange={handleBillingChange}
                            error={errors.billing_firstName}
                            required
                          />
                          <InputField 
                            id="billing_lastName" 
                            name="lastName"
                            label="Last Name" 
                            value={billingData.lastName}
                            onChange={handleBillingChange}
                            error={errors.billing_lastName}
                            required
                          />
                        </div>
                        <InputField 
                          id="billing_address" 
                          name="address"
                          label="Street Address" 
                          value={billingData.address}
                          onChange={handleBillingChange}
                          error={errors.billing_address}
                          required
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField 
                            id="billing_city" 
                            name="city"
                            label="City" 
                            value={billingData.city}
                            onChange={handleBillingChange}
                            error={errors.billing_city}
                            required
                          />
                          <InputField 
                            id="billing_zip" 
                            name="zip"
                            label="Postal Code" 
                            value={billingData.zip}
                            onChange={handleBillingChange}
                            error={errors.billing_zip}
                            required
                          />
                        </div>
                        <div className="space-y-1.5 opacity-70 cursor-not-allowed">
                          <label className="text-xs sm:text-sm font-bold text-stone-400 uppercase tracking-wider">Country</label>
                          <div className="flex min-h-[48px] w-full rounded-sm border border-stone-700 bg-stone-800 px-3 py-2 text-sm sm:text-base text-stone-400 items-center justify-between">
                              <span>International Shipping</span>
                              <Lock className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {!orderGiftInfo.isGift && (
                        <div className="space-y-4 pt-4 border-t border-stone-800">
                          <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider">
                            <MapPin className="w-4 h-4" /> Shipping Address
                          </div>

                          <div className="flex items-center gap-3 py-2">
                            <input 
                              type="checkbox" 
                              id="sameAddress" 
                              checked={useSameAddress}
                              onChange={handleSameAddressChange}
                              className="w-4 h-4 rounded border-stone-700 text-amber-600 focus:ring-amber-500 bg-stone-800"
                            />
                            <label htmlFor="sameAddress" className="text-sm font-medium text-stone-300 cursor-pointer">
                              Billing address same as shipping address
                            </label>
                          </div>

                          {!useSameAddress && (
                            <div className="space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField 
                                  id="shipping_firstName" 
                                  name="firstName"
                                  label="First Name" 
                                  value={shippingData.firstName}
                                  onChange={handleShippingChange}
                                  error={errors.shipping_firstName}
                                  required
                                />
                                <InputField 
                                  id="shipping_lastName" 
                                  name="lastName"
                                  label="Last Name" 
                                  value={shippingData.lastName}
                                  onChange={handleShippingChange}
                                  error={errors.shipping_lastName}
                                  required
                                />
                              </div>
                              <InputField 
                                id="shipping_address" 
                                name="address"
                                label="Street Address" 
                                value={shippingData.address}
                                onChange={handleShippingChange}
                                error={errors.shipping_address}
                                required
                              />
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField 
                                  id="shipping_city" 
                                  name="city"
                                  label="City" 
                                  value={shippingData.city}
                                  onChange={handleShippingChange}
                                  error={errors.shipping_city}
                                  required
                                />
                                <InputField 
                                  id="shipping_zip" 
                                  name="zip"
                                  label="Postal Code" 
                                  value={shippingData.zip}
                                  onChange={handleShippingChange}
                                  error={errors.shipping_zip}
                                  required
                                />
                              </div>
                              <div className="space-y-1.5 opacity-70 cursor-not-allowed">
                                <label className="text-xs sm:text-sm font-bold text-stone-400 uppercase tracking-wider">Country</label>
                                <div className="flex min-h-[48px] w-full rounded-sm border border-stone-700 bg-stone-800 px-3 py-2 text-sm sm:text-base text-stone-400 items-center justify-between">
                                    <span>International Shipping</span>
                                    <Lock className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </form>
                  </div>
               )}

               {step === STEPS.PAYMENT && (
                 <div className="p-4 sm:p-6 space-y-6">
                    <OrderSummary totalItems={totalItems} total={getCartTotal()} />
                    
                    <div className="bg-amber-900/10 border border-amber-900/20 p-4 rounded-lg flex gap-3">
                       <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
                       <div className="text-xs sm:text-sm text-stone-400">
                         <p className="font-bold text-amber-500 mb-1">Secure Transaction</p>
                         Your payment details are encrypted and processed securely. We never store your full card number.
                       </div>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleFinalPayment(); }}>
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider mb-4">
                          <CreditCard className="w-4 h-4" /> Credit Card Details
                        </div>
                        
                        <div className="space-y-4">
                          <InputField 
                            id="cardName" 
                            name="cardName"
                            label="Cardholder Name" 
                            placeholder="J. Smith"
                            value={paymentData.cardName}
                            onChange={handlePaymentChange}
                            error={errors.cardName}
                            required
                            icon={User}
                          />
                          
                          <InputField 
                            id="cardNumber" 
                            name="cardNumber"
                            label="Card Number" 
                            placeholder="0000 0000 0000 0000"
                            value={paymentData.cardNumber}
                            onChange={handlePaymentChange}
                            error={errors.cardNumber}
                            maxLength={19}
                            required
                            icon={CreditCard}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <InputField 
                              id="expiry" 
                              name="expiry"
                              label="Expiry (MM/YY)" 
                              placeholder="MM/YY"
                              value={paymentData.expiry}
                              onChange={handlePaymentChange}
                              error={errors.expiry}
                              maxLength={5}
                              required
                              icon={Calendar}
                            />
                            <InputField 
                              id="cvc" 
                              name="cvc"
                              label="CVC" 
                              type="password"
                              placeholder="123"
                              value={paymentData.cvc}
                              onChange={handlePaymentChange}
                              error={errors.cvc}
                              maxLength={4}
                              required
                              icon={Lock}
                            />
                          </div>
                        </div>
                    </form>
                 </div>
               )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-stone-800 bg-stone-900 z-10 shrink-0">
                <div className="space-y-2 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center text-white text-base sm:text-lg font-bold">
                    <span>Total</span>
                    <span>{getCartTotal()}</span>
                  </div>
                  {step === STEPS.CART && <p className="text-[10px] sm:text-xs text-stone-500 text-right uppercase tracking-wider">Calculated at checkout</p>}
                  {step !== STEPS.CART && <p className="text-[10px] sm:text-xs text-stone-500 text-right uppercase tracking-wider">Including Taxes</p>}
                </div>
                
                {step === STEPS.CART && (
                  <Button onClick={goToShipping} className="w-full bg-white hover:bg-stone-200 text-stone-900 font-bold py-4 sm:py-6 min-h-[48px] text-base sm:text-lg rounded-sm touch-manipulation">
                     Checkout <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-180 ml-2" />
                  </Button>
                )}
                
                {step === STEPS.SHIPPING && (
                  <Button onClick={goToPayment} className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold py-4 sm:py-6 min-h-[48px] text-base sm:text-lg rounded-sm touch-manipulation">
                     Continue to Payment <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-180 ml-2" />
                  </Button>
                )}

                {step === STEPS.PAYMENT && (
                  <Button 
                    onClick={handleFinalPayment} 
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 sm:py-6 min-h-[48px] text-base sm:text-lg rounded-sm shadow-lg shadow-green-900/20 touch-manipulation"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing...
                      </>
                    ) : (
                      <>
                        Pay & Complete Order
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const OrderSummary = ({ totalItems, total }) => (
  <div className="bg-stone-800/40 p-3 sm:p-4 rounded-lg border border-stone-800/60 mb-4 sm:mb-6">
     <h4 className="text-stone-300 font-bold mb-2 flex items-center gap-2 text-xs sm:text-sm">
       <CheckCircle className="w-4 h-4 text-green-500" /> Order Summary
     </h4>
     <div className="flex justify-between text-sm text-stone-400">
        <span>{totalItems} Items</span>
        <span className="text-white font-medium">{total}</span>
     </div>
  </div>
);

const ShoppingCart = (props) => (
  <CartErrorBoundary>
    <ShoppingCartContent {...props} />
  </CartErrorBoundary>
);

export default ShoppingCart;