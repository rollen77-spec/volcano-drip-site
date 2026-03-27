import { useEffect } from 'react';

/**
 * Brevo Marketing platform / Conversations tracker (public client_key only).
 * Set VITE_BREVO_CLIENT_KEY in .env and Vercel. Omits loading if unset.
 * @see https://help.brevo.com/hc/en-us (Marketing: install tracking)
 */
export default function BrevoTracker() {
  useEffect(() => {
    const clientKey = import.meta.env.VITE_BREVO_CLIENT_KEY;
    if (!clientKey || typeof document === 'undefined') return;
    if (document.querySelector('script[data-brevo-sdk-loader]')) return;

    window.Brevo = window.Brevo || [];
    window.Brevo.push(['init', { client_key: clientKey }]);

    const script = document.createElement('script');
    script.src = 'https://cdn.brevo.com/js/sdk-loader.js';
    script.async = true;
    script.dataset.brevoSdkLoader = '1';
    document.head.appendChild(script);
  }, []);

  return null;
}
