/** The Daily Grind Podcast — episode list & branding (listen URLs optional via .env). */
export const PODCAST_LOGO_URL =
  'https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/primary-logo-copy-wWYt4.png';

export const PODCAST_NAME = 'The Daily Grind Podcast';

export const PODCAST_EPISODES = [
  {
    id: 'brewing-perfect-cup',
    title: 'The Art of Brewing the Perfect Cup',
    description:
      'Techniques, timing, and taste—how to coax the best cup from volcanic beans, whether you brew pour-over, drip, or espresso.',
    listenUrl: import.meta.env.VITE_PODCAST_EPISODE_BREWING_URL ?? '',
  },
  {
    id: 'volcanic-coffee-unveiled',
    title: 'Volcanic Coffee Unveiled',
    description:
      'Why volcanic soil matters—from minerality in the cup to the stories behind our single-origin lots.',
    listenUrl: import.meta.env.VITE_PODCAST_EPISODE_VOLCANIC_URL ?? '',
  },
];
