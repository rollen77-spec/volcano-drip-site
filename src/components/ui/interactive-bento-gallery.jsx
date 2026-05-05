"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

const SIZE_CLASS = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[16/10]',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[5/3]',
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
  'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/primary-logo-copy-wWYt4.png';

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
    const poster = item.posterUrl || DEFAULT_VIDEO_POSTER;
    return (
      <div className={`${className} relative overflow-hidden`}>
        <img src={poster} alt={item.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        {showVideoBadge ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            <Play className="h-3 w-3" aria-hidden />
            Video
          </span>
        ) : null}
      </div>
    );
  }

  if (item.type === 'video') {
    const poster = item.posterUrl || DEFAULT_VIDEO_POSTER;
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls={variant === 'modal'}
          autoPlay={variant === 'modal'}
          playsInline
          muted={variant !== 'modal'}
          loop={variant !== 'modal'}
          preload="metadata"
          poster={poster}
          onLoadedData={() => setIsBuffering(false)}
          onError={() => setIsBuffering(false)}
          style={{
            opacity: isBuffering ? 0.8 : 1,
            transition: 'opacity 0.2s',
            transform: 'translateZ(0)',
            willChange: 'transform',
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

  return <img src={item.url} alt={item.title} className={`${className} object-cover`} loading="lazy" decoding="async" />;
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
            <div className="relative max-h-[75vh] w-full bg-black">
              <MediaItem
                item={selectedItem}
                className="h-[75vh] w-full object-contain"
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
  const size = item.size || fallbackSizes[index % fallbackSizes.length];
  const sizeClass = SIZE_CLASS[size] || SIZE_CLASS.portrait;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2) }}
      className="mb-4 break-inside-avoid"
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group block w-full overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div className={`relative w-full ${sizeClass}`}>
          <MediaItem
            item={item}
            className="absolute inset-0 h-full w-full"
            showVideoBadge={item.type === 'video'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-xs font-semibold text-white line-clamp-1">{item.title}</p>
            <p className="text-[11px] text-white/80 line-clamp-1">{item.desc}</p>
          </div>
        </div>
      </button>
    </motion.article>
  );
};

const InteractiveBentoGallery = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const items = useMemo(() => {
    const list = mediaItems || [];

    const hashStringToSeed = (str) => {
      let seed = 0;
      for (let i = 0; i < str.length; i++) seed = (seed * 31 + str.charCodeAt(i)) >>> 0;
      return seed >>> 0;
    };

    const xorshift32 = (seed) => {
      let s = seed >>> 0;
      return () => {
        s ^= s << 13;
        s ^= s >>> 17;
        s ^= s << 5;
        return (s >>> 0) / 4294967296;
      };
    };

    const shuffleWithSeed = (arr, seed) => {
      const out = [...arr];
      const rand = xorshift32(seed);
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    };

    // Split, shuffle within each group, then interleave deterministically.
    const seedSource = list.map((i) => i.id ?? i.url ?? i.title).join('|');
    const seedBase = hashStringToSeed(seedSource);

    const videos = list.filter((i) => i.type === 'video');
    const images = list.filter((i) => i.type !== 'video');

    const videosShuffled = shuffleWithSeed(videos, seedBase ^ 0x9e3779b9);
    const imagesShuffled = shuffleWithSeed(images, seedBase ^ 0x7f4a7c15);

    const out = [];
    let vi = 0;
    let ii = 0;

    // Pick which type starts based on the seed (deterministic).
    const startWithVideo = (seedBase & 1) === 0;
    let takeVideo = startWithVideo;

    while (vi < videosShuffled.length || ii < imagesShuffled.length) {
      if (takeVideo) {
        if (vi < videosShuffled.length) out.push(videosShuffled[vi++]);
        takeVideo = false;
      } else {
        if (ii < imagesShuffled.length) out.push(imagesShuffled[ii++]);
        takeVideo = true;
      }
    }

    return out;
  }, [mediaItems]);

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
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items.map((item, index) => (
              <MasonryCard key={item.id} item={item} index={index} onOpen={setSelectedItem} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveBentoGallery;
