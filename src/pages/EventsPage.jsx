import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, ExternalLink, MapPin, HeartHandshake } from 'lucide-react';
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
    logo: 'https://walksokidscantalk.ca/walkfortalk/media/images/logo_KHP_new_EN.svg',
  },
];

const uniqueEventGalleryImages = Array.from(
  new Map(eventGalleryImages.map((item) => [item.url, item])).values(),
);

const galleryMediaItems = arrangeGalleryMedia(
  buildGalleryMediaItems(uniqueEventGalleryImages, eventGalleryVideos, VIDEO_TILE_POSTERS),
);

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
        // Upcoming: soonest first
        const byDate = a.eventDate - b.eventDate;
        if (byDate !== 0) return byDate;
        return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
      }
      // Past: most recent first (Oakville, Movie Night, then older events)
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
          <div className="mx-auto max-w-3xl px-4 pb-10 pt-12 text-center md:pb-12 md:pt-14">
            <p className="text-lg leading-relaxed text-stone-600 md:text-xl">
              We support youth, communities, and those facing homelessness—along with women&apos;s shelters,
              Indigenous initiatives and reconciliation, and causes focused on mental health, food access, and
              sustainability.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
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
                    {ev.imageUrl ? (
                      <img
                        src={ev.imageUrl}
                        alt={`${ev.title} event`}
                        className="mt-4 w-full max-w-sm rounded-lg border border-stone-700 object-cover shadow-md"
                        loading="lazy"
                      />
                    ) : null}
                    {ev.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-stone-400">{ev.description}</p>
                    ) : null}
                    {ev.infoUrl ? (
                      <a
                        href={ev.infoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300"
                      >
                        {ev.infoLinkLabel || 'More info'}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="flex flex-col lg:h-full"
            >
              <div className="flex h-full flex-col justify-center rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8">
                <div className="mb-4 flex items-center gap-2 text-amber-700">
                  <HeartHandshake className="h-5 w-5 shrink-0" aria-hidden />
                  <p className="text-xl font-black leading-tight tracking-tight text-stone-900 md:text-2xl">
                    We are a proud supporter and participant of the following events
                  </p>
                </div>
                <div className="mt-2 flex flex-1 flex-col justify-center gap-4">
                  {supportPartners.map((partner) => (
                    <a
                      key={partner.id}
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl border border-amber-200/80 bg-white/80 p-5 transition hover:shadow-sm"
                    >
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-14 w-auto object-contain md:h-16"
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
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
