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
import { getPopupMessage } from '@/config/newsletterPopup';
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
          <p className="text-sm text-stone-600">Enter your details below to unlock your discount.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4" noValidate>
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
              <Label htmlFor="popup-consent" className="block cursor-pointer text-xs font-medium leading-relaxed text-stone-600">
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
      </DialogContent>
    </Dialog>
  );
}
