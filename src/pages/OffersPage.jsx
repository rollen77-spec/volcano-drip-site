import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Tag, X, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-stone-900 text-white border-t border-stone-800 shadow-2xl"
    >
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-stone-300">
          We use cookies to improve your experience and deliver personalized offers. By continuing to use our site, you agree to our{' '}
          <Link to="/cookies" className="text-amber-500 hover:underline">
            Cookies Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0 w-full sm:w-auto">
          <Button onClick={handleAccept} className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold">
            Accept
          </Button>
          <Button variant="outline" size="icon" onClick={() => setIsVisible(false)} className="border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white shrink-0">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const SUBSCRIBE_URL = import.meta.env.VITE_NEWSLETTER_API_URL || '/api/subscribe';

const OffersPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must agree to the terms to subscribe.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          name: formData.name.trim(),
          consent: formData.consent,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data.error ||
          (res.status === 501
            ? 'Newsletter signup is not configured yet. Add server env vars in Vercel (see .env.example).'
            : 'There was a problem submitting your request.');
        throw new Error(msg);
      }

      toast({
        title: 'Success!',
        description: "You've been successfully subscribed to our exclusive offers.",
      });

      setFormData({ name: '', email: '', consent: false });
      setTimeout(() => navigate('/thanks'), 1500);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'There was a problem submitting your request.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans w-full relative">
      <Helmet>
        <title>Newsletter &amp; Offers | Volcano Drip</title>
        <meta
          name="description"
          content="Join the Volcano Drip newsletter for exclusive offers, new coffee releases, brewing tips, and special promotions."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1597949332421-25f2b66056de?w=1600&h=900&fit=crop"
            alt="Coffee and newsletter aesthetic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block mb-6 px-4 py-1.5 border border-amber-500/30 rounded-full bg-amber-500/10 backdrop-blur-md text-amber-400 font-bold tracking-widest text-xs uppercase">
              Volcano Drip Newsletter
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              BETTER COFFEE <br />
              <span className="text-amber-500">STARTS HERE.</span>
            </h1>

            <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Join the Volcano Drip newsletter for exclusive offers, new coffee releases, brewing tips, and special promotions.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-4 rounded-full font-bold shadow-xl shadow-amber-900/20 text-lg"
            >
              <Tag className="w-5 h-5" />
              Special offer! Get 20% off your first purchase.
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="flex-grow py-24 px-4 bg-stone-50">
        <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[560px] bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-stone-900 mb-3 tracking-tight">Join the Newsletter and Save</h2>
              <p className="text-stone-600 text-lg">Enter your details below to unlock your discount.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-2 text-left">
                <Label htmlFor="name" className="text-stone-800 font-bold text-sm">
                  Name <span className="text-stone-400 font-normal">(Optional)</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="h-12 bg-stone-50 border-stone-200 focus-visible:ring-stone-900 transition-colors"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="email" className="text-stone-800 font-bold text-sm">
                  Email Address <span className="text-amber-600">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={`h-12 bg-stone-50 transition-colors ${
                    errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-stone-200 focus-visible:ring-stone-900'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>

              <div className="flex items-start space-x-3 pt-4 text-left bg-stone-50 p-4 rounded-xl border border-stone-100">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-stone-900 bg-white border-stone-300 rounded focus:ring-stone-900 cursor-pointer shrink-0"
                />
                <div className="space-y-1">
                  <Label htmlFor="consent" className="text-xs text-stone-600 cursor-pointer leading-relaxed block font-medium">
                    By subscribing, you consent to receive promotional emails from Volcano Drip including offers, updates, and coffee news. You may withdraw your consent at any time by clicking the unsubscribe link in our emails.{' '}
                    <span className="text-amber-600">*</span>
                  </Label>
                  {errors.consent && <p className="text-red-500 text-xs mt-1 font-bold">{errors.consent}</p>}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-bold rounded-full mt-6 bg-stone-900 hover:bg-stone-800 shadow-xl shadow-stone-900/10 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <CookieBanner />
    </div>
  );
};

export default OffersPage;
