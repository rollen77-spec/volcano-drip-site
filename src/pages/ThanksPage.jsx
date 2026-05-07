import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/PageHero';

const ThanksPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-stone-50 font-sans">
      <Helmet>
        <title>Thank You! | Volcano Drip</title>
        <meta name="description" content="Thank you for subscribing to Volcano Drip exclusive offers." />
      </Helmet>

      <PageHero
        size="compact"
        kicker="Newsletter"
        title="Thank You."
        overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/60"
        imageSrc="https://images.unsplash.com/photo-1597949332421-25f2b66056de?w=1200&h=700&fit=crop"
        imageAlt=""
      />

      <div className="flex flex-1 flex-col items-center px-4 pb-20 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </motion.div>
          
          <h2 className="text-3xl font-black text-stone-900 mb-4 tracking-tight">You&apos;re in.</h2>
          
          <p className="text-stone-600 text-lg mb-8 leading-relaxed">
            You&apos;ve successfully subscribed to our exclusive offers. Keep an eye on your inbox for your 20% discount code and the latest coffee news.
          </p>

          <div className="flex flex-col gap-4">
            <Button asChild className="w-full h-14 text-lg font-bold rounded-full bg-stone-900 hover:bg-stone-800 shadow-xl shadow-stone-900/10 transition-all">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                See Our Coffee
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThanksPage;