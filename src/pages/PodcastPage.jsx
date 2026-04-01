import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Headphones, Play, ArrowLeft } from 'lucide-react';
import { PODCAST_EPISODES, PODCAST_LOGO_URL, PODCAST_NAME } from '@/config/podcast';
import PodcastAudioPlayer from '@/components/PodcastAudioPlayer';

const PodcastPage = () => {
  return (
    <>
      <Helmet>
        <title>{PODCAST_NAME} | Volcano Drip</title>
        <meta
          name="description"
          content="Listen to The Daily Grind Podcast—brewing tips and volcanic coffee stories from Volcano Drip."
        />
      </Helmet>

      <div className="min-h-screen bg-stone-50 font-sans">
        <section className="relative overflow-hidden border-b border-amber-900/20 bg-gradient-to-br from-[#1A0F0A] via-[#2c1810] to-[#1A0F0A] px-4 py-16 text-white md:py-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <motion.img
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              src={PODCAST_LOGO_URL}
              alt="Volcano Drip"
              className="mb-8 h-auto w-[min(280px,85vw)] object-contain drop-shadow-lg"
              width={280}
              height={120}
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300"
            >
              <Headphones className="h-3.5 w-3.5" aria-hidden />
              Podcast
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-playfair text-4xl font-bold tracking-tight md:text-5xl"
            >
              {PODCAST_NAME}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-4 max-w-2xl text-lg text-stone-300"
            >
              Short listens on brewing well and digging into what makes volcanic-grown coffee unique.
            </motion.p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <ul className="space-y-10">
            {PODCAST_EPISODES.map((ep, i) => (
              <motion.li
                key={ep.id}
                id={`episode-${ep.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-900 shadow-inner ring-1 ring-amber-200/80">
                    <Play className="h-7 w-7 fill-current" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Episode {i + 1}</p>
                    <h2 className="mt-2 font-playfair text-2xl font-bold text-stone-900 md:text-3xl">{ep.title}</h2>
                    <p className="mt-3 text-base leading-relaxed text-stone-600">{ep.description}</p>

                    {ep.audioSrc ? (
                      <PodcastAudioPlayer src={ep.audioSrc} label={ep.title} className="mt-6" />
                    ) : null}

                    {ep.listenUrl ? (
                      <a
                        href={ep.listenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-900 underline-offset-4 hover:text-amber-700 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                        Also listen elsewhere (opens in a new tab)
                      </a>
                    ) : null}

                    {!ep.audioSrc && !ep.listenUrl ? (
                      <p className="mt-6 text-sm text-stone-500">
                        Add your MP3 under <code className="rounded bg-stone-100 px-1">public/audio/</code> or set{' '}
                        <code className="rounded bg-stone-100 px-1">VITE_PODCAST_AUDIO_*</code> in{' '}
                        <code className="rounded bg-stone-100 px-1">.env</code>.
                      </p>
                    ) : null}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <p className="mt-12 text-center text-sm text-stone-500">
            Prefer a podcast app? Search for &quot;{PODCAST_NAME}&quot; or &quot;Volcano Drip&quot; where you get podcasts.
          </p>

          <div className="mt-10 flex justify-center border-t border-stone-200 pt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-900 underline-offset-4 hover:text-amber-700 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PodcastPage;
