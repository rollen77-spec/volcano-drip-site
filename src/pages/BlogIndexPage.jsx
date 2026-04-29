import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/content/blog/loadPosts';
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

const BlogIndexPage = () => {
  const posts = getAllBlogPosts();
  const siteUrl = getSiteUrl();
  const headerImageAbsolute = siteUrl ? `${siteUrl}/blog/blog-header-hero.png` : '';

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Helmet>
        <title>Blog | Volcano Drip</title>
        <meta
          name="description"
          content="Roasting notes, brewing tips, and stories from Volcano Drip Coffee—small-batch single-origin coffee from volcanic soil."
        />
        {headerImageAbsolute ? (
          <meta property="og:image" content={headerImageAbsolute} />
        ) : null}
      </Helmet>

      <header className="relative w-full shrink-0 border-b border-stone-200 bg-stone-900">
        <h1 className="sr-only">Blog</h1>
        <img
          src="/blog/blog-header-hero.png"
          alt=""
          className="h-auto w-full max-h-[min(30rem,55vh)] object-cover object-top md:max-h-[min(34rem,60vh)]"
          width={1600}
          height={600}
          fetchPriority="high"
          decoding="async"
        />
      </header>

      <div className="flex-1 px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center mb-12"
          >
            <p className="text-amber-700 font-bold tracking-widest text-xs uppercase mb-3">From the roastery</p>
            <p className="text-stone-600 text-lg leading-relaxed max-w-xl mx-auto">
              Updates on sourcing, roasting, and brewing—plus practical tips for your daily cup.
            </p>
          </motion.div>

          <ul className="space-y-5">
            {posts.map((post, index) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-white rounded-xl border border-stone-200 p-6 md:p-8 shadow-sm hover:border-amber-400/60 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6">
                    <div>
                      {post.date ? (
                        <time
                          dateTime={post.date}
                          className="text-xs font-semibold uppercase tracking-wider text-stone-400"
                        >
                          {formatPostDate(post.date)}
                        </time>
                      ) : null}
                      <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2 group-hover:text-amber-700 transition-colors font-playfair">
                        {post.title}
                      </h2>
                      {post.excerpt ? (
                        <p className="text-stone-600 mt-3 leading-relaxed">{post.excerpt}</p>
                      ) : null}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 shrink-0 mt-2 sm:mt-8">
                      Read
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogIndexPage;
