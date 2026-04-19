import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug } from '@/content/blog/loadPosts';
import { getSiteUrl } from '@/config/site';

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

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 md:py-24">
      <Helmet>
        <title>{post.title} | Volcano Drip</title>
        <meta name="description" content={post.excerpt || post.title} />
        {canonical ? <link rel="canonical" href={canonical} /> : null}
        {jsonLd ? <script type="application/ld+json">{jsonLd}</script> : null}
      </Helmet>

      <article className="max-w-3xl mx-auto">
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

          {post.date ? (
            <time
              dateTime={post.date}
              className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3"
            >
              {formatPostDate(post.date)}
            </time>
          ) : null}

          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-8 font-playfair leading-tight">
            {post.title}
          </h1>

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
