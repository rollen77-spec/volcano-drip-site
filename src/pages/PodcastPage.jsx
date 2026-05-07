import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Play, ArrowLeft } from 'lucide-react';
import { PODCAST_EPISODES, PODCAST_LOGO_URL, PODCAST_NAME } from '@/config/podcast';
import PodcastAudioPlayer from '@/components/PodcastAudioPlayer';
import PageHero from '@/components/PageHero';

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
        <PageHero
          leading={
            <img
              src={PODCAST_LOGO_URL}
              alt=""
              width={200}
              height={88}
              className="h-16 w-auto max-w-[180px] object-contain opacity-95 sm:h-[4.5rem] sm:max-w-[200px]"
            />
          }
          kicker="Podcast"
          title={
            <>
              THE DAILY GRIND
              <br />
              PODCAST.
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=2000"
          imageAlt=""
          overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/60"
          size="custom"
          sectionClassName="py-16 md:py-24"
          titleClassName="text-6xl md:text-8xl"
        >
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-stone-200">
            Short listens on brewing well and digging into what makes volcanic-grown coffee unique.
          </p>
        </PageHero>

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
