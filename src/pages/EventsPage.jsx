import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, MapPin, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { upcomingAppearances } from '@/data/appearances';
import { eventGalleryImages, eventGalleryVideos } from '@/data/eventsMedia';
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery';

const supportPartners = [
  {
    id: 'bmo-walk-so-kids-can-talk',
    name: 'BMO Walk so Kids Can Talk',
    href: 'https://walksokidscantalk.ca',
    logo: 'https://walksokidscantalk.ca/walkfortalk/media/images/logo_KHP_new_EN.svg',
  },
];

const gallerySizePattern = ['portrait', 'wide', 'tall', 'square', 'landscape'];

const uniqueEventGalleryImages = Array.from(
  new Map(eventGalleryImages.map((item) => [item.url, item])).values(),
);

const galleryMediaItems = [
  ...eventGalleryVideos.map((item, index) => ({
    id: index + 1,
    type: 'video',
    title: item.title,
    desc: item.desc,
    url: item.url,
    size: item.size || gallerySizePattern[index % gallerySizePattern.length],
  })),
  ...uniqueEventGalleryImages.map((item, index) => ({
    id: eventGalleryVideos.length + index + 1,
    type: 'image',
    title: item.title,
    desc: item.desc,
    url: item.url,
    size: gallerySizePattern[index % gallerySizePattern.length],
  })),
];

const EventsPage = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timelineEvents = [...upcomingAppearances]
    .map((ev) => {
      const eventDate = ev.dateIso ? new Date(`${ev.dateIso}T00:00:00`) : null;
      const isPast = eventDate ? eventDate < today : false;
      return { ...ev, isPast, eventDate };
    })
    .sort((a, b) => {
      if (a.isPast !== b.isPast) return a.isPast ? 1 : -1;
      if (!a.eventDate || !b.eventDate) return 0;
      return a.eventDate - b.eventDate;
    });

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
            src="/events/images/event-10-truck-event-wide.png"
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
                Born of fire. Driven by purpose.
                <br />
                We support youth, communities, and those facing homelessness-along with women&apos;s shelters, Indigenous initiatives and reconciliation, and causes focused on mental health, food access, and sustainability.
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
                {timelineEvents.map((ev) => (
                  <li
                    key={ev.id}
                    className={`border-l-2 pl-4 ${ev.isPast ? 'border-stone-700 opacity-75' : ev.highlight ? 'border-amber-500' : 'border-stone-600'}`}
                  >
                    <span
                      className={`block text-xs font-bold uppercase tracking-wider ${
                        ev.isPast ? 'text-stone-500' : ev.highlight ? 'text-amber-400' : 'text-stone-300'
                      }`}
                    >
                      {ev.dateLabel}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <h3 className={`text-lg font-bold ${ev.isPast ? 'text-stone-300' : 'text-white'}`}>{ev.title}</h3>
                      {ev.isPast ? (
                        <span className="inline-flex items-center rounded-full border border-stone-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                          Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                          Upcoming
                        </span>
                      )}
                    </div>
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
                  <p className="text-2xl font-black tracking-tight text-stone-900 leading-tight">
                    We are a proud supporter and participant of the following events
                  </p>
                </div>
                {supportPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="mt-4 flex items-center justify-center rounded-xl border border-amber-200/80 bg-white/80 p-4"
                  >
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="h-12 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <InteractiveBentoGallery
              mediaItems={galleryMediaItems}
              title="Event gallery"
              description=""
            />
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
