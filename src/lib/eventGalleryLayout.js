/** @typedef {'video' | 'image'} GalleryMediaType */

/**
 * @typedef {Object} GalleryMediaItem
 * @property {number} id
 * @property {GalleryMediaType} type
 * @property {string} title
 * @property {string} desc
 * @property {string} url
 * @property {string} [dateIso] - YYYY-MM-DD; newest sorts first
 * @property {string} [group] - spreads visually similar shots in the grid
 * @property {string} [size]
 * @property {string} [posterUrl]
 * @property {'contain' | 'cover'} [fit] - grid tile fit; default contain for photos
 * @property {string} [objectPosition] - CSS object-position for grid tiles
 */

const GALLERY_SIZE_PATTERN = ['portrait', 'wide', 'tall', 'square', 'landscape'];

/**
 * Merge images + videos, attach ids/sizes, sort newest-first.
 * Undated items sink to the bottom (stable among themselves).
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
    posterUrl: item.posterUrl ?? posterFallbacks[index % posterFallbacks.length],
    size: item.size || GALLERY_SIZE_PATTERN[index % GALLERY_SIZE_PATTERN.length],
    fit: item.fit ?? (/** @type {const} */ ('contain')),
    objectPosition: item.objectPosition,
  }));

  const imageItems = images.map((item, index) => ({
    id: videos.length + index + 1,
    type: /** @type {const} */ ('image'),
    title: item.title,
    desc: item.desc,
    url: item.url,
    dateIso: item.dateIso,
    group: item.group,
    size: item.size || GALLERY_SIZE_PATTERN[index % GALLERY_SIZE_PATTERN.length],
    fit: item.fit ?? 'contain',
  }));

  return [...videoItems, ...imageItems].sort((a, b) => {
    const dateCmp = dated(b.dateIso).localeCompare(dated(a.dateIso));
    if (dateCmp !== 0) return dateCmp;
    // Same day: videos before images so clips appear with that event's photos
    if (a.type !== b.type) return a.type === 'video' ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Re-order so the same `group` does not appear:
 * - back-to-back in the list (stacked in a column), or
 * - in the same masonry row (side-by-side on sm/lg breakpoints).
 */
export function arrangeGalleryMedia(items, columns = 3) {
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

function sameGroupConflict(a, b) {
  if (!a?.group || !b?.group || a.group !== b.group) return false;
  // A video and a photo from the same event can sit side-by-side.
  if (a.type !== b.type) return false;
  return true;
}

function canPlace(item, result, columns, relaxed) {
  if (!item.group || result.length === 0) return true;

  const prev = result[result.length - 1];
  if (sameGroupConflict(item, prev)) return false;

  if (relaxed) return true;

  const rowStart = Math.floor(result.length / columns) * columns;
  const rowPeers = result.slice(rowStart);
  if (rowPeers.some((peer) => sameGroupConflict(item, peer))) return false;

  if (columns >= 3 && result.length % columns === columns - 1) {
    const rowAnchor = result[rowStart];
    if (sameGroupConflict(item, rowAnchor)) return false;
  }

  return true;
}
