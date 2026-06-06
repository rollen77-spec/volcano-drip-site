/** @typedef {'video' | 'image'} GalleryMediaType */

/**
 * @typedef {Object} GalleryMediaItem
 * @property {number} id
 * @property {GalleryMediaType} type
 * @property {string} title
 * @property {string} desc
 * @property {string} url
 * @property {string} [dateIso]
 * @property {string} [group]
 * @property {string} [sectionId]
 * @property {string} [posterUrl]
 */

/** Gallery section headers — newest first. */
export const GALLERY_SECTIONS = [
  {
    id: 'oakville-pop-up-2026',
    label: 'June 5, 2026 · Oakville Pop-Up',
    subtitle: 'Where coffee meets fashion',
  },
  {
    id: 'outdoor-movie-night-2026',
    label: 'June 5, 2026 · Outdoor Movie Night',
    subtitle: 'Mississauga, Ontario',
  },
  {
    id: 'walk-so-kids-2026',
    label: 'May 3, 2026 · Walk So Kids Can Talk',
    subtitle: 'Toronto, Ontario',
  },
  {
    id: 'community-festival-2026',
    label: 'May 2026 · Community festivals',
    subtitle: 'Pop-ups and partnerships across the GTA',
  },
  {
    id: 'archive',
    label: 'From past events',
    subtitle: 'Highlights from earlier pop-ups and festivals',
  },
];

function resolveSectionId(item) {
  if (item.sectionId) return item.sectionId;
  if (item.group === 'outdoor-movie-night-2026') return 'outdoor-movie-night-2026';
  if (item.group === 'walk-so-kids-2026') return 'walk-so-kids-2026';
  if (item.group === 'community-festival') return 'community-festival-2026';
  if (item.group?.startsWith('oakville')) return 'oakville-pop-up-2026';
  return 'archive';
}

/**
 * Merge images + videos, attach ids, sort newest-first.
 */
export function buildGalleryMediaItems(images, videos, posterFallbacks = []) {
  const dated = (iso) => iso ?? '';

  const videoItems = videos.map((item, index) => ({
    id: index + 1,
    type: /** @type {const} */ ('video'),
    title: item.title,
    desc: item.desc,
    url: item.url,
    dateIso: item.dateIso,
    group: item.group,
    sectionId: resolveSectionId(item),
    posterUrl: item.posterUrl ?? posterFallbacks[index % posterFallbacks.length],
  }));

  const imageItems = images.map((item, index) => ({
    id: videos.length + index + 1,
    type: /** @type {const} */ ('image'),
    title: item.title,
    desc: item.desc,
    url: item.url,
    dateIso: item.dateIso,
    group: item.group,
    sectionId: resolveSectionId(item),
  }));

  return [...videoItems, ...imageItems].sort((a, b) => {
    const dateCmp = dated(b.dateIso).localeCompare(dated(a.dateIso));
    if (dateCmp !== 0) return dateCmp;
    if (a.type !== b.type) return a.type === 'video' ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Re-order within a section so similar `group` shots are not adjacent.
 */
export function arrangeGalleryMedia(items, columns = 4) {
  const pool = [...items];
  const result = [];

  const pickIndex = (relaxed) => {
    for (let i = 0; i < pool.length; i++) {
      if (canPlace(pool[i], result, columns, relaxed)) return i;
    }
    return -1;
  };

  while (pool.length > 0) {
    let idx = pickIndex(false);
    if (idx === -1) idx = pickIndex(true);
    if (idx === -1) idx = 0;
    result.push(pool.splice(idx, 1)[0]);
  }

  return result;
}

function canPlace(item, result, columns, relaxed) {
  if (!item.group || result.length === 0) return true;

  const prev = result[result.length - 1];
  if (prev?.group === item.group) return false;

  if (relaxed) return true;

  const rowStart = Math.floor(result.length / columns) * columns;
  const rowPeers = result.slice(rowStart);
  if (rowPeers.some((peer) => peer.group === item.group)) return false;

  if (columns >= 3 && result.length % columns === columns - 1) {
    const rowAnchor = result[rowStart];
    if (rowAnchor?.group === item.group) return false;
  }

  return true;
}

/** Bucket media into ordered sections for the grouped gallery UI. */
export function groupGalleryMediaBySection(items, sections = GALLERY_SECTIONS) {
  const buckets = new Map(sections.map((s) => [s.id, []]));

  for (const item of items) {
    const sectionId = resolveSectionId(item);
    if (!buckets.has(sectionId)) buckets.set(sectionId, []);
    buckets.get(sectionId).push(item);
  }

  return sections
    .filter((s) => (buckets.get(s.id)?.length ?? 0) > 0)
    .map((s) => ({
      ...s,
      items: arrangeGalleryMedia(buckets.get(s.id) ?? [], 4),
    }));
}
