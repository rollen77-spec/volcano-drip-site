import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { upcomingAppearances } from '@/data/appearances';
import { eventGalleryImages, eventGalleryVideos, VIDEO_TILE_POSTERS } from '@/data/eventsMedia';
import { arrangeGalleryMedia, buildGalleryMediaItems } from '@/lib/eventGalleryLayout';
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery';
import PageHero from '@/components/PageHero';

const supportPartners = [
  {
    id: 'bmo-walk-so-kids-can-talk',
    name: 'BMO Walk so Kids Can Talk',
    href: 'https://walksokidscantalk.ca',
    logo: '/events/images/bmo-walk-so-kids-badge.png',
  },
];

const uniqueEventGalleryImages = Array.from(
  new Map(eventGalleryImages.map((item) => [item.url, item])).values(),
);

const galleryMediaItems = arrangeGalleryMedia(
  buildGalleryMediaItems(uniqueEventGalleryImages, eventGalleryVideos, VIDEO_TILE_POSTERS),
);

function EventCard({ event, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className={`flex h-full flex-col rounded-xl border border-stone-700/80 bg-stone-800/60 p-5 ${
        event.isPast ? 'opacity-80' : ''
      }`}
    >
      <span
        className={`text-xs font-bold uppercase tracking-wider ${
          event.isPast ? 'text-stone-500' : event.highlight ? 'text-amber-400' : 'text-stone-300'
        }`}
      >
        {event.dateLabel}
      </span>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h3 className={`text-lg font-bold leading-tight ${event.isPast ? 'text-stone-300' : 'text-white'}`}>
          {event.title}
        </h3>
        {event.isPast ? (
          <span className="inline-flex items-center rounded-full border border-stone-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
            Passed
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
            Upcoming
          </span>
        )}
      </div>
      <div className="mt-2 flex items-start gap-2 text-sm text-stone-300">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>{event.location}</span>
      </div>
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt={`${event.title} event`}
          className="mt-4 aspect-[4/3] w-full rounded-lg border border-stone-700 object-cover"
          loading="lazy"
        />
      ) : null}
      {event.description ? (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-400">{event.description}</p>
      ) : (
        <div className="flex-1" />
      )}
      {event.infoUrl ? (
        <a
          href={event.infoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300"
        >
          {event.infoLinkLabel || 'More info'}
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
        </a>
      ) : null}
    </motion.li>
  );
}

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
      if (!a.isPast) {
        const byDate = a.eventDate - b.eventDate;
        if (byDate !== 0) return byDate;
        return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
      }
      const byDate = b.eventDate - a.eventDate;
      if (byDate !== 0) return byDate;
      return (b.sortOrder ?? 0) - (a.sortOrder ?? 0);
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
        <PageHero
          size="custom"
          kicker="Events"
          title={
            <>
              BORN OF FIRE.
              <br />
              DRIVEN BY PURPOSE.
            </>
          }
          imageSrc="/events/images/event-10-truck-event-wide.png"
          imageAlt="Volcano Drip event setup outdoors"
          fetchPriority="high"
          imageWrapperExtraClassName="opacity-100"
          overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/60"
          sectionClassName="h-[min(40vh,380px)] min-h-[220px] py-10 md:h-[min(44vh,440px)] md:min-h-[260px] md:py-12"
          contentMaxWidthClassName="max-w-4xl"
          titleClassName="text-4xl md:text-6xl lg:text-7xl"
        />

        <section className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 pb-8 pt-12 text-center md:pb-10 md:pt-14">
            <p className="text-lg leading-relaxed text-stone-600 md:text-xl">
              We support youth, communities, and those facing homelessness—along with women&apos;s shelters,
              Indigenous initiatives and reconciliation, and causes focused on mental health, food access, and
              sustainability.
            </p>
            <div className="mt-6 border-t border-stone-200 pt-5">
              <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-stone-500 md:text-sm">
                Proud supporter &amp; participant
              </p>
              {supportPartners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:opacity-90"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="mx-auto w-full max-w-3xl rounded-xl"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-14">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-stone-200 bg-stone-900 p-6 md:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-amber-400" aria-hidden />
                <h2 className="text-2xl font-bold text-white">Events we are attending</h2>
              </div>
              <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {timelineEvents.map((ev, index) => (
                  <EventCard key={ev.id} event={ev} index={index} />
                ))}
              </ul>
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
