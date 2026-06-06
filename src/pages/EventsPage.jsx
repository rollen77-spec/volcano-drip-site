import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, ChevronRight, ExternalLink, HeartHandshake, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { upcomingAppearances } from '@/data/appearances';
import { eventGalleryImages, eventGalleryVideos, VIDEO_TILE_POSTERS } from '@/data/eventsMedia';
import {
  buildGalleryMediaItems,
  groupGalleryMediaBySection,
} from '@/lib/eventGalleryLayout';
import EventGroupedGallery, { GalleryContactFooter } from '@/components/EventGroupedGallery';
import PageHero from '@/components/PageHero';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

const gallerySections = groupGalleryMediaBySection(
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
      const byDate = a.eventDate - b.eventDate;
      if (byDate !== 0) return byDate;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    });

  const upcomingEvents = timelineEvents.filter((ev) => !ev.isPast);
  const pastEvents = timelineEvents.filter((ev) => ev.isPast);

  return (
    <>
      <Helmet>
        <title>Events | Volcano Drip</title>
        <meta
          name="description"
          content="See upcoming Volcano Drip events, community partnerships, and a photo gallery from recent appearances."
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
          sectionClassName="h-[min(36vh,340px)] min-h-[200px] py-8 md:h-[min(40vh,380px)] md:min-h-[220px] md:py-10"
          contentMaxWidthClassName="max-w-4xl"
          titleClassName="text-4xl md:text-6xl lg:text-7xl"
        />

        <section className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 pb-8 pt-10 text-center md:pt-12">
            <p className="text-lg leading-relaxed text-stone-600 md:text-xl">
              We support youth, communities, and those facing homelessness—along with women&apos;s shelters,
              Indigenous initiatives and reconciliation, and causes focused on mental health, food access, and
              sustainability.
            </p>
          </div>

          <div className="mx-auto max-w-6xl space-y-10 px-4 pb-12">
            {/* Upcoming */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-5 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-amber-600" aria-hidden />
                <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">Upcoming events</h2>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((ev) => (
                    <article
                      key={ev.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
                    >
                      {ev.imageUrl ? (
                        <img
                          src={ev.imageUrl}
                          alt={`${ev.title} event`}
                          className="h-44 w-full object-cover object-center sm:h-48"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-28 items-center justify-center bg-stone-900 sm:h-32">
                          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                            {ev.dateLabel}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                          {ev.dateLabel}
                        </span>
                        <h3 className="mt-1 text-lg font-bold text-stone-900">{ev.title}</h3>
                        <div className="mt-1 flex items-start gap-2 text-sm text-stone-500">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                          <span>{ev.location}</span>
                        </div>
                        {ev.description ? (
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{ev.description}</p>
                        ) : null}
                        {ev.infoUrl ? (
                          <a
                            href={ev.infoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-800"
                          >
                            {ev.infoLinkLabel || 'More info'}
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          </a>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-5 py-8 text-center text-stone-500">
                  No upcoming events right now — check back soon or{' '}
                  <Link to="/contact" className="font-semibold text-amber-700 hover:text-amber-800">
                    invite us to yours
                  </Link>
                  .
                </p>
              )}
            </motion.div>

            {/* Past events — accordion */}
            {pastEvents.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
              >
                <Accordion type="single" collapsible className="rounded-2xl border border-stone-200 bg-stone-50 px-5">
                  <AccordionItem value="past-events" className="border-none">
                    <AccordionTrigger className="text-base font-bold text-stone-900 hover:no-underline">
                      Past events ({pastEvents.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="divide-y divide-stone-200">
                        {pastEvents.map((ev) => (
                          <li key={ev.id} className="flex flex-wrap items-start justify-between gap-3 py-4 first:pt-0">
                            <div className="min-w-0 flex-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                                {ev.dateLabel}
                              </span>
                              <h3 className="mt-0.5 font-semibold text-stone-800">{ev.title}</h3>
                              <div className="mt-0.5 flex items-center gap-1.5 text-sm text-stone-500">
                                <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                                <span>{ev.location}</span>
                              </div>
                              {ev.description ? (
                                <p className="mt-2 text-sm text-stone-500">{ev.description}</p>
                              ) : null}
                            </div>
                            {ev.infoUrl ? (
                              <a
                                href={ev.infoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-800"
                              >
                                Info
                                <ChevronRight className="h-4 w-4" aria-hidden />
                              </a>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ) : null}

            {/* Supporters — horizontal strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 sm:flex-row sm:justify-center sm:gap-8"
            >
              <div className="flex items-center gap-2 text-amber-800">
                <HeartHandshake className="h-5 w-5 shrink-0" aria-hidden />
                <p className="text-sm font-bold uppercase tracking-wide">Proud supporters</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {supportPartners.map((partner) => (
                  <a
                    key={partner.id}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-amber-200/80 bg-white px-5 py-3 transition hover:shadow-sm"
                  >
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="h-10 w-auto object-contain sm:h-11"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-stone-100 py-12 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <EventGroupedGallery sections={gallerySections} footer={<GalleryContactFooter />} />
          </div>
        </section>
      </div>
    </>
  );
};

export default EventsPage;
