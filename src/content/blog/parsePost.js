/**
 * Minimal frontmatter parser for blog `.md` files.
 * Expected shape:
 * ---
 * title: My title
 * date: 2026-02-10
 * excerpt: One line summary
 * ---
 */

export function parsePostFile(raw, slug) {
  const text = String(raw).replace(/^\uFEFF/, '').trim();
  if (!text.startsWith('---')) {
    return {
      slug,
      title: humanizeSlug(slug),
      date: '',
      excerpt: '',
      body: text,
    };
  }

  const closeIdx = text.indexOf('\n---', 3);
  if (closeIdx === -1) {
    return {
      slug,
      title: humanizeSlug(slug),
      date: '',
      excerpt: '',
      body: text,
    };
  }

  const fmBlock = text.slice(3, closeIdx).trim();
  const body = text.slice(closeIdx + 4).trim();
  const meta = {};
  for (const line of fmBlock.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    meta[m[1]] = val;
  }

  return {
    slug,
    title: meta.title || humanizeSlug(slug),
    date: meta.date || '',
    excerpt: meta.excerpt || '',
    body,
  };
}

function humanizeSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
