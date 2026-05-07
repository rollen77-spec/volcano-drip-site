import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Flame, Mountain, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroImage from '@/components/HeroImage';
import PageHero from '@/components/PageHero';

const AboutPage = () => {
  return <>
      <Helmet>
        <title>About Us | Volcano Drip</title>
        <meta name="description" content="Discover how Volcano Drip was born from a passion for volcanic soil coffee and sustainable sourcing." />
      </Helmet>

      <div className="flex flex-col w-full overflow-hidden">
        <PageHero
          size="about"
          kicker="Our Story"
          title={<>BORN FROM <br />THE FIRE.</>}
          imageWrapperClassName="absolute inset-0 z-0"
          background={<HeroImage alt="Volcanic landscape" src="https://images.unsplash.com/photo-1551197933-8fdac28d53f6" />}
        >
          <p className="text-xl text-stone-200 max-w-3xl mx-auto leading-relaxed">
            We don't just roast coffee. We harness the raw, explosive power of nature to bring you a cup that defies the ordinary. Volcano Drip began with a shared passion for great coffee and the belief that the best cups bring people together.
          </p>
        </PageHero>

        {/* Video Section */}
        <section className="py-16 bg-stone-950 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-8 text-amber-500">Our Story in Motion</h2>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-black">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/_9IEJytr05g" 
                  title="Our Story in Motion"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-20 bg-stone-900 text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="space-y-8 text-center">
                <h2 className="text-4xl font-bold tracking-tight">Our Beginnings</h2>
                <div className="space-y-6 text-stone-400 text-lg leading-relaxed text-left md:text-center">
                  <p>Through our various travels in the mountainous regions of South America, two brothers and a lifelong friend stumbled upon something unforgettable-a simple cup of coffee grown on the rich slopes of a dormant volcano. Its depth, smoothness, and bold character came from the mineral-rich volcanic soil, and in that moment they knew the world deserved to taste coffee like this.</p>
                  <p>That experience sparked the creation of Volcano Drip.</p>
                  <p>By partnering with farmers who grow coffee in volcanic regions around the world, we bring coffee shaped by fire and nurtured with care to coffee lovers everywhere. Because the best cup of coffee begins in volcanic soil-but it’s perfected through passion, respect for the land, and the power of friendship.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="lg:w-1/2 relative group">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000" alt="Coffee roasting process" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-amber-100 rounded-full blur-2xl" />
                <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-stone-100 rounded-full blur-2xl" />
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="lg:w-1/2">
                <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-4 block">The Process</span>
                <h2 className="text-4xl font-black text-stone-900 mb-8 tracking-tight">CRAFTED IN <br />THE HEAT.</h2>
                <p className="text-stone-600 text-lg leading-relaxed mb-8">
                  Our roasting process is as precise as the geology that formed our beans. We use small-batch Loring roasters to maintain absolute control over the heat profile, ensuring that every nuance of the volcanic origin is preserved.
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="bg-stone-100 p-3 rounded-xl h-fit">
                      <Flame className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">Precision Roasting</h4>
                      <p className="text-stone-500">Every bean has a unique heat curve that unlocks its hidden flavors.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-stone-100 p-3 rounded-xl h-fit">
                      <Zap className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">Freshness Guaranteed</h4>
                      <p className="text-stone-500">We roast on Mondays and Wednesdays, shipping within 24 hours.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-24 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-stone-900 mb-4 tracking-tight">Our Core Principles</h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="text-center">
                <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Flame className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pure Intent</h3>
                <p className="text-stone-600 leading-relaxed">No fillers, no blends, no compromises. Just high-grade single-origin volcanic coffee.</p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.1
            }} className="text-center">
                <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mountain className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Origin First</h3>
                <p className="text-stone-600 leading-relaxed">We respect the land and the unique environment that volcanic soil provides to our crops.</p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.2
            }} className="text-center">
                <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Farmer Focused</h3>
                <p className="text-stone-600 leading-relaxed">Direct trade means more money goes back to the hands that harvest the beans.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 container mx-auto px-4">
          <div className="bg-amber-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-900/20 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">JOIN OUR MISSION.</h2>
              <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto font-medium">
                Experience the difference that volcanic soil makes. Join our subscription and get great coffee delivered to your door each month.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-full px-10 h-14 text-lg shadow-xl shadow-stone-900/20">
                  <Link to="/store">Explore the Shop</Link>
                </Button>
                <Button asChild className="bg-white text-stone-900 hover:bg-stone-100 font-bold rounded-full px-10 h-14 text-lg shadow-xl shadow-white/10">
                  <Link to="/subscription">Subscription Club</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default AboutPage;