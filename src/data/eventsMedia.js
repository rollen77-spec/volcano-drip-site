/**
 * Events media source-of-truth.
 *
 * How to add new media:
 * 1) Drop image files in `public/events/images/`
 * 2) Drop video files in `public/events/videos/` (or use external mp4 URLs)
 * 3) Add an entry below with title, desc, url, dateIso (YYYY-MM-DD), and group
 *    — newest entries at the top of each section
 * 4) Optional: posterUrl for videos (use a still from the clip), sectionId to override grouping
 */

/** Alternate logos rotated on video tiles (full wordmark visible in art). */
export const VIDEO_TILE_POSTERS = [
  '/events/images/video-placeholder-logo-full-color.png',
  '/events/images/video-placeholder-logo-bw-wordmark.png',
  '/events/images/video-placeholder-logo-blue-transparent.png',
];

export const eventGalleryImages = [
  // —— June 26–28, 2026 — Asado @ Assembly Park ——
  {
    title: 'Asado 2026 — Volcano Drip booth',
    desc: 'Guest with Inca Ascent at our Assembly Park booth — Latin culture, music, and single-origin coffee all weekend.',
    url: '/events/images/event-assado-booth-inca-ascent.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-booth',
    size: 'portrait',
  },
  {
    title: 'Asado 2026 — Antigua Ember & Copán Rise',
    desc: 'Showcasing Antigua Ember and Copán Rise single-origin bags at Asado 2026.',
    url: '/events/images/event-assado-antigua-copan-guest.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-product-shots',
    size: 'portrait',
  },
  {
    title: 'Asado 2026 — Antigua Ember guest',
    desc: 'Guest enjoying iced Volcano Drip with Antigua Ember from Guatemala.',
    url: '/events/images/event-assado-antigua-ember-guest.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-guests',
    size: 'portrait',
  },
  {
    title: 'Asado 2026 — branded tote',
    desc: 'Attendees with a Volcano Drip canvas tote at the Toronto Latinos Asado festival.',
    url: '/events/images/event-assado-tote-bag-guests.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-guests',
    size: 'portrait',
  },
  {
    title: 'Asado 2026 — iced drinks',
    desc: 'Couple with Volcano Drip iced coffees at Assembly Park.',
    url: '/events/images/event-assado-couple-iced-drinks.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-drinks',
    size: 'portrait',
  },
  {
    title: 'Asado 2026 — frozen coffee',
    desc: 'Refreshing frozen Volcano Drip coffee at the Asado festival.',
    url: '/events/images/event-assado-woman-frozen-coffee.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-drinks',
    size: 'portrait',
  },
  {
    title: 'Asado 2026 — frozen coffee on the patio',
    desc: 'Volcano Drip frozen coffee slushie on a sunny Assembly Park afternoon.',
    url: '/events/images/event-assado-frozen-coffee-table.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-drinks',
    size: 'portrait',
  },
  {
    title: 'Asado 2026 — iced coffee to go',
    desc: 'Guest with a branded iced Volcano Drip cup at Assembly Park.',
    url: '/events/images/event-assado-guest-iced-coffee.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-guests',
    size: 'portrait',
  },
  {
    title: 'Asado 2026 — branded cup close-up',
    desc: 'Iced Volcano Drip coffee at our mobile setup — Asado 2026.',
    url: '/events/images/event-assado-branded-cup-closeup.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-drinks',
    size: 'portrait',
  },
  {
    title: 'Asado 2026 — pickup counter',
    desc: 'Serving iced coffees and samples from the Volcano Drip pickup table.',
    url: '/events/images/event-assado-pickup-counter.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-booth',
  },
  {
    title: 'Asado 2026 — Assembly Park',
    desc: 'Assembly Park, Vaughan — home of Asado 2026 with Toronto Latinos.',
    url: '/events/images/event-assado-assembly-park-sign.png',
    dateIso: '2026-06-26',
    group: 'assado-2026-venue',
    size: 'portrait',
  },

  // —— June 5, 2026 — Outdoor Movie Night ——
  {
    title: 'Outdoor Movie Night — Piaggio display',
    desc: 'Volcano Drip mobile display at a Mississauga school Outdoor Movie Night, June 5, 2026.',
    url: '/events/images/event-movie-night-piaggio-display.png',
    dateIso: '2026-06-05',
    group: 'outdoor-movie-night-2026',
  },
  {
    title: 'Outdoor Movie Night — on the lawn',
    desc: 'Families settling in for movie night — proud to support the Mississauga community.',
    url: '/events/images/event-movie-night-outdoor-screen.png',
    dateIso: '2026-06-05',
    group: 'outdoor-movie-night-2026',
  },

  // —— June 5, 2026 — Oakville Pop-Up ——
  {
    title: 'Oakville Pop-Up — display table',
    desc: 'Volcano Drip setup at the June 5, 2026 Oakville Pop-Up — where coffee meets fashion.',
    url: '/events/images/event-oakville-display-table.png',
    dateIso: '2026-06-05',
    group: 'oakville-pop-up-2026',
  },
  {
    title: 'Oakville Pop-Up — boutique coffee',
    desc: 'Guest enjoying Volcano Drip coffee inside the pop-up boutique.',
    url: '/events/images/event-oakville-boutique-coffee.png',
    dateIso: '2026-06-05',
    group: 'oakville-pop-up-2026',
    size: 'portrait',
  },
  {
    title: 'Oakville Pop-Up — coffee basket display',
    desc: 'Single-origin bags on display at the Oakville Pop-Up.',
    url: '/events/images/event-oakville-coffee-basket-display.png',
    dateIso: '2026-06-05',
    group: 'oakville-coffee-display',
  },
  {
    title: 'Oakville Pop-Up — Inca Ascent & Sumatra Black',
    desc: 'Showcasing Inca Ascent and Sumatra Black at the Oakville Pop-Up.',
    url: '/events/images/event-oakville-inca-sumatra-guest.png',
    dateIso: '2026-06-05',
    group: 'oakville-pop-up-2026',
    size: 'portrait',
  },
  {
    title: 'Oakville Pop-Up — Volcano Drip tote',
    desc: 'Volcano Drip canvas tote at the Oakville Pop-Up patio.',
    url: '/events/images/event-oakville-tote-bag-patio.png',
    dateIso: '2026-06-05',
    group: 'oakville-pop-up-2026',
    size: 'portrait',
  },
  {
    title: 'Oakville Pop-Up — origin bags outdoors',
    desc: 'Inca Ascent and Sumatra Black on a sunny Oakville street.',
    url: '/events/images/event-oakville-origin-bags-outdoors.png',
    dateIso: '2026-06-05',
    group: 'oakville-product-shots',
    size: 'portrait',
  },
  {
    title: 'Oakville Pop-Up — street style',
    desc: 'Coffee meets fashion — Volcano Drip tote on the streets of Oakville.',
    url: '/events/images/event-oakville-street-fashion.png',
    dateIso: '2026-06-05',
    group: 'oakville-street-style',
    size: 'tall',
  },
  {
    title: 'Oakville Pop-Up — street tote fashion',
    desc: 'Volcano Drip at the Oakville Pop-Up — style and coffee culture together.',
    url: '/events/images/event-oakville-street-tote-fashion.png',
    dateIso: '2026-06-05',
    group: 'oakville-street-style',
    size: 'tall',
  },

  // —— May 2026 — community festivals ——
  {
    title: 'Samples on the field',
    desc: 'Pouring samples with partners at an outdoor gathering.',
    url: '/events/images/event-bmo-sumatra-sample-cup.png',
    dateIso: '2026-05-03',
    group: 'walk-so-kids-2026',
  },
  {
    title: 'Community partnership event',
    desc: 'Volcano Drip with Kids Help Phone at a festival.',
    url: '/events/images/event-sumatra-kids-help-phone.png',
    dateIso: '2026-05-03',
    group: 'walk-so-kids-2026',
  },
  {
    title: 'Pop-up booth team',
    desc: 'Team at the Volcano Drip tent — free samples and spin-to-win.',
    url: '/events/images/event-booth-team-volcano-drip.png',
    dateIso: '2026-05-03',
    group: 'community-festival',
    size: 'portrait',
  },
  {
    title: 'Outdoor tasting — Sumatra Black',
    desc: 'Guest with Sumatra Black and a cup at a park festival.',
    url: '/events/images/event-outdoor-sumatra-guest.png',
    dateIso: '2026-05-03',
    group: 'community-festival',
    size: 'portrait',
  },
  {
    title: 'Antigua Ember — Guatemala',
    desc: 'Community event with Antigua Ember bags.',
    url: '/events/images/event-antigua-ember-two-guests.png',
    dateIso: '2026-05-03',
    group: 'community-festival',
    size: 'portrait',
  },
  {
    title: 'Coffee samples tray',
    desc: 'Serving Volcano Drip samples from the tray at a park event.',
    url: '/events/images/event-sample-tray-park.png',
    dateIso: '2026-05-03',
    group: 'community-festival',
  },
  {
    title: 'Sumatra Black at the booth',
    desc: 'Guest sharing Sumatra Black from Indonesia.',
    url: '/events/images/event-sumatra-guest-harvard-cap.png',
    dateIso: '2026-05-03',
    group: 'community-festival',
    size: 'portrait',
  },

  // —— Archive (undated) ——
  {
    title: 'Event Photo 17',
    desc: 'Recently added event photo.',
    url: '/events/images/IMG_6792.jpeg',
    group: 'archive-misc',
  },
  {
    title: 'Event Photo 18',
    desc: 'Recently added event photo.',
    url: '/events/images/IMG_6793.jpeg',
    group: 'archive-misc',
  },
  {
    title: 'Piaggio mobile cafe',
    desc: 'Branded truck — weddings and events rental.',
    url: '/events/images/event-piaggio-mobile-rental.png',
    group: 'piaggio-display',
  },
  {
    title: 'Piaggio setup — bean sacks',
    desc: 'Mobile display with Volcano Drip burlap sacks.',
    url: '/events/images/event-piaggio-burlap-sacks.png',
    group: 'piaggio-display',
  },
  {
    title: 'Event Photo 1',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-01-piaggio-display.png',
    group: 'piaggio-display',
  },
  {
    title: 'Event Photo 10',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-10-truck-event-wide.png',
    group: 'truck-event',
  },
  {
    title: 'Event Photo 11',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-11-truck-burlap-foreground.png',
    group: 'truck-event',
  },
  {
    title: 'Event Photo 16',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-16-truck-staff-dog.png',
    group: 'truck-event',
    size: 'portrait',
  },
  {
    title: 'Event Photo 9',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-09-truck-bed-close.png',
    group: 'truck-event',
  },
  {
    title: 'Event Photo 2',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-02-outdoor-booth.png',
    group: 'booth-setup',
  },
  {
    title: 'Event Photo 4',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-04-coffee-crate-display.png',
    group: 'coffee-crate-display',
  },
  {
    title: 'Event Photo 5',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-05-multi-origin-crate.png',
    group: 'coffee-crate-display',
  },
  {
    title: 'Event Photo 13',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-13-crate-lineup.png',
    group: 'coffee-crate-display',
  },
  {
    title: 'Event Photo 14',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-14-crate-full-lineup.png',
    group: 'coffee-crate-display',
  },
  {
    title: 'Event Photo 15',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-15-crate-nine-bags.png',
    group: 'coffee-crate-display',
  },
  {
    title: 'Event Photo 3',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-03-chalkboard-sign.png',
    group: 'signage-branding',
  },
  {
    title: 'Event Photo 12',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-12-chalkboard-fuel-fire.png',
    group: 'signage-branding',
  },
  {
    title: 'Event Photo 6',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-06-burlap-sack.png',
    group: 'signage-branding',
  },
  {
    title: 'Event Photo 7',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-07-logo-sticker.png',
    group: 'signage-branding',
  },
  {
    title: 'Event Photo 8',
    desc: 'Volcano Drip at community events and pop-ups.',
    url: '/events/images/event-08-basket-three-bags.png',
    group: 'product-flatlay',
  },
];

