import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQsPage = () => {
  const faqs = [
    {
      question: "What makes Volcano Drip coffee unique?",
      answer: "Volcano Drip coffee is sourced from volcanic regions where mineral-rich soil enhances the depth and complexity of every bean. Combined with our carefully controlled roasting process, this results in a bold, smooth, and unforgettable cup."
    },
    {
      question: "Where do your coffee beans come from?",
      answer: "We source our beans from select farms located in volcanic regions around the world, known for producing high-quality coffee with vibrant flavor profiles."
    },
    {
      question: "How fresh is your coffee?",
      answer: "Freshness is everything. All Volcano Drip coffee is roasted in small batches and shipped shortly after roasting to ensure you experience it at peak flavor."
    },
    {
      question: "Do you offer subscriptions?",
      answer: "Yes. Our subscription options let you receive fresh coffee on a regular schedule, so you never run out. Plus, subscribers get access to exclusive releases and special perks."
    },
    {
      question: "What's the best way to brew Volcano Drip coffee?",
      answer: "Our coffee is versatile and works well with various brewing methods including pour-over, French press, espresso, and drip. For the best experience, we recommend using freshly ground beans and filtered water."
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQs | Volcano Drip</title>
        <meta name="description" content="Frequently asked questions about Volcano Drip coffee, our sourcing, roasting, and brewing recommendations." />
      </Helmet>

      <div className="flex flex-col w-full overflow-hidden min-h-screen bg-stone-50">
        {/* Hero Section */}
        <section className="relative py-24 bg-stone-900 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2000&auto=format&fit=crop" 
              alt="Coffee beans background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                FREQUENTLY ASKED <span className="text-amber-500">QUESTIONS</span>
              </h1>
              <p className="text-xl text-stone-300 max-w-2xl mx-auto">
                Everything you need to know about our volcanic coffee, subscriptions, and more.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 md:p-12"
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-stone-200 px-2">
                    <AccordionTrigger className="text-left text-lg font-bold text-stone-900 hover:text-amber-600 transition-colors py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-stone-600 text-base leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-2">Still have questions?</h3>
              <p className="text-stone-600 mb-6">We're here to help you get the perfect cup.</p>
              <Link to="/contact" className="inline-flex items-center justify-center font-bold px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors">
                Contact Support
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQsPage;