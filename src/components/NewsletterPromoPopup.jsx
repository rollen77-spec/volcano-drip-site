import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Tag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { NEWSLETTER_SUBSCRIBE_URL } from '@/config/newsletter';
import { getPopupMessage } from '@/config/newsletterPopup';
import { useNewsletterPopupTrigger } from '@/hooks/useNewsletterPopupTrigger';
import {
  markNewsletterSubscribed,
  recordPopupImpression,
} from '@/lib/newsletterPopupStorage';

export default function NewsletterPromoPopup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { open, setOpen, close, messageIndex, pathname } = useNewsletterPopupTrigger();

  const message = getPopupMessage(messageIndex);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', consent: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && pathname) {
      recordPopupImpression(pathname);
    }
  }, [open, pathname]);

  const handleOpenChange = (next) => {
    if (!next) close();
    else setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'First name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.consent) newErrors.consent = 'You must agree to receive emails.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(NEWSLETTER_SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          name: formData.name.trim(),
          consent: formData.consent,
          source: 'volcano-drip-popup',
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.error ||
            (res.status === 501
              ? 'Newsletter signup is not configured yet.'
              : 'There was a problem submitting your request.'),
        );
      }

      markNewsletterSubscribed();
      close();
      toast({
        title: 'You\'re in!',
        description: 'Check your inbox for your 20% off code and coffee news.',
      });
      setFormData({ name: '', email: '', consent: false });
      setTimeout(() => navigate('/thanks'), 1200);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="z-[60] max-h-[min(92vh,640px)] max-w-md overflow-y-auto border-stone-200 bg-white p-6 sm:p-8">
        <DialogHeader className="space-y-3 text-left">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Tag className="h-3.5 w-3.5" aria-hidden />
            20% off first order
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-stone-900">
            {message.headline}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-stone-600">
            {message.body}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="popup-name" className="text-sm font-semibold text-stone-800">
              First name <span className="text-amber-600">*</span>
            </Label>
            <Input
              id="popup-name"
              name="name"
              autoComplete="given-name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your first name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name ? <p className="text-xs font-medium text-red-500">{errors.name}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-email" className="text-sm font-semibold text-stone-800">
              Email <span className="text-amber-600">*</span>
            </Label>
            <Input
              id="popup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email ? <p className="text-xs font-medium text-red-500">{errors.email}</p> : null}
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50 p-3">
            <input
              type="checkbox"
              id="popup-consent"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 shrink-0 rounded border-stone-300"
            />
            <Label htmlFor="popup-consent" className="cursor-pointer text-xs leading-relaxed text-stone-600">
              I agree to receive promotional emails from Volcano Drip. Unsubscribe anytime.{' '}
              <span className="text-amber-600">*</span>
            </Label>
          </div>
          {errors.consent ? <p className="text-xs font-medium text-red-500">{errors.consent}</p> : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-stone-900 text-base font-bold hover:bg-stone-800"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Subscribing…
              </>
            ) : (
              'Get 20% off — subscribe'
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-stone-500">
          Prefer the full signup page?{' '}
          <Link
            to="/offers"
            className="font-semibold text-amber-700 underline-offset-2 hover:underline"
            onClick={close}
          >
            View offers
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}
