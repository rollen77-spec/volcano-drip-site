import React, { useEffect, useState } from 'react';
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
        className={cn(
          'z-[60] flex max-h-[min(92vh,720px)] w-[calc(100%-2rem)] max-w-lg flex-col gap-0 overflow-hidden border-stone-200 p-0',
          '[&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:bg-black/50 [&>button]:text-white',
          '[&>button]:opacity-90 [&>button]:ring-1 [&>button]:ring-white/30 [&>button]:hover:bg-black/70 [&>button]:hover:opacity-100',
        )}
      >
        <div className="relative shrink-0">
          <img
            src={NEWSLETTER_POPUP_IMAGE}
            alt="Volcano Drip latte and Primera Luz coffee bag on a café table"
            width={1024}
            height={571}
            className="aspect-[16/9] w-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/15 to-stone-900/25"
            aria-hidden
          />
          <div className="absolute bottom-3 left-4 right-12">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
              <Tag className="h-3.5 w-3.5" aria-hidden />
              20% off first order
            </div>
            <p className="text-lg font-black leading-tight tracking-tight text-white drop-shadow-sm">
              {message.headline}
            </p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 py-5 sm:px-6 sm:py-6">
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
                className={`h-12 bg-stone-50 ${errors.name ? 'border-red-500' : 'border-stone-200'}`}
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
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className={`h-12 bg-stone-50 ${errors.email ? 'border-red-500' : 'border-stone-200'}`}
              />
              {errors.email ? <p className="text-xs font-medium text-red-500">{errors.email}</p> : null}
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50 p-4 text-left">
              <input
                type="checkbox"
                id="popup-consent"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-stone-300"
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