export const eventGalleryVideos = [
  {
    title: 'Asado 2026 — Inca Ascent guest',
    desc: 'Guest with Inca Ascent at the Volcano Drip booth during Asado 2026 at Assembly Park.',
    url: '/events/videos/assado-pickup-counter-2026.mp4',
    posterUrl: '/events/images/assado-pickup-counter-poster.jpg',
    dateIso: '2026-06-26',
    group: 'assado-2026-guests',
    size: 'video',
    fit: 'contain',
  },
  {
    title: 'Oakville Pop-Up — coffee meets fashion',
    desc: 'Video from the June 5, 2026 Oakville Pop-Up in downtown Oakville.',
    url: '/events/videos/oakville-pop-up-june-2026.MOV',
    dateIso: '2026-06-05',
    group: 'oakville-pop-up-2026',
    size: 'video',
  },
  {
    title: 'Event video — IMG_6809',
    desc: 'Local clip from public/events/videos.',
    url: '/events/videos/IMG_6809.MOV',
    group: 'archive-video-6809',
    size: 'video',
  },
  {
    title: 'Event video — IMG_8556',
    desc: 'Local clip from public/events/videos.',
    /** Space in filename: use %20 in the URL path (or rename the file on disk). */
    url: '/events/videos/IMG_8556%202.MP4',
    group: 'archive-video-8556',
    size: 'video',
  },

  // Example local MP4 entry:
  // {
  //   title: 'Booth Walkthrough',
  //   desc: 'Quick look at our event setup.',
  //   url: '/events/videos/booth-walkthrough.mp4',
  //   dateIso: '2026-06-05',
  //   group: 'my-event-slug',
  //   size: 'landscape',
  // },
];
