import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, MapPin, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { upcomingAppearances } from '@/data/appearances';
import { aboutEventGallery } from '@/data/aboutEventGallery';
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery';

const supportPartners = [
  {
    id: 'bmo-walk-so-kids-can-talk',
    name: 'BMO Walk so Kids Can Talk',
    href: 'https://walksokidscantalk.ca',
    logo: 'https://walksokidscantalk.ca/walkfortalk/media/images/logo_KHP_new_EN.svg',
  },
];

const gallerySpanPattern = [
  'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2',
  'md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2',
  'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
];

const galleryMediaItems = [
  {
    id: 1,
    type: 'video',
    title: 'Volcano Drip Event Reel',
    desc: 'Outdoor setup highlights and on-site moments.',
    url: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
    span: 'md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2',
  },
  ...aboutEventGallery.map((item, index) => ({
    id: index + 2,
    type: 'image',
    title: `Event Photo ${index + 1}`,
    desc: 'Volcano Drip at community events and pop-ups.',
    url: item.src,
    span: gallerySpanPattern[index % gallerySpanPattern.length],
  })),
  {
    id: aboutEventGallery.length + 2,
    type: 'video',
    title: 'Community Atmosphere',
    desc: 'A feel-good moment from a busy outdoor event.',
    url: 'https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
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
                  We are proud to support initiatives focused on youth wellbeing, with additional
                  community partners to be featured here over time.
                </p>
              </div>

              {supportPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center rounded-2xl border border-stone-200 bg-white p-5"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-12 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
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
