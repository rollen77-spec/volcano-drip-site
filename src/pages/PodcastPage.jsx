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
        {/* Match home podcast strip + Subscription hero scale / sans typography */}
        <section className="relative overflow-hidden border-b border-amber-200/80 bg-gradient-to-br from-stone-100 via-amber-50/90 to-orange-50/70 px-4 py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
            <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-amber-200/60 blur-[90px]" />
            <div className="absolute -bottom-8 right-0 h-48 w-48 rounded-full bg-orange-200/50 blur-[70px]" />
          </div>

          <div className="relative z-10 mx-auto mt-6 flex max-w-4xl flex-col items-center px-4 text-center">
            <motion.img
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              src={PODCAST_LOGO_URL}
              alt="Volcano Drip"
              className="mb-8 h-16 w-auto max-w-[180px] object-contain opacity-95 sm:h-[4.5rem] sm:max-w-[200px]"
              width={200}
              height={88}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-800 backdrop-blur-md"
            >
              <Headphones className="h-3.5 w-3.5" aria-hidden />
              Podcast
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-6xl font-bold tracking-tighter text-stone-900 md:text-8xl"
            >
              {PODCAST_NAME.replace(/ Podcast$/, '')}{' '}
              <span className="text-amber-500">Podcast</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-2xl text-xl leading-relaxed text-stone-600"
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
                    <h2 className="mt-2 text-2xl font-bold text-stone-900 md:text-3xl">{ep.title}</h2>
                    <p className="mt-3 text-base leading-relaxed text-stone-600 md:text-lg">{ep.description}</p>

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
