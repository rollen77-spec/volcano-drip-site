import React from 'react';
import { Helmet } from 'react-helmet';
import { Cookie, Info, Shield, Settings } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import PageHero from '@/components/PageHero';

const CookiesPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800">
      <Helmet>
        <title>Cookies & Data Policy | Volcano Drip</title>
        <meta name="description" content="Cookies and Data Policy for Volcano Drip Coffee Company. Learn how we use cookies, collect data, and manage your preferences." />
      </Helmet>

      <PageHero
        size="compact"
        kicker="Legal"
        title={
          <>
            COOKIES &amp;
            <br />
            DATA POLICY.
          </>
        }
        imageSrc="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=2000"
        imageAlt=""
        overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/65"
      >
        <p className="mx-auto max-w-3xl text-lg text-stone-200 xl:text-xl">
          Transparency is a core value of our business. This policy explains what cookies are, how we use them across our
          platform, and the choices you have regarding your privacy and data.
        </p>
        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-stone-400">
          Last Updated: March 2026
        </p>
      </PageHero>

      <div className="mx-auto max-w-4xl space-y-12 px-4 pb-16 pt-12 md:pb-24 md:pt-16">
        <section className="bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-stone-200">
          <div className="flex items-center gap-5 mb-8 pb-6 border-b border-stone-100">
            <div className="p-3 bg-[#8B6F47]/10 rounded-xl">
              <Info className="w-8 h-8 text-[#8B6F47]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-stone-900 font-playfair mb-1">Detailed Breakdown</h2>
              <p className="text-stone-500 text-lg">Comprehensive overview of our data practices.</p>
            </div>
          </div>
          
          <Accordion 
            type="multiple" 
            defaultValue={["what-are-cookies-and-how-we-use-them", "data-collection-practices", "user-rights", "how-to-manage-preferences"]}
            className="w-full space-y-6"
          >
            
            <AccordionItem value="what-are-cookies-and-how-we-use-them" className="border border-stone-200 rounded-2xl px-6 overflow-hidden shadow-sm data-[state=open]:border-[#8B6F47]/50 transition-colors bg-stone-50/50">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-stone-900 hover:text-[#8B6F47] py-6 hover:no-underline flex gap-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-stone-100 hidden sm:block">
                    <Cookie className="w-6 h-6 text-[#8B6F47]" />
                  </div>
                  What cookies are and how we use them
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-8 leading-relaxed text-base md:text-lg border-t border-stone-100 pt-6 mt-2 space-y-4">
                <p>
                  Cookies are small text files containing unique identifiers that are transferred to your computer, smartphone, or tablet whenever you visit a website. These files are universally utilized across the internet to ensure websites operate securely, efficiently, and effectively for all visitors.
                </p>
                <p>
                  We strategically deploy cookies and similar tracking technologies to accomplish a variety of essential operational and analytical objectives. Our usage is carefully calibrated to enhance your user experience without compromising your security or digital privacy.
                </p>
                <p>
                  A significant portion of the cookies we deploy are strictly necessary for the fundamental operation of our digital storefront. Without these specific operational cookies, foundational features like maintaining items in your cart, facilitating a secure checkout environment, and authenticating user accounts would be technologically impossible.
                </p>
                <p>
                  We also leverage functionality cookies to remember the explicit choices you make while browsing. Whether you have selected a preferred geographical region, dismissed a promotional banner, or established customized display settings, these cookies prevent you from having to repeatedly input the same preferences during subsequent visits.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-collection-practices" className="border border-stone-200 rounded-2xl px-6 overflow-hidden shadow-sm data-[state=open]:border-[#8B6F47]/50 transition-colors bg-stone-50/50">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-stone-900 hover:text-[#8B6F47] py-6 hover:no-underline flex gap-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-stone-100 hidden sm:block">
                    <Info className="w-6 h-6 text-[#8B6F47]" />
                  </div>
                  Data collection practices
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-8 leading-relaxed text-base md:text-lg border-t border-stone-100 pt-6 mt-2 space-y-4">
                <p>
                  When you visit our site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages or products that you view.
                </p>
                <p>
                  We collect data through various methods to enhance your experience, including strictly necessary operations, performance analytics, and voluntary submissions through forms. When you make a purchase or attempt to make a purchase through the site, we collect certain information from you, including your name, billing address, shipping address, and payment information.
                </p>
                <p>
                  To continuously refine our services, we utilize performance-based data collection. These tools allow us to anonymously aggregate data regarding how visitors interact with our content. By understanding metrics such as page load times, popular navigation paths, and error rates, we can effectively diagnose technical issues.
                </p>
                <p>
                  We are committed to data minimization and only collect the personal data that is absolutely necessary for the specific purposes stated. We do not sell your personal data to third-party data brokers or marketing agencies.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-rights" className="border border-stone-200 rounded-2xl px-6 overflow-hidden shadow-sm data-[state=open]:border-[#8B6F47]/50 transition-colors bg-stone-50/50">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-stone-900 hover:text-[#8B6F47] py-6 hover:no-underline flex gap-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-stone-100 hidden sm:block">
                    <Shield className="w-6 h-6 text-[#8B6F47]" />
                  </div>
                  User rights
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-8 leading-relaxed text-base md:text-lg border-t border-stone-100 pt-6 mt-2 space-y-4">
                <p>
                  Your privacy is a fundamental right, and we are fiercely committed to upholding the highest standards of data protection. You maintain full sovereignty over your personal data and possess the explicit right to accept or reject non-essential cookies at any juncture of your browsing session.
                </p>
                <p>
                  In regards to any personally identifiable information we may collect through specialized forms or operational cookies (such as your name, email address, or comprehensive order history), you have the legally protected right to formally request full, transparent access to all the data we currently hold concerning your account.
                </p>
                <p>
                  Furthermore, if you discover that any of the data we retain is inaccurate, outdated, or incomplete, you possess the right to demand immediate correction. You also have the right to restrict certain types of data processing based on your personal comfort levels.
                </p>
                <p>
                  Crucially, you may invoke your "Right to be Forgotten" at any time. By submitting a formal request to our privacy team, you can compel us to permanently and irreversibly erase your personal footprint from our active servers and databases, provided there are no superseding legal or regulatory requirements obligating us to retain specific transaction records.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-to-manage-preferences" className="border border-stone-200 rounded-2xl px-6 overflow-hidden shadow-sm data-[state=open]:border-[#8B6F47]/50 transition-colors bg-stone-50/50">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-stone-900 hover:text-[#8B6F47] py-6 hover:no-underline flex gap-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-stone-100 hidden sm:block">
                    <Settings className="w-6 h-6 text-[#8B6F47]" />
                  </div>
                  How to manage preferences
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-8 leading-relaxed text-base md:text-lg border-t border-stone-100 pt-6 mt-2 space-y-4">
                <p>
                  You are equipped with multiple avenues to dictate how cookies are handled on your personal devices. The most comprehensive method involves configuring or amending the privacy and security settings directly within your chosen web browser to automatically accept, selectively prompt for, or universally refuse cookie placements.
                </p>
                <p>
                  If you elect to universally reject all cookies through your browser settings, please be acutely aware that while you may still navigate through our informational pages and product catalogs, highly essential website functionalities will be severely degraded or completely broken. Specifically, the shopping cart architecture and secure checkout pathways rely heavily on essential session cookies to function properly.
                </p>
                <p>
                  Because the specific procedures for managing, viewing, and clearing cookies vary significantly depending on which software you utilize—be it Google Chrome, Apple Safari, Mozilla Firefox, or Microsoft Edge—we strongly advise consulting the official help documentation or technical support menus provided by your browser's developer.
                </p>
                <p>
                  For a more exhaustive, independent, and universally applicable guide on managing your digital footprint and viewing precisely what cookies are currently active on your device, we highly recommend visiting <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#8B6F47] font-bold hover:underline">aboutcookies.org</a>. This resource offers step-by-step instructions for nearly all modern web browsing applications.
                </p>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </section>

      </div>
    </div>
  );
};

export default CookiesPolicyPage;