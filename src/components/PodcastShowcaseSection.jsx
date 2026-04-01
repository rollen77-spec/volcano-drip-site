import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Headphones, Mic } from 'lucide-react';
import { PODCAST_EPISODES, PODCAST_LOGO_URL, PODCAST_NAME } from '@/config/podcast';
import PodcastAudioPlayer from '@/components/PodcastAudioPlayer';

/**
 * Home-page banner for The Daily Grind Podcast — maroon/amber palette to match footer & brand.
 */
export default function PodcastShowcaseSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-amber-800/25 bg-gradient-to-br from-[#1A0F0A] via-[#23120c] to-[#1A0F0A] py-16 md:py-20"
      aria-labelledby="podcast-showcase-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-amber-500 blur-[100px]" />
        <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-orange-600 blur-[80px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
              <Mic className="h-3 w-3" aria-hidden />
              Listen in
            </span>
            <img
              src={PODCAST_LOGO_URL}
              alt="Volcano Drip"
              width={220}
              height={96}
              className="mb-6 h-auto w-[min(220px,70vw)] object-contain drop-shadow-md"
              loading="lazy"
              decoding="async"
            />
            <h2
              id="podcast-showcase-heading"
              className="font-playfair text-3xl font-bold leading-tight text-white md:text-4xl"
            >
              {PODCAST_NAME}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-400">
              Tips, stories, and a closer look at volcanic-grown coffee—new episodes to sip along with your brew.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8">
              <Link
                to="/podcast"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-900/40 transition hover:from-amber-500 hover:to-orange-500"
              >
                <Headphones className="h-4 w-4" aria-hidden />
                Episodes &amp; details
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {PODCAST_EPISODES.map((ep, i) => (
                <motion.li
                  key={ep.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl border border-stone-700/80 bg-[#2a1810]/90 p-5 shadow-lg backdrop-blur-sm transition hover:border-amber-700/50 hover:bg-[#321f14]/95"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600/90">Episode {i + 1}</p>
                  <h3 className="mt-2 font-playfair text-lg font-bold leading-snug text-white md:text-xl">
                    {ep.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-stone-400">{ep.description}</p>
                  {ep.audioSrc ? (
                    <PodcastAudioPlayer src={ep.audioSrc} label={ep.title} className="mt-4" />
                  ) : null}
                  <Link
                    to={`/podcast#episode-${ep.id}`}
                    className="mt-3 inline-flex text-xs font-bold uppercase tracking-wide text-amber-500 transition group-hover:text-amber-400"
                  >
                    Full episode page →
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
