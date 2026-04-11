import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Headphones, Mic } from 'lucide-react';
import { PODCAST_EPISODES, PODCAST_LOGO_URL, PODCAST_NAME } from '@/config/podcast';
import PodcastAudioPlayer from '@/components/PodcastAudioPlayer';

/**
 * Home-page strip for The Daily Grind Podcast — warm light background, aligned episode footers.
 */
export default function PodcastShowcaseSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-amber-200/80 bg-gradient-to-br from-stone-100 via-amber-50/90 to-orange-50/70 py-16 md:py-20"
      aria-labelledby="podcast-showcase-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-amber-200/60 blur-[90px]" />
        <div className="absolute -bottom-8 right-0 h-48 w-48 rounded-full bg-orange-200/50 blur-[70px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
              <div className="mx-auto shrink-0 sm:mx-0">
                <img
                  src={PODCAST_LOGO_URL}
                  alt="Volcano Drip"
                  width={160}
                  height={70}
                  className="h-14 w-auto max-w-[140px] object-contain object-left opacity-95 sm:h-16 sm:max-w-[160px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="min-w-0 flex-1 text-center sm:text-left">
                <span className="text-amber-600 font-bold tracking-widest text-xs uppercase mb-3 inline-flex items-center gap-2">
                  <Mic className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Listen in
                </span>
                <h2
                  id="podcast-showcase-heading"
                  className="mb-8 text-4xl md:text-6xl font-black text-stone-900 tracking-tighter uppercase leading-[0.9]"
                >
                  {PODCAST_NAME}
                </h2>
                <p className="max-w-2xl text-lg text-stone-600 leading-relaxed sm:max-w-none">
                  Tips, stories, and a closer look at volcanic-grown coffee—new episodes to sip along with your brew.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8 sm:inline-block">
                  <Link
                    to="/podcast"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-amber-900/15 transition hover:from-amber-500 hover:to-orange-500"
                  >
                    <Headphones className="h-4 w-4" aria-hidden />
                    Episodes &amp; details
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
              {PODCAST_EPISODES.map((ep, i) => (
                <motion.li
                  key={ep.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex h-full min-h-0 flex-col rounded-2xl border border-stone-200/90 bg-white/95 p-5 shadow-md ring-1 ring-stone-100 transition hover:border-amber-300/70 hover:shadow-lg"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Episode {i + 1}</p>
                  <h3 className="mt-2 text-xl font-bold leading-tight text-stone-900">
                    {ep.title}
                  </h3>
                  <div className="min-h-[4.5rem] flex-1">
                    <p className="mt-2 line-clamp-3 text-base leading-relaxed text-stone-600">{ep.description}</p>
                  </div>

                  <div className="mt-auto border-t border-stone-200/90 pt-4">
                    {ep.audioSrc ? (
                      <PodcastAudioPlayer
                        src={ep.audioSrc}
                        label={ep.title}
                        className="[&_audio]:bg-stone-50"
                      />
                    ) : null}
                    <Link
                      to={`/podcast#episode-${ep.id}`}
                      className="mt-3 inline-flex text-sm font-semibold text-amber-700 transition hover:text-amber-600"
                    >
                      Full episode page →
                    </Link>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
