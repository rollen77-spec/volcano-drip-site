import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, MapPin, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { upcomingAppearances } from '@/data/appearances';
import { aboutEventGallery } from '@/data/aboutEventGallery';

const supportPartners = [
  {
    id: 'bmo-walk-so-kids-can-talk',
    name: 'BMO Walk so Kids Can Talk',
    href: 'https://walksokidscantalk.ca',
    logo: 'https://walksokidscantalk.ca/walkfortalk/media/images/logo_KHP_new_EN.svg',
  },
];

const videoCards = [
  {
    id: 'events-story-motion',
    title: 'Volcano Drip Story Reel',
    embedUrl: 'https://www.youtube-nocookie.com/embed/_9IEJytr05g',
  },
  {
    id: 'events-roast-story',
    title: 'Volcanic Soil Feature',
    embedUrl: 'https://www.youtube-nocookie.com/embed/hy__cSOlahE',
  },
];

const bentoSpans = [
  'md:col-span-8 md:row-span-2',
  'md:col-span-4 md:row-span-1',
  'md:col-span-4 md:row-span-1',
  'md:col-span-4 md:row-span-2',
  'md:col-span-8 md:row-span-1',
  'md:col-span-4 md:row-span-1',
  'md:col-span-4 md:row-span-1',
  'md:col-span-8 md:row-span-2',
];

const EventsPage = () => {
  return (
    <>
      <Helmet>
        <title>Events | Volcano Drip</title>
        <meta
          name="description"
          content="See upcoming Volcano Drip events, community partnerships, and a bento gallery of event photos and videos."
        />
      </Helmet>

      <div className="min-h-screen bg-stone-50">
        <header className="relative h-[60vh] min-h-[24rem] overflow-hidden bg-stone-900">
          <img
            src="/about/gallery/event-10-truck-event-wide.png"
            alt="Volcano Drip event setup outdoors"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl"
            >
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
                Events
              </span>
              <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
                Where Volcano Drip
                <br />
                comes to life.
              </h1>
              <p className="text-base leading-relaxed text-stone-100 md:text-lg">
                Coffee is meant to be shared-and so are the moments around it.
                From community gatherings to corporate events, Volcano Drip shows up with bold
                flavour and even bolder energy. Explore the experiences, people, and stories
                brewed at every event we&apos;re part of.
              </p>
            </motion.div>
          </div>
        </header>

        <section className="border-b border-stone-200 bg-white py-14">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-stone-200 bg-stone-900 p-8 text-white"
            >
              <div className="mb-6 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-amber-400" aria-hidden />
                <h2 className="text-2xl font-bold">Events we are attending</h2>
              </div>
              <ul className="space-y-6">
                {upcomingAppearances.map((ev) => (
                  <li
                    key={ev.id}
                    className={`border-l-2 pl-4 ${ev.highlight ? 'border-amber-500' : 'border-stone-700'}`}
                  >
                    <span
                      className={`block text-xs font-bold uppercase tracking-wider ${
                        ev.highlight ? 'text-amber-400' : 'text-stone-400'
                      }`}
                    >
                      {ev.dateLabel}
                    </span>
                    <h3 className="mt-1 text-lg font-bold">{ev.title}</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-stone-300">
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                      <span>{ev.location}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="space-y-5"
            >
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="mb-3 flex items-center gap-2 text-amber-700">
                  <HeartHandshake className="h-5 w-5" aria-hidden />
                  <p className="text-sm font-bold uppercase tracking-[0.18em]">Community support</p>
                </div>
                <h3 className="text-2xl font-black tracking-tight text-stone-900">
                  Proud Support of the BMO walk so kids can talk
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">
                  We are proud to support initiatives focused on youth wellbeing, starting with
                  BMO Walk so Kids Can Talk. More community partners will be added over time.
                </p>
              </div>

              {supportPartners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 hover:border-amber-400 hover:shadow-md"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-12 w-auto object-contain"
                    loading="lazy"
                  />
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-stone-700 group-hover:text-amber-700">
                    Learn more
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <h2 className="text-3xl font-black tracking-tight text-stone-900 md:text-4xl">
                Event gallery
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-stone-600 leading-relaxed">
                A bento-style showcase of event photos and videos from markets, pop-ups, and
                community activations.
              </p>
            </motion.div>

            <div className="grid auto-rows-[180px] grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-[140px]">
              {videoCards.map((video, idx) => (
                <motion.article
                  key={video.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={`overflow-hidden rounded-2xl border border-stone-200 bg-black shadow-sm ${
                    idx === 0 ? 'md:col-span-8 md:row-span-3' : 'md:col-span-4 md:row-span-2'
                  }`}
                >
                  <div className="relative h-full w-full">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={video.embedUrl}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </motion.article>
              ))}

              {aboutEventGallery.map((item, index) => (
                <motion.figure
                  key={item.src}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.2) }}
                  className={`group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm ${
                    bentoSpans[index % bentoSpans.length]
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    width={1200}
                    height={900}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item.alt}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="text-stone-600">
              Want Volcano Drip at your next event?{' '}
              <Link to="/contact" className="font-semibold text-amber-700 hover:text-amber-800">
                Contact us
              </Link>{' '}
              and we&apos;ll connect.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default EventsPage;
