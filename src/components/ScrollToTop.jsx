import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If no hash, simple scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useEffect(() => {
    // If hash exists, try to scroll to it
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Retry for dynamic content that might render a bit later
        const timer = setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [hash, pathname]); // Re-run when pathname changes (navigation) or hash changes

  return null;
};

export default ScrollToTop;