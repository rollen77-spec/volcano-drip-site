/** The Daily Grind Podcast — branding, episodes, and audio sources. */

export const PODCAST_LOGO_URL =
  'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/primary-logo-copy-wWYt4.png';

export const PODCAST_NAME = 'The Daily Grind Podcast';

/**
 * Self-hosted audio: place MP3 files in `public/audio/` (served as `/audio/...`).
 * Optional `.env` overrides if you use different filenames or a CDN URL:
 *   VITE_PODCAST_AUDIO_BREWING, VITE_PODCAST_AUDIO_VOLCANIC, VITE_PODCAST_AUDIO_FRESHNESS,
 *   VITE_PODCAST_AUDIO_FESTIVALS, VITE_PODCAST_AUDIO_HEALTH
 * External `listenUrl` is optional (e.g. Wondercraft) — shown as a secondary link when set.
 * Optional `relatedBlog` `{ path, label }` links the episode to its companion article.
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
  {
    id: 'coffee-freshness-demystified',
    title: 'Coffee Freshness Demystified: Everything You Need to Know',
    description:
      'Freshly Roasted Coffee, Explained: Degassing, Rest, and Flavor.',
    audioSrc:
      import.meta.env.VITE_PODCAST_AUDIO_FRESHNESS?.trim() ||
      '/audio/podcast-coffee-freshness-demystified.mp3',
    listenUrl: import.meta.env.VITE_PODCAST_EPISODE_FRESHNESS_URL ?? '',
  },
  {
    id: 'coffee-festivals-new-social-scene',
    title: 'Coffee Festivals: The New Social Scene',
    description:
      'Why Coffee Festivals Are the New Night Out: Daytime music, specialty roasters, dog-friendly vibes — inside the coffee event boom taking over Toronto and beyond.',
    audioSrc:
      import.meta.env.VITE_PODCAST_AUDIO_FESTIVALS?.trim() ||
      '/audio/podcast-coffee-festivals-new-social-scene.mp3',
    listenUrl: import.meta.env.VITE_PODCAST_EPISODE_FESTIVALS_URL ?? '',
  },
  {
    id: 'coffee-health-benefits-and-myths',
    title: 'Coffee and Health: Benefits and Myths',
    description:
      'What the research actually says about coffee and your health — the real benefits, the persistent myths, and why moderate coffee drinking looks better the older you get.',
    audioSrc:
      import.meta.env.VITE_PODCAST_AUDIO_HEALTH?.trim() ||
      '/audio/podcast-coffee-health-benefits-and-myths.mp3',
    listenUrl: import.meta.env.VITE_PODCAST_EPISODE_HEALTH_URL ?? '',
    relatedBlog: {
      path: '/blog/is-coffee-good-for-you-after-50',
      label: 'Is Coffee Good for You? What the Science Says After 50',
    },
  },
];
