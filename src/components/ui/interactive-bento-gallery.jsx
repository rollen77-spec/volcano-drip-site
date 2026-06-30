"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { VIDEO_TILE_POSTERS } from '@/data/eventsMedia';

const SIZE_CLASS = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[16/10]',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[5/3]',
  video: 'aspect-[9/16]',
};

function videoMimeFromUrl(url) {
  try {
    const path = decodeURIComponent(url.split('?')[0].split('#')[0]);
    const ext = path.split('.').pop()?.toLowerCase() || '';
    if (ext === 'mov') return 'video/quicktime';
    if (ext === 'webm') return 'video/webm';
    if (ext === 'ogv' || ext === 'ogg') return 'video/ogg';
    return 'video/mp4';
  } catch {
    return 'video/mp4';
  }
}

const DEFAULT_VIDEO_POSTER =
  VIDEO_TILE_POSTERS[0] ?? '/events/images/video-placeholder-logo-full-color.png';

const MediaItem = ({ item, className, showVideoBadge = false, variant = 'grid' }) => {
  const videoRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(variant === 'modal' && item.type === 'video');

  useEffect(() => {
    if (variant !== 'modal' || item.type !== 'video') return;

    const el = videoRef.current;
    if (!el) return;

    let mounted = true;
    setIsBuffering(true);

    const handleCanPlay = async () => {
      if (!mounted) return;
      setIsBuffering(false);
      try {
        await el.play();
      } catch (error) {
        // Autoplay can be blocked depending on browser; user can still press play.
        // eslint-disable-next-line no-console
        console.warn('Video playback failed:', error);
      }
    };

    el.addEventListener('canplay', handleCanPlay);
    return () => {
      mounted = false;
      el.removeEventListener('canplay', handleCanPlay);
      el.pause();
    };
  }, [item.type, item.url, variant]);

  // Performance optimization:
  // In the grid we render *no* real <video> tags to avoid background fetching.
  // In the modal we render the actual <video>.
  if (item.type === 'video' && variant === 'grid') {
    const tilePoster = item.posterUrl || DEFAULT_VIDEO_POSTER;
    const usesEventPoster = Boolean(item.posterUrl);
    const fitMode = item.fit === 'cover' ? 'cover' : 'contain';

    return (
      <div className={`${className} relative overflow-hidden bg-stone-950`}>
        <img
          src={tilePoster}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full ${
            fitMode === 'cover' ? 'object-cover' : 'object-contain'
          } ${usesEventPoster ? '' : 'p-6 opacity-95'}`}
          style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Video
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white/95 shadow-lg ring-4 ring-white/20 sm:h-20 sm:w-20">
            <Play className="ml-1 h-9 w-9 fill-stone-900 text-stone-900 sm:h-10 sm:w-10" aria-hidden />
          </div>
        </div>
        {showVideoBadge ? (
          <span className="sr-only">Video: {item.title}</span>
        ) : null}
      </div>
    );
  }

  if (item.type === 'video') {
    const poster = item.posterUrl || DEFAULT_VIDEO_POSTER;
    const isModal = variant === 'modal';
    return (
      <div
        className={`${className} relative flex items-center justify-center overflow-hidden bg-black ${
          isModal ? '' : ''
        }`}
      >
        <video
          ref={videoRef}
          className={
            isModal
              ? 'max-h-[calc(75vh-2rem)] w-auto max-w-full object-contain'
              : 'max-h-full max-w-full object-contain'
          }
          controls={isModal}
          autoPlay={isModal}
          playsInline
          muted={!isModal}
          loop={!isModal}
          preload="metadata"
          poster={poster}
          onLoadedData={() => setIsBuffering(false)}
          onError={() => setIsBuffering(false)}
          style={{
            opacity: isBuffering ? 0.8 : 1,
            transition: 'opacity 0.2s',
            objectPosition: item.objectPosition || 'center center',
          }}
        >
          <source src={item.url} type={videoMimeFromUrl(item.url)} />
        </video>
        {showVideoBadge ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            <Play className="h-3 w-3" aria-hidden />
            Video
          </span>
        ) : null}
        {isBuffering && variant !== 'grid' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={item.url}
      alt={item.title}
      className={`${className} object-contain object-top`}
      loading="lazy"
      decoding="async"
    />
  );
};

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }) => {
  if (!isOpen) return null;

  const currentIndex = mediaItems.findIndex((item) => item.id === selectedItem.id);
  const prevItem = mediaItems[(currentIndex - 1 + mediaItems.length) % mediaItems.length];
  const nextItem = mediaItems[(currentIndex + 1) % mediaItems.length];

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="flex h-full items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
          <motion.div
            key={selectedItem.id}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
            initial={{ y: 14, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex min-h-[200px] max-h-[75vh] w-full items-center justify-center overflow-hidden bg-black p-2">
              <MediaItem
                item={selectedItem}
                className="max-h-[calc(75vh-1rem)] max-w-full"
                showVideoBadge={false}
                variant="modal"
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-stone-950/90 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">{selectedItem.title}</p>
                <p className="text-xs text-stone-300">{selectedItem.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(prevItem)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem(nextItem)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="button"
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-stone-900 hover:bg-white"
          onClick={onClose}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      </motion.div>
    </>
  );
};

const MasonryCard = ({ item, index, onOpen }) => {
  const fallbackSizes = ['portrait', 'wide', 'tall', 'square', 'landscape'];
  const size =
    item.type === 'video'
      ? 'video'
      : item.size || fallbackSizes[index % fallbackSizes.length];
  const sizeClass = SIZE_CLASS[size] || SIZE_CLASS.portrait;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2) }}
      className="shrink-0"
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`View full size: ${item.title}${item.desc ? `. ${item.desc}` : ''}`}
        className="group block w-full overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div className={`relative w-full ${sizeClass} bg-stone-100`}>
          <MediaItem
            item={item}
            className="absolute inset-0 h-full w-full"
            showVideoBadge={item.type === 'video'}
          />
        </div>
      </button>
    </motion.article>
  );
};

const InteractiveBentoGallery = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const items = mediaItems || [];

  return (
    <div className="container mx-auto px-0 py-2 max-w-6xl">
      <div className="mb-8 text-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        {description ? (
          <motion.p
            className="mt-2 text-sm sm:text-base text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryModal
            selectedItem={selectedItem}
            isOpen={true}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:hidden">
              {items.map((item, index) => (
                <MasonryCard key={item.id} item={item} index={index} onOpen={setSelectedItem} />
              ))}
            </div>

            <div className="hidden gap-4 sm:flex sm:flex-row sm:items-start lg:hidden">
              {[0, 1].map((col) => (
                <div key={`gal-sm-${col}`} className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
                  {items
                    .map((item, i) => ({ item, i }))
                    .filter(({ i }) => i % 2 === col)
                    .map(({ item, i }) => (
                      <MasonryCard key={item.id} item={item} index={i} onOpen={setSelectedItem} />
                    ))}
                </div>
              ))}
            </div>

            <div className="hidden gap-4 lg:flex lg:flex-row lg:items-start">
              {[0, 1, 2].map((col) => (
                <div key={`gal-lg-${col}`} className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
                  {items
                    .map((item, i) => ({ item, i }))
                    .filter(({ i }) => i % 3 === col)
                    .map(({ item, i }) => (
                      <MasonryCard key={item.id} item={item} index={i} onOpen={setSelectedItem} />
                    ))}
                </div>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveBentoGallery;
