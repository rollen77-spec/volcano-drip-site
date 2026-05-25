import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GOOGLE_MAPS_REVIEWS_URL } from '@/config/googleReviews';
import { getAllDisplayReviews } from '@/data/reviews';
import { cn } from '@/lib/utils';

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
      className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-stone-100',
        review.source === 'google'
          ? 'bg-gradient-to-br from-blue-500 to-blue-700'
          : 'bg-gradient-to-br from-amber-500 to-amber-700',
      )}
      aria-hidden
    >
      {initials || '?'}
    </div>
  );
}

function TestimonialCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="w-full max-w-xs rounded-xl bg-white p-6 shadow-md shadow-stone-200/60"
    >
      <div className="flex items-center gap-3">
        <ReviewAvatar review={review} />
        <div className="min-w-0">
          <p className="font-playfair text-xl font-semibold text-stone-900">{review.name}</p>
          <p className="text-sm text-stone-500">
            {review.location}
            {review.source === 'google' ? ' · Google' : null}
          </p>
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="mt-4 text-sm leading-relaxed text-stone-500">&ldquo;{review.content}&rdquo;</p>
    </motion.div>
  );
}

export default function ReviewsBanner() {
  const reviews = getAllDisplayReviews();

  if (reviews.length === 0) return null;

  return (
    <section className="bg-stone-50 px-6 py-20 md:px-16 md:py-24 lg:px-24">
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

        <div className="mb-6 mt-16 flex flex-wrap items-stretch justify-center gap-6 md:mt-20">
          {reviews.map((review, index) => (
            <TestimonialCard key={review.id} review={review} index={index} />
          ))}
        </div>

        <Button variant="outline" className="border-stone-300 bg-white" asChild>
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
