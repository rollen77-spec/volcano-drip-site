import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { getBlogPostBySlug } from '@/content/blog/loadPosts';
import { getSiteUrl } from '@/config/site';
import PageHero from '@/components/PageHero';
import { cn } from '@/lib/utils';

function formatPostDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Timeline / infographic images: larger inline preview + tap or click to open full-screen lightbox. */
function BlogEnlargeableImage({ src, alt, wideGraphic, ...rest }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const label = alt || 'Diagram';

  const standardImgClass =
    'my-8 w-full max-h-[28rem] rounded-xl border border-stone-200 bg-stone-100 object-cover shadow-sm';

  const wideInlineImgClass =
    'my-0 w-full max-h-[min(82vh,52rem)] cursor-zoom-in rounded-lg border border-stone-300 bg-stone-200 object-contain object-center shadow-sm ring-1 ring-stone-200/90 transition group-hover:border-amber-300/70 group-hover:ring-amber-200/50';

  if (!wideGraphic) {
    return (
      <img
        {...rest}
        src={src}
        alt={label}
        loading="lazy"
        decoding="async"
        className={standardImgClass}
      />
    );
  }

  return (
    <>
      <span className="not-prose relative left-1/2 z-0 my-8 block w-[min(calc(100vw-2rem),72rem)] max-w-none -translate-x-1/2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block w-full rounded-2xl border border-dashed border-stone-300/80 bg-stone-100/80 p-2 sm:p-3 text-left shadow-sm transition hover:border-amber-400/50 hover:bg-amber-50/30"
          aria-label={`Enlarge: ${label}`}
        >
          <img
            {...rest}
            src={src}
            alt={label}
            loading="lazy"
            decoding="async"
            className={wideInlineImgClass}
          />
          <span className="mt-2 block text-center text-sm font-semibold text-amber-900/90 group-hover:text-amber-800">
            Click or tap to enlarge
          </span>
        </button>
      </span>

      {open ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded diagram"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25"
            aria-label="Close enlarged image"
          >
            <X className="h-6 w-6" strokeWidth={2.5} aria-hidden />
          </button>
          <img
            src={src}
            alt={label}
            className="max-h-[min(94vh,96vw)] max-w-[min(96vw,120rem)] w-auto object-contain"
            onClick={e => e.stopPropagation()}
          />
          <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400">
            Click outside or press Esc to close
          </p>
        </div>
      ) : null}
    </>
  );
}

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : null;
  const siteUrl = getSiteUrl();
  const canonical = siteUrl ? `${siteUrl}/blog/${slug}` : '';
  const jsonLd =
    post && siteUrl
      ? JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt || post.title,
          datePublished: post.date || undefined,
          ...(post.ogImage || post.heroImage
            ? { image: `${siteUrl}${(post.ogImage || post.heroImage).trim()}` }
            : {}),
          author: { '@type': 'Organization', name: 'Volcano Drip' },
          publisher: { '@type': 'Organization', name: 'Volcano Drip' },
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        })
      : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-stone-50 py-16 px-4 md:py-24">
        <Helmet>
          <title>Post not found | Volcano Drip</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-black text-stone-900 mb-4 font-playfair">Post not found</h1>
          <p className="text-stone-600 mb-8">That article may have moved or the link is incorrect.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const defaultHeroImage = '/blog/blog-header-hero.png';
  const heroImageSrc = post.heroImage?.trim() || defaultHeroImage;
  const useBannerHero = Boolean(post.heroImage?.trim());

  return (
    <div className="min-h-screen bg-stone-50">
      <Helmet>
        <title>{post.title} | Volcano Drip</title>
        <meta name="description" content={post.excerpt || post.title} />
        {canonical ? <link rel="canonical" href={canonical} /> : null}
        {(post.ogImage || post.heroImage)?.trim() && siteUrl ? (
          <meta
            property="og:image"
            content={`${siteUrl}${(post.ogImage || post.heroImage).trim()}`}
          />
        ) : null}
        {jsonLd ? <script type="application/ld+json">{jsonLd}</script> : null}
      </Helmet>

      <PageHero
        size={useBannerHero ? 'custom' : 'compact'}
        sectionClassName={cn(
          useBannerHero &&
            'min-h-0 w-full py-8 md:py-10 h-[clamp(14rem,34vw,26rem)] md:h-[clamp(16rem,30vw,30rem)]',
        )}
        kicker={post.date ? formatPostDate(post.date) : 'Blog'}
        title={post.title}
        imageSrc={heroImageSrc}
        imageAlt={post.heroImageAlt || ''}
        imageClassName="h-full w-full object-cover object-center"
        imageWrapperExtraClassName={useBannerHero ? 'opacity-95' : undefined}
        overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/60"
        titleClassName="text-4xl normal-case tracking-tight md:text-6xl md:leading-[1.05]"
        kickerClassName="normal-case tracking-wider text-amber-400/95"
      />

      <article className="mx-auto max-w-3xl overflow-x-hidden px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            All posts
          </Link>

          {post.youtubeId ? (
            <div className="mb-10 w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-950 shadow-sm">
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${post.youtubeId}`}
                  title={`Video — ${post.title}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          ) : null}

          <div className="prose prose-stone prose-lg max-w-none prose-headings:font-playfair prose-headings:text-stone-900 prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-900">
            <ReactMarkdown
              components={{
                a: ({ href, children, ...props }) => {
                  if (href?.startsWith('/')) {
                    return (
                      <Link to={href} {...props}>
                        {children}
                      </Link>
                    );
                  }
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                      {children}
                    </a>
                  );
                },
                img: ({ src, alt, ...props }) => {
                  const a = String(alt || '');
                  const s = String(src || '');
                  const wideGraphic = /infographic|timeline/i.test(a) || /infographic|timeline/i.test(s);
                  return (
                    <BlogEnlargeableImage src={src} alt={alt} wideGraphic={wideGraphic} {...props} />
                  );
                },
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPostPage;
