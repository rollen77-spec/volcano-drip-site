import { parsePostFile } from './parsePost';

const rawModules = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function pathToSlug(importPath) {
  const m = importPath.match(/\/([^/]+)\.md$/);
  return m ? m[1] : '';
}

export function getAllBlogPosts() {
  const posts = Object.entries(rawModules).map(([path, raw]) => {
    const slug = pathToSlug(path);
    return parsePostFile(raw, slug);
  });
  return posts.sort((a, b) => {
    const da = Date.parse(a.date) || 0;
    const db = Date.parse(b.date) || 0;
    return db - da;
  });
}

export function getBlogPostBySlug(slug) {
  return getAllBlogPosts().find(p => p.slug === slug) || null;
}
