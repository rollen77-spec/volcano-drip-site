import React from 'react';
import { Helmet } from 'react-helmet';
import { Scale, FileText, RefreshCcw, Truck, XCircle } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 md:py-24">
      <Helmet>
        <title>Terms and Conditions | Volcano Drip</title>
        <meta name="description" content="Terms and Conditions, Shipping, Return, and Cancellation policies for Volcano Drip Coffee Company." />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-amber-100 rounded-full mb-6 shadow-sm">
            <Scale className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tight mb-6">Terms & Policies</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about purchasing, shipping, and returning products from Volcano Drip Coffee Company.
          </p>
        </div>

        {/* General Terms and Conditions */}
        <section className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
            <FileText className="w-8 h-8 text-amber-600" />
            <div>
              <h2 className="text-3xl font-bold text-stone-900">General Terms and Conditions</h2>
              <p className="text-stone-500 text-sm mt-1">Last Updated: January 4, 2026</p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="use-of-website" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Use of the Website</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                By agreeing to these Terms, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction. You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="product-information" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Product Information</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                We strive to ensure that all details, descriptions, and prices of products appearing on the website are accurate. However, errors may occur. If we discover an error in the price or description of any goods which you have ordered, we will inform you of this as soon as possible and give you the option of reconfirming your order or cancelling it.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="orders" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Orders</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pricing" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Pricing</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="intellectual-property" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Intellectual Property</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Volcano Drip or its content suppliers and protected by international copyright laws. The compilation of all content on this site is the exclusive property of Volcano Drip.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="limitation-of-liability" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Limitation of Liability</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                In no case shall Volcano Drip, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes-to-terms" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Changes to Terms</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                You can review the most current version of the Terms and Conditions at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms and Conditions by posting updates and changes to our website.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Contact</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                Questions about our Terms and Conditions should be sent to us at hello@volcanodrip.com or by calling 1-800-VOLCANO.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Return and Refund Policy */}
        <section className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
            <RefreshCcw className="w-8 h-8 text-amber-600" />
            <div>
              <h2 className="text-3xl font-bold text-stone-900">Return and Refund Policy</h2>
              <p className="text-stone-500 text-sm mt-1">Last Updated: January 14, 2026</p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="returns" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Returns</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                Because coffee is a perishable product, we cannot accept returns on roasted coffee beans. For non-coffee items (mugs, brewing gear, apparel), items may be returned within 30 days of purchase, provided the item is unused, in its original packaging, and in the same condition that you received it.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refunds" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Refunds</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                We are fiercely committed to your satisfaction. If there is an error with your order, or if your coffee arrives damaged or compromised, please contact us within 7 days of receiving your order, and we will make it right through a replacement or refund. Once your non-coffee return is received and inspected, we will send you an email to notify you of the approval or rejection of your refund.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="exchanges" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Exchanges</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                We only replace items if they are defective or damaged upon arrival. If you need to exchange it for the same item, send us an email at returns@volcanodrip.com and we will provide instructions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Shipping Policy */}
        <section className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
            <Truck className="w-8 h-8 text-amber-600" />
            <div>
              <h2 className="text-3xl font-bold text-stone-900">Shipping Policy</h2>
              <p className="text-stone-500 text-sm mt-1">Last Updated: November 4, 2025</p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="order-processing" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Order Processing</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                All coffee orders are processed and roasted within 1-2 business days to ensure peak freshness. Orders placed on weekends or holidays will be processed on the following business day. We roast to order to guarantee you get the freshest coffee possible.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping-times" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Shipping Times</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                Standard Domestic: 3-7 business days.<br/>
                Expedited Domestic: 1-3 business days.<br/>
                International: 7-21 business days (customs clearance may cause additional delays).<br/>
                Please note that shipping times are estimates and not guarantees. Unforeseen weather events or carrier delays may affect delivery times.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping-confirmation" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Shipping Confirmation</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                You will receive a shipment confirmation email containing your tracking number(s) once your order has shipped. The tracking number will be active within 24 hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping-issues" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Shipping Issues</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                Volcano Drip is not liable for any products damaged or lost during shipping. However, we value our customers. If you received your order damaged, please contact us with photos so we can assist you with a carrier claim or potential replacement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="incorrect-address" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Incorrect Address</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                We are not responsible for orders shipped to incorrect or invalid addresses provided by the customer. If an order is returned to us due to an incorrect address, the customer will be responsible for the cost of re-shipping.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Cancellation Policy */}
        <section className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
            <XCircle className="w-8 h-8 text-amber-600" />
            <div>
              <h2 className="text-3xl font-bold text-stone-900">Cancellation Policy</h2>
              <p className="text-stone-500 text-sm mt-1">Last Updated: January 4, 2026</p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="standard-orders" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Standard Orders</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                Because we strive to process and roast orders as quickly as possible, cancellations must be requested within 12 hours of placing the order. Once an order has entered the roasting or fulfillment process, it cannot be canceled.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pre-orders" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Pre-Orders</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                Pre-orders for limited release roasts can be cancelled up to 48 hours before the scheduled roasting date. After this window, the standard cancellation policy applies.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="subscriptions" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Subscriptions</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                Subscription orders must be modified or canceled before the next scheduled billing date through your account portal. Once a subscription renewal has been billed and entered the fulfillment queue, it cannot be cancelled for that cycle.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refunds-cancelled" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Refunds for Cancelled Orders</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                If your cancellation request is approved before the order is processed, a full refund will be issued to your original method of payment. Please allow 3-5 business days for the funds to appear in your account.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-to-cancel" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">How to Cancel</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                To request an order cancellation, please reply to your order confirmation email immediately, or contact our support team at support@volcanodrip.com with your order number in the subject line.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="policy-updates" className="border border-stone-200 rounded-lg px-4 overflow-hidden shadow-sm data-[state=open]:border-amber-500 transition-colors">
              <AccordionTrigger className="text-lg font-bold text-stone-900 hover:text-amber-600 py-4 hover:no-underline">Policy Updates</AccordionTrigger>
              <AccordionContent className="text-stone-600 pb-4 leading-relaxed">
                We may update our Terms, Returns, Shipping, and Cancellation policies from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. The date of the most recent update will always be noted at the top of each section.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

      </div>
    </div>
  );
};

export default TermsAndConditionsPage;