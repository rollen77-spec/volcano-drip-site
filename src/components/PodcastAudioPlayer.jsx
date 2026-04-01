import React, { useCallback, useState } from 'react';

/**
 * Inline podcast playback (MP3 from /public/audio or any absolute URL).
 * Browsers play natively—no redirect to Wondercraft required.
 */
export default function PodcastAudioPlayer({ src, label, className = '' }) {
  const [loadError, setLoadError] = useState(false);

  const onError = useCallback(() => {
    setLoadError(true);
  }, []);

  if (!src) return null;

  if (loadError) {
    return (
      <p className={`text-sm text-stone-500 ${className}`}>
        This episode couldn&apos;t be played here. Confirm the MP3 is uploaded (e.g. under{' '}
        <code className="rounded bg-stone-100 px-1 py-0.5 text-stone-800">public/audio/</code>) and redeploy.
      </p>
    );
  }

  return (
    <div className={className}>
      <span className="sr-only">Play audio: {label}</span>
      <audio
        key={src}
        controls
        preload="metadata"
        className="h-11 w-full max-w-xl rounded-lg bg-stone-100 ring-1 ring-stone-200/80"
        aria-label={`Play podcast: ${label}`}
        onError={onError}
      >
        {/* Single source avoids duplicate decode attempts; path must match a file under public/audio/ */}
        <source src={src} />
        Your browser does not support embedded audio.
      </audio>
    </div>
  );
}
