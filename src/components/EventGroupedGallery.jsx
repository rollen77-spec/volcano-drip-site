import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, X } from 'lucide-react';
import { VIDEO_TILE_POSTERS } from '@/data/eventsMedia';

const DEFAULT_VIDEO_POSTER =
  VIDEO_TILE_POSTERS[0] ?? '/events/images/video-placeholder-logo-full-color.png';

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

function GalleryModal({ selectedItem, onClose, setSelectedItem, mediaItems }) {
  const videoRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(selectedItem?.type === 'video');

  useEffect(() => {
    if (selectedItem?.type !== 'video') return;

    const el = videoRef.current;
    if (!el) return;

    let mounted = true;
    setIsBuffering(true);

    const handleCanPlay = async () => {
      if (!mounted) return;
      setIsBuffering(false);
      try {
        await el.play();
      } catch {
        // Autoplay may be blocked; controls still work.
      }
    };

    el.addEventListener('canplay', handleCanPlay);
    return () => {
      mounted = false;
      el.removeEventListener('canplay', handleCanPlay);
      el.pause();
    };
  }, [selectedItem]);

  if (!selectedItem) return null;

  const currentIndex = mediaItems.findIndex((item) => item.id === selectedItem.id);
  const prevItem = mediaItems[(currentIndex - 1 + mediaItems.length) % mediaItems.length];
  const nextItem = mediaItems[(currentIndex + 1) % mediaItems.length];
  const poster = selectedItem.posterUrl || DEFAULT_VIDEO_POSTER;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex h-full items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <motion.div
          key={selectedItem.id}
          className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
          initial={{ y: 14, scale: 0.98, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 10, scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black p-2">
            {selectedItem.type === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  className="max-h-[calc(90vh-5rem)] w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={poster}
                  onLoadedData={() => setIsBuffering(false)}
                  onError={() => setIsBuffering(false)}
                >
                  <source src={selectedItem.url} type={videoMimeFromUrl(selectedItem.url)} />
                </video>
                {isBuffering ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </div>
                ) : null}
              </>
            ) : (
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="max-h-[calc(90vh-5rem)] w-full object-contain"
              />
            )}
          </div>
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-stone-950/90 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{selectedItem.title}</p>
              <p className="truncate text-xs text-stone-300">{selectedItem.desc}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
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
        aria-label="Close gallery"
      >
        <X className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}

function GalleryTile({ item, onOpen }) {
  const isVideo = item.type === 'video';
  const poster = item.posterUrl || DEFAULT_VIDEO_POSTER;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`View full size: ${item.title}${item.desc ? `. ${item.desc}` : ''}`}
      className="group block w-full overflow-hidden rounded-xl border border-stone-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {isVideo ? (
        <div className="relative bg-stone-900">
          <div className="mx-auto aspect-[9/16] max-h-[420px] w-full max-w-[240px]">
            <img
              src={poster}
              alt={`${item.title} (video thumbnail)`}
              className="h-full w-full object-contain object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            <Play className="h-3 w-3" aria-hidden />
            Video
          </span>
        </div>
      ) : (
        <img
          src={item.url}
          alt={item.title}
          className="block h-auto w-full"
          loading="lazy"
          decoding="async"
        />
      )}
    </button>
  );
}

export default function EventGroupedGallery({ sections, footer }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const allItems = sections.flatMap((s) => s.items);

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">Event gallery</h2>
        <p className="mt-2 text-sm text-stone-600 sm:text-base">
          Photos and videos from recent appearances, grouped by event.
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.id} aria-labelledby={`gallery-${section.id}`}>
            <div className="mb-5 border-b border-stone-200 pb-3">
              <h3 id={`gallery-${section.id}`} className="text-lg font-bold text-stone-900 sm:text-xl">
                {section.label}
              </h3>
              {section.subtitle ? (
                <p className="mt-0.5 text-sm text-stone-500">{section.subtitle}</p>
              ) : null}
            </div>

            <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
              {section.items.map((item) => (
                <div key={item.id} className="mb-4 break-inside-avoid">
                  <GalleryTile item={item} onOpen={setSelectedItem} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {footer ? (
        <div className="mt-10 border-t border-stone-200 pt-8 text-center text-stone-600">{footer}</div>
      ) : null}

      <AnimatePresence>
        {selectedItem ? (
          <GalleryModal
            selectedItem={selectedItem}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={allItems}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function GalleryContactFooter() {
  return (
    <p>
      Want Volcano Drip at your next event?{' '}
      <Link to="/contact" className="font-semibold text-amber-700 hover:text-amber-800">
        Contact us
      </Link>{' '}
      and we&apos;ll connect.
    </p>
  );
}
