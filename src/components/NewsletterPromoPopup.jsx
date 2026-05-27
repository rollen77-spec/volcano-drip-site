import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getPopupMessage, NEWSLETTER_POPUP_IMAGE } from '@/config/newsletterPopup';
import { useNewsletterPopupTrigger } from '@/hooks/useNewsletterPopupTrigger';
import {
  NEWSLETTER_CONSENT_LABEL,
  submitNewsletterSignup,
  validateNewsletterForm,
} from '@/lib/newsletterSubscribe';
import {
  markNewsletterSubscribed,
  recordPopupImpression,
} from '@/lib/newsletterPopupStorage';
import { cn } from '@/lib/utils';

export default function NewsletterPromoPopup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { open, close, messageIndex, pathname } = useNewsletterPopupTrigger();

  const message = getPopupMessage(messageIndex);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', consent: false });
  const [errors, setErrors] = useState({});
  const recordedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      recordedRef.current = false;
      return;
    }
    if (recordedRef.current || !pathname) return;
    recordedRef.current = true;
    recordPopupImpression(pathname);
  }, [open, pathname]);

  const handleOpenChange = (next) => {
    if (!next) close();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateNewsletterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitNewsletterSignup({
        ...formData,
        source: 'volcano-drip-popup',
      });

      markNewsletterSubscribed();
      close();
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        overlayClassName="z-[100] bg-black/70"
        className={cn(
          'z-[100] flex max-h-[92dvh] w-[calc(100%-1rem)] max-w-lg flex-col gap-0 overflow-hidden border-stone-200 p-0',
          'max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:left-0 max-md:top-auto',
          'max-md:max-h-[92dvh] max-md:w-full max-md:max-w-none max-md:translate-x-0 max-md:translate-y-0',
          'max-md:rounded-b-none max-md:rounded-t-2xl',
          'max-md:data-[state=open]:slide-in-from-bottom max-md:data-[state=closed]:slide-out-to-bottom',
          'sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg',
          '[&>button]:right-3 [&>button]:top-3 [&>button]:z-10',
          '[&>button]:inline-flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center [&>button]:justify-center [&>button]:p-0',
          '[&>button]:rounded-full [&>button]:bg-black/50 [&>button]:text-white',
          '[&>button]:opacity-90 [&>button]:ring-1 [&>button]:ring-white/30',
          '[&>button]:hover:bg-black/70 [&>button]:hover:opacity-100',
          '[&>button_svg]:h-5 [&>button_svg]:w-5 [&>button_svg]:shrink-0',
        )}
      >
        <div className="relative shrink-0">
          <img
            src={NEWSLETTER_POPUP_IMAGE}
            alt="Volcano Drip latte and Primera Luz coffee bag on a café table"
            width={1024}
            height={571}
            className="aspect-[2/1] w-full object-cover object-center max-md:aspect-[16/9]"
            loading="eager"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/15 to-stone-900/25"
            aria-hidden
          />
          <div className="absolute bottom-2 left-3 right-14 sm:bottom-3 sm:left-4 sm:right-12">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <div
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg ring-2 ring-white/40 sm:px-5 sm:text-base"
                role="status"
              >
                <Tag className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
                <span className="text-lg leading-none sm:text-xl">20%</span>
                <span className="leading-tight">off your first order</span>
              </div>
            </div>
            <p className="text-base font-black leading-tight tracking-tight text-white drop-shadow-sm sm:text-lg">
              {message.headline}
            </p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4 [-webkit-overflow-scrolling:touch] sm:px-6 sm:py-6">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="sr-only">{message.headline}</DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-stone-600">
              {message.body}
            </DialogDescription>
            <p className="text-sm font-medium text-stone-700">
              Enter your details below to unlock your discount.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
            <div className="space-y-2 text-left">
              <Label htmlFor="popup-name" className="text-sm font-bold text-stone-800">
                First name <span className="text-amber-600">*</span>
              </Label>
              <Input
                id="popup-name"
                name="name"
                autoComplete="given-name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your first name"
                className={`h-12 bg-stone-50 text-base ${errors.name ? 'border-red-500' : 'border-stone-200'}`}
              />
              {errors.name ? <p className="text-xs font-medium text-red-500">{errors.name}</p> : null}
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="popup-email" className="text-sm font-bold text-stone-800">
                Email Address <span className="text-amber-600">*</span>
              </Label>
              <Input
                id="popup-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className={`h-12 bg-stone-50 text-base ${errors.email ? 'border-red-500' : 'border-stone-200'}`}
              />
              {errors.email ? <p className="text-xs font-medium text-red-500">{errors.email}</p> : null}
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50 p-3 text-left sm:p-4">
              <input
                type="checkbox"
                id="popup-consent"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-stone-300"
              />
              <div className="space-y-1">
                <Label
                  htmlFor="popup-consent"
                  className="block cursor-pointer text-xs font-medium leading-relaxed text-stone-600"
                >
                  {NEWSLETTER_CONSENT_LABEL}{' '}
                  <span className="text-amber-600">*</span>
                </Label>
                {errors.consent ? <p className="text-xs font-bold text-red-500">{errors.consent}</p> : null}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 w-full rounded-full bg-stone-900 text-lg font-bold hover:bg-stone-800"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
                  Subscribing...
                </>
              ) : (
                'Subscribe Now'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
