
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Facebook, Instagram } from 'lucide-react';
import HomePage from '@/pages/HomePage';
import SuccessPage from '@/pages/SuccessPage';
import Navbar from '@/components/Navbar';
import CoffeeOriginPage from '@/pages/CoffeeOriginPage';
import AboutPage from '@/pages/AboutPage';
import SourcingPage from '@/pages/SourcingPage';
import BrewingGuidePage from '@/pages/BrewingGuidePage';
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

function MainLayout({ children }) {
  return <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-[#1A0F0A] text-stone-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white text-2xl font-bold mb-6 font-playfair">Volcano Drip</h4>
            <p className="max-w-md leading-relaxed mb-6">Forged in fire, brewed with passion. We bring you the earth's most intense coffee experiences, straight from the volcano to your cup.</p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61584978352184" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#2A150A] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white transition-all duration-300 shadow-lg" aria-label="Visit our Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/volcanodripcoffee" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#2A150A] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white transition-all duration-300 shadow-lg" aria-label="Visit our Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/shop" className="hover:text-[#FF8C00] transition-colors">Shop All</Link></li>
              <li><Link to="/subscription" className="hover:text-[#FF8C00] transition-colors">Subscriptions</Link></li>
              <li><Link to="/brewing" className="hover:text-[#FF8C00] transition-colors">Brewing Guides</Link></li>
              <li><Link to="/about" className="hover:text-[#FF8C00] transition-colors">Our Story</Link></li>
              <li><Link to="/signature-drinks" className="hover:text-[#FF8C00] transition-colors">Signature Drinks</Link></li>
              <li><Link to="/offers" className="hover:text-[#FF8C00] transition-colors">Exclusive Offers</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/contact" className="hover:text-[#FF8C00] transition-colors">Contact Us</Link></li>
              <li><Link to="/faqs" className="hover:text-[#FF8C00] transition-colors">FAQs</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#FF8C00] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-[#FF8C00] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cookies" className="hover:text-[#FF8C00] transition-colors">Cookies Policy</Link></li>
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
