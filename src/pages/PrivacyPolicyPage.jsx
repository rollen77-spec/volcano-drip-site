import React from 'react';
import { Helmet } from 'react-helmet';
import { ShieldCheck, Lock } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 md:py-24">
      <Helmet>
        <title>Privacy Policy | Volcano Drip</title>
        <meta name="description" content="Privacy Policy for Volcano Drip Coffee Company. Learn how we collect, use, and protect your information." />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-amber-100 rounded-full mb-6 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto mb-2">
            At Volcano Drip Coffee Company, we are committed to protecting your privacy and ensuring you have a positive experience on our website.
          </p>
          <p className="text-stone-400 text-sm font-medium uppercase tracking-widest">Last Updated: Jan 3, 2026</p>
        </div>

        {/* Accordion Section */}
        <section className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
            <Lock className="w-8 h-8 text-amber-600" />
            <div>
              <h2 className="text-3xl font-bold text-stone-900">Your Data & Privacy</h2>
              <p className="text-stone-500 text-sm mt-1">Detailed breakdown of our privacy practices.</p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            
            <AccordionItem value="information-we-collect" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">
                Information We Collect
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                <p className="mb-4">We may collect the following types of information when you interact with our website or make a purchase:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Identification Information:</strong> Name, email address, shipping address, billing address, and phone number.</li>
                  <li><strong>Payment Information:</strong> Credit card details, billing address, and transaction history (processed securely via our payment gateways).</li>
                  <li><strong>Account Information:</strong> Username, password, and order history if you create an account with us.</li>
                  <li><strong>Usage Data:</strong> Information about how you navigate our site, including IP addresses, browser types, and referring URLs.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-we-use" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">
                How We Use Your Information
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                <p className="mb-4">We use the information we collect for various business purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processing and fulfilling your coffee orders, subscriptions, and gift purchases.</li>
                  <li>Communicating with you regarding your orders, shipping updates, and customer support inquiries.</li>
                  <li>Improving our website functionality, user experience, and product offerings.</li>
                  <li>Detecting and preventing fraudulent transactions and ensuring the security of our platform.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="marketing-communications" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">
                Marketing Communications
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                <p>
                  With your explicit consent, we may send you promotional materials, newsletters, and special offers related to Volcano Drip Coffee. 
                  You have the right to opt-out of these marketing communications at any time by clicking the "unsubscribe" link provided in our emails, 
                  or by managing your preferences in your account settings.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-sharing" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">
                Data Sharing
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                <p className="mb-4">Volcano Drip does not sell or rent your personal information to third parties. We may share your information with trusted service providers only to the extent necessary to operate our business:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Payment Processors:</strong> To securely handle payment transactions.</li>
                  <li><strong>Shipping Partners:</strong> To deliver your orders to the correct address.</li>
                  <li><strong>Marketing Platforms:</strong> To manage our email communications.</li>
                  <li><strong>Legal Compliance:</strong> If required by law, subpoena, or other legal processes.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-protection" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">
                Data Protection
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                <p>
                  We implement industry-standard security measures, including SSL encryption, to protect your personal and payment information during transmission. 
                  While we strive to use commercially acceptable means to protect your personal data, no method of transmission over the Internet or electronic storage is 100% secure, 
                  and we cannot guarantee absolute security.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="your-rights" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">
                Your Rights
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                <p className="mb-4">Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The right to review, update, or delete the personal information associated with your account.</li>
                  <li>The right to opt-out of data collection for specific marketing purposes.</li>
                  <li>The right to request a copy of the personal data we hold about you.</li>
                  <li>The right to restrict the processing of your data under certain circumstances.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes-to-policy" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">
                Changes to This Policy
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices, technologies, or legal requirements. 
                  We will notify you of any significant updates by posting the revised policy on this page with an updated "Last Updated" date. 
                  We encourage you to review this policy periodically to stay informed about how we are protecting your information.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">
                Contact
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                <div className="bg-stone-50 p-6 rounded-md border border-stone-200 text-stone-800 shadow-inner">
                  <p className="font-bold mb-2 text-amber-700">Volcano Drip Coffee Company</p>
                  <p>Email: <a href="mailto:hello@volcanodrip.com" className="hover:text-amber-600 hover:underline">hello@volcanodrip.com</a></p>
                  <p>Phone: 1-800-VOLCANO</p>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;