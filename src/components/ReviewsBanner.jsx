import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { GOOGLE_MAPS_REVIEWS_URL } from '@/config/googleReviews';
import { getAllDisplayReviews } from '@/data/reviews';
import { cn } from '@/lib/utils';

const AUTOPLAY_MS = 6000;

function StarRating({ rating, className }) {
  return (
    <div className={cn('flex gap-0.5', className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i <= rating ? 'fill-amber-500 text-amber-500' : 'fill-stone-200 text-stone-200',
          )}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const isGoogle = review.source === 'google';

  return (
    <div className="flex h-full min-h-[280px] flex-col justify-between rounded-2xl border border-stone-100 bg-white p-8 shadow-sm md:min-h-[300px]">
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <StarRating rating={review.rating} />
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
              isGoogle
                ? 'bg-blue-50 text-blue-800'
                : 'bg-amber-50 text-amber-900',
            )}
          >
            {isGoogle ? 'Google' : 'Customer'}
          </span>
        </div>
        <Quote className="mb-4 h-10 w-10 text-stone-100" aria-hidden />
        <p className="text-lg italic leading-relaxed text-stone-700">&ldquo;{review.content}&rdquo;</p>
      </div>
      <div className="mt-6 border-t border-stone-100 pt-4">
        <p className="font-bold text-stone-900">{review.name}</p>
        {review.location ? (
          <p className="text-sm text-stone-500">{review.location}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function ReviewsBanner() {
  const reviews = getAllDisplayReviews();
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || reviews.length < 2 || isPaused) return;

    const timer = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [api, reviews.length, isPaused]);

  if (reviews.length === 0) return null;

  return (
    <section className="bg-stone-50 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-8 text-4xl font-black uppercase leading-[0.9] tracking-tighter text-stone-900 md:text-6xl">
            Loved by the <br />
            Community
          </h2>
          <div className="flex justify-center gap-1" aria-hidden>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
            ))}
          </div>
        </motion.div>

        <div
          className="mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: 'center', loop: reviews.length > 1 }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id}>
                  <ReviewCard review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {reviews.length > 1 ? (
              <>
                <CarouselPrevious className="left-0 border-stone-200 bg-white md:-left-12" />
                <CarouselNext className="right-0 border-stone-200 bg-white md:-right-12" />
              </>
            ) : null}
          </Carousel>

          {reviews.length > 1 ? (
            <div
              className="mt-6 flex justify-center gap-2"
              role="tablist"
              aria-label="Review slides"
            >
              {reviews.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Show review ${i + 1} of ${reviews.length}`}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === activeIndex ? 'w-8 bg-amber-600' : 'w-2 bg-stone-300',
                  )}
                  onClick={() => api?.scrollTo(i)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" className="border-stone-300" asChild>
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
      </div>
    </section>
  );
}
