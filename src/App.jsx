
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Facebook, Instagram } from 'lucide-react';
import { getSiteUrl } from '@/config/site';
import HomePage from '@/pages/HomePage';
import SuccessPage from '@/pages/SuccessPage';
import Navbar from '@/components/Navbar';
import CoffeeOriginPage from '@/pages/CoffeeOriginPage';
import AboutPage from '@/pages/AboutPage';
import SourcingPage from '@/pages/SourcingPage';
import BrewingGuidePage from '@/pages/BrewingGuidePage';
import RoastingOptionsPage from '@/pages/RoastingOptionsPage';
import GrindOptionsPage from '@/pages/GrindOptionsPage';
import ContactPage from '@/pages/ContactPage';
import SubscriptionPage from '@/pages/SubscriptionPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsAndConditionsPage from '@/pages/TermsAndConditionsPage';
import OffersPage from '@/pages/OffersPage';
import CookiesPolicyPage from '@/pages/CookiesPolicyPage';
import SignatureDrinksPage from '@/pages/SignatureDrinksPage';
import FAQsPage from '@/pages/FAQsPage';
import ScrollToTop from '@/components/ScrollToTop';
import ThanksPage from '@/pages/ThanksPage';
import ShopPage from '@/pages/ShopPage';
import PodcastPage from '@/pages/PodcastPage';

const ORG_LOGO_URL =
  'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/primary-logo-copy-wWYt4.png';

function MainLayout({ children }) {
  const siteUrl = getSiteUrl();
  const organizationLd =
    siteUrl &&
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Volcano Drip',
      alternateName: 'Volcano Drip Coffee Co.',
      url: siteUrl,
      logo: ORG_LOGO_URL,
      description:
        'Small-batch single-origin coffee from volcanic soil regions.',
      sameAs: [
        'https://www.facebook.com/profile.php?id=61584978352184',
        'https://www.instagram.com/volcanodripcoffee',
      ],
    });

  return <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {organizationLd ? (
        <Helmet>
          <script type="application/ld+json">{organizationLd}</script>
        </Helmet>
      ) : null}
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-[#1A0F0A] text-stone-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <h4 className="text-white text-2xl font-bold mb-4 font-playfair">Volcano Drip</h4>
            <p className="max-w-md leading-relaxed mb-3">Forged in fire, brewed with passion. We bring you the earth's most intense coffee experiences, straight from the volcano to your cup.</p>
            <p className="text-stone-500 text-sm mb-6">Small-batch roasted in Canada.</p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61584978352184" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#2A150A] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white transition-all duration-300 shadow-lg" aria-label="Visit our Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/volcanodripcoffee" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#2A150A] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white transition-all duration-300 shadow-lg" aria-label="Visit our Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/shop" className="hover:text-[#FF8C00] transition-colors">Shop all</Link></li>
              <li><Link to="/subscription" className="hover:text-[#FF8C00] transition-colors">Subscriptions</Link></li>
              <li><Link to="/brewing" className="hover:text-[#FF8C00] transition-colors">Brewing guides</Link></li>
              <li><Link to="/brewing/roasting-options" className="hover:text-[#FF8C00] transition-colors">Roasting options</Link></li>
              <li><Link to="/brewing/grind-options" className="hover:text-[#FF8C00] transition-colors">Grind options</Link></li>
              <li><Link to="/podcast" className="hover:text-[#FF8C00] transition-colors">Podcast</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-[#FF8C00] transition-colors">Our story</Link></li>
              <li><Link to="/sourcing" className="hover:text-[#FF8C00] transition-colors">Sourcing</Link></li>
              <li><Link to="/signature-drinks" className="hover:text-[#FF8C00] transition-colors">Signature drinks</Link></li>
              <li><Link to="/offers" className="hover:text-[#FF8C00] transition-colors">Exclusive offers</Link></li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/contact" className="hover:text-[#FF8C00] transition-colors">Contact</Link></li>
              <li><Link to="/faqs" className="hover:text-[#FF8C00] transition-colors">FAQs</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#FF8C00] transition-colors">Privacy policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-[#FF8C00] transition-colors">Terms &amp; conditions</Link></li>
              <li><Link to="/cookies" className="hover:text-[#FF8C00] transition-colors">Cookies policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#2A150A] text-sm flex flex-col md:flex-row justify-between items-center">
          <span>&copy; 2026 Volcano Drip Coffee Co. All rights reserved.</span>
          <span className="mt-2 md:mt-0 flex flex-wrap justify-center gap-4">
            <Link to="/terms-and-conditions" className="hover:text-[#FF8C00] transition-colors">Terms</Link>
            <span className="text-[#2A150A] hidden sm:inline">|</span>
            <Link to="/privacy-policy" className="hover:text-[#FF8C00] transition-colors">Privacy</Link>
            <span className="text-[#2A150A] hidden sm:inline">|</span>
            <Link to="/cookies" className="hover:text-[#FF8C00] transition-colors">Cookies</Link>
            <span className="text-[#2A150A] hidden sm:inline">|</span>
            <span>Designed with fire.</span>
          </span>
        </div>
      </footer>
    </div>;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/origins/costa-rica" element={<CoffeeOriginPage originKey="costa-rica" />} />
          <Route path="/origins/guatemala" element={<CoffeeOriginPage originKey="guatemala" />} />
          <Route path="/origins/indonesia" element={<CoffeeOriginPage originKey="indonesia" />} />
          <Route path="/origins/peru" element={<CoffeeOriginPage originKey="peru" />} />
          <Route path="/origins/honduras" element={<CoffeeOriginPage originKey="honduras" />} />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sourcing" element={<SourcingPage />} />
          <Route path="/brewing" element={<BrewingGuidePage />} />
          <Route path="/brewing/roasting-options" element={<RoastingOptionsPage />} />
          <Route path="/brewing/grind-options" element={<GrindOptionsPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/signature-drinks" element={<SignatureDrinksPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/cookies" element={<CookiesPolicyPage />} />
          <Route path="/thanks" element={<ThanksPage />} />

          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </MainLayout>
      <Toaster />
    </Router>
  );
}

export default App;
