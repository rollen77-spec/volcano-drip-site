/** The Daily Grind Podcast — branding, episodes, and audio sources. */

export const PODCAST_LOGO_URL =
  'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/primary-logo-copy-wWYt4.png';

export const PODCAST_NAME = 'The Daily Grind Podcast';

/**
 * Self-hosted audio: place MP3 files in `public/audio/` (served as `/audio/...`).
 * Optional `.env` overrides if you use different filenames or a CDN URL:
 *   VITE_PODCAST_AUDIO_BREWING, VITE_PODCAST_AUDIO_VOLCANIC
 * External `listenUrl` is optional (e.g. Wondercraft) — shown as a secondary link when set.
 */
export const PODCAST_EPISODES = [
  {
    id: 'brewing-perfect-cup',
    title: 'The Art of Brewing the Perfect Cup',
    description:
      'Techniques, timing, and taste—how to coax the best cup from volcanic beans, whether you brew pour-over, drip, or espresso.',
    audioSrc:
      import.meta.env.VITE_PODCAST_AUDIO_BREWING?.trim() || '/audio/podcast-brewing-perfect-cup.mp3',
    listenUrl: import.meta.env.VITE_PODCAST_EPISODE_BREWING_URL ?? '',
  },
  {
    id: 'volcanic-coffee-unveiled',
    title: 'Volcanic Coffee Unveiled',
    description:
      'Why volcanic soil matters—from minerality in the cup to the stories behind our single-origin lots.',
    audioSrc:
      import.meta.env.VITE_PODCAST_AUDIO_VOLCANIC?.trim() || '/audio/podcast-volcanic-coffee-unveiled.mp3',
    listenUrl: import.meta.env.VITE_PODCAST_EPISODE_VOLCANIC_URL ?? '',
  },
];
