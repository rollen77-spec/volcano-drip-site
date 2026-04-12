import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GA_MEASUREMENT_ID } from '@/config/analytics';

/**
 * Sends a GA4 page_view on client-side route changes. The first paint is
 * already counted by `gtag('config', …)` in index.html, so the first effect
 * run is skipped to avoid double-counting the landing URL.
 */
const GoogleAnalyticsRouteListener = () => {
  const location = useLocation();
  const skipInitial = useRef(true);

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;

    if (skipInitial.current) {
      skipInitial.current = false;
      return;
    }

    if (typeof window.gtag !== 'function') return;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default GoogleAnalyticsRouteListener;
