import { NEWSLETTER_SUBSCRIBE_URL } from '@/config/newsletter';

/** Same validation rules as /offers. */
export function validateNewsletterForm({ name, email, consent }) {
  const errors = {};
  if (!String(name || '').trim()) {
    errors.name = 'First name is required';
  }
  if (!String(email || '').trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    errors.email = 'Please enter a valid email address';
  }
  if (!consent) {
    errors.consent = 'You must agree to the terms to subscribe.';
  }
  return errors;
}

/**
 * POST to /api/subscribe — identical payload and handling for offers page and popup.
 * @param {{ name: string, email: string, consent: boolean, source?: string }} fields
 */
export async function submitNewsletterSignup({ name, email, consent, source = 'volcano-drip-offers' }) {
  const res = await fetch(NEWSLETTER_SUBSCRIBE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: String(email).trim(),
      name: String(name).trim(),
      consent,
      source,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data.error ||
      (res.status === 501
        ? 'Newsletter signup is not configured yet. Add server env vars in Vercel (see .env.example).'
        : 'There was a problem submitting your request.');
    throw new Error(message);
  }

  return data;
}

export const NEWSLETTER_CONSENT_LABEL =
  'By subscribing, you consent to receive promotional emails from Volcano Drip including offers, updates, and coffee news. You may withdraw your consent at any time by clicking the unsubscribe link in our emails.';
