/**
 * Events media source-of-truth.
 *
 * How to add new media:
 * 1) Drop image files in `public/events/images/`
 * 2) Drop video files in `public/events/videos/` (or use external mp4 URLs)
 * 3) Add an entry below (title/desc/url)
 */

export const eventGalleryImages = [
  {
    title: 'Event Photo 1',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-01-piaggio-display.png',
  },
  {
    title: 'Event Photo 2',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-02-outdoor-booth.png',
  },
  {
    title: 'Event Photo 3',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-03-chalkboard-sign.png',
  },
  {
    title: 'Event Photo 4',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-04-coffee-crate-display.png',
  },
  {
    title: 'Event Photo 5',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-05-multi-origin-crate.png',
  },
  {
    title: 'Event Photo 6',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-06-burlap-sack.png',
  },
  {
    title: 'Event Photo 7',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-07-logo-sticker.png',
  },
  {
    title: 'Event Photo 8',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-08-basket-three-bags.png',
  },
  {
    title: 'Event Photo 9',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-09-truck-bed-close.png',
  },
  {
    title: 'Event Photo 10',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-10-truck-event-wide.png',
  },
  {
    title: 'Event Photo 11',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-11-truck-burlap-foreground.png',
  },
  {
    title: 'Event Photo 12',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-12-chalkboard-fuel-fire.png',
  },
  {
    title: 'Event Photo 13',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-13-crate-lineup.png',
  },
  {
    title: 'Event Photo 14',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-14-crate-full-lineup.png',
  },
  {
    title: 'Event Photo 15',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-15-crate-nine-bags.png',
  },
  {
    title: 'Event Photo 16',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-16-truck-staff-dog.png',
  },
  {
    title: 'Event Photo 17',
    desc: 'Recently added event photo.',
    url: '/events/images/IMG_6792.jpeg',
  },
  {
    title: 'Event Photo 18',
    desc: 'Recently added event photo.',
    url: '/events/images/IMG_6793.jpeg',
  },
];

export const eventGalleryVideos = [
  {
    title: 'Event video — IMG_6809',
    desc: 'Local clip from public/events/videos.',
    url: '/events/videos/IMG_6809.MOV',
    size: 'portrait',
  },
  {
    title: 'Event video — IMG_8556',
    desc: 'Local clip from public/events/videos.',
    /** Space in filename: use %20 in the URL path (or rename the file on disk). */
    url: '/events/videos/IMG_8556%202.MP4',
    size: 'wide',
  },
  {
    title: 'Volcano Drip Event Reel',
    desc: 'Outdoor setup highlights and on-site moments.',
    url: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
    size: 'wide',
  },
  {
    title: 'Community Atmosphere',
    desc: 'A feel-good moment from a busy outdoor event.',
    url: 'https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4',
    size: 'tall',
  },

  // Example local MP4 entry:
  // {
  //   title: 'Booth Walkthrough',
  //   desc: 'Quick look at our event setup.',
  //   url: '/events/videos/booth-walkthrough.mp4',
  //   size: 'landscape',
  // },
];
