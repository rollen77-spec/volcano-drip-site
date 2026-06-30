import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GOOGLE_MAPS_REVIEWS_URL, GOOGLE_REVIEWS_API_PATH } from '@/config/googleReviews';
import { curatedReviews, googleReviews, mixDisplayReviews } from '@/data/reviews';
import { cn } from '@/lib/utils';

const GROUP_SIZE = 3;
const ROTATE_MS = 7000;
const REVIEWS_API_URL = import.meta.env.VITE_REVIEWS_API_URL || GOOGLE_REVIEWS_API_PATH;

function chunkReviews(reviews, size) {
  const groups = [];
  for (let i = 0; i < reviews.length; i += size) {
    groups.push(reviews.slice(i, i + size));
  }
  return groups;
}

/** Mix curated + Google so each rotating group blends both sources. */
function buildDisplayReviews(activeGoogleReviews) {
  return mixDisplayReviews(curatedReviews, activeGoogleReviews);
}

function ReviewStar({ filled }) {
  return (
    <svg
      className="h-4 w-4 text-amber-400"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z"
      />
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="mt-4 flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <ReviewStar key={index} filled={rating > index} />
      ))}
    </div>
  );
}

function ReviewAvatar({ review }) {
  const initials = review.name
    .replace(/[^a-zA-Z\s.]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (review.image) {
    return (
      <img
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-stone-100"
        src={review.image}
        alt=""
      />
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-sm font-bold text-white ring-2 ring-stone-100"
      aria-hidden
    >
      {initials || '?'}
    </div>
  );
}

function SourceBadge({ source }) {
  const isGoogle = source === 'google';
  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
        isGoogle ? 'bg-blue-50 text-blue-800' : 'bg-amber-50 text-amber-900',
      )}
    >
      {isGoogle ? 'Google' : 'Customer'}
    </span>
  );
}

function TestimonialCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="w-full max-w-xs rounded-xl bg-white p-6 shadow-md shadow-stone-200/60"
    >
      <div className="flex items-start gap-3">
        <ReviewAvatar review={review} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-playfair text-xl font-semibold text-stone-900">{review.name}</p>
            <SourceBadge source={review.source} />
          </div>
          {review.location && review.source !== 'google' ? (
            <p className="text-sm text-stone-500">{review.location}</p>
          ) : null}
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="mt-4 text-sm leading-relaxed text-stone-500">&ldquo;{review.content}&rdquo;</p>
    </motion.div>
  );
}

export default function ReviewsBanner() {
  const [liveGoogleReviews, setLiveGoogleReviews] = useState(null);
  const displayReviews = useMemo(
    () => buildDisplayReviews(liveGoogleReviews ?? googleReviews),
    [liveGoogleReviews],
  );
  const groups = useMemo(() => chunkReviews(displayReviews, GROUP_SIZE), [displayReviews]);
  const [groupIndex, setGroupIndex] = useState(0);
  const isPausedRef = useRef(false);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(REVIEWS_API_URL)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (cancelled || !payload?.reviews?.length) return;
        setLiveGoogleReviews(payload.reviews);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setGroupIndex(0);
  }, [groups.length]);

  const activeGroup = groups[groupIndex] ?? [];
  const canRotate = groups.length > 1;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canRotate || !isInView) return undefined;

    const tick = () => {
      if (isPausedRef.current || document.hidden) return;
      setGroupIndex((current) => (current + 1) % groups.length);
    };

    const timer = window.setInterval(tick, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [canRotate, isInView, groups.length]);

  const handlePointerEnter = (event) => {
    if (event.pointerType === 'mouse') isPausedRef.current = true;
  };

  const handlePointerLeave = (event) => {
    if (event.pointerType === 'mouse') isPausedRef.current = false;
  };

  if (displayReviews.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-stone-50 px-6 py-20 md:px-16 md:py-24 lg:px-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex max-w-2xl flex-col items-center text-center"
        >
          <h2 className="text-4xl font-bold text-stone-900 md:text-[40px]">Customer Testimonials</h2>
          <p className="mt-2 max-w-[696px] text-sm text-stone-500 md:text-base">
            Hear what coffee lovers across Canada say about Volcano Drip. Had a great experience?
            We&apos;d love your feedback on{' '}
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-700 underline-offset-2 hover:underline"
            >
              Google
            </a>
            .
          </p>
        </motion.div>

        <div
          className="relative mb-2 mt-16 w-full md:mt-20"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <div
            className="flex min-h-[280px] flex-wrap items-stretch justify-center gap-6 md:min-h-[300px]"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4 }}
                className="flex w-full flex-wrap items-stretch justify-center gap-6"
              >
                {activeGroup.map((review, index) => (
                  <TestimonialCard key={review.id} review={review} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {canRotate ? (
            <div
              className="mt-8 flex justify-center gap-2"
              role="tablist"
              aria-label="Testimonial groups"
            >
              {groups.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === groupIndex}
                  aria-label={`Show reviews group ${i + 1} of ${groups.length}`}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === groupIndex ? 'w-8 bg-amber-600' : 'w-2 bg-stone-300 hover:bg-stone-400',
                  )}
                  onClick={() => setGroupIndex(i)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <Button variant="outline" className="mt-4 border-stone-300 bg-white" asChild>
          <a
            href={GOOGLE_MAPS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            Read all reviews on Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}
