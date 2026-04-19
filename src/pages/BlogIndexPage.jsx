import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/content/blog/loadPosts';

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

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 md:py-24">
      <Helmet>
        <title>Blog | Volcano Drip</title>
        <meta
          name="description"
          content="Roasting notes, brewing tips, and stories from Volcano Drip Coffee—small-batch single-origin coffee from volcanic soil."
        />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center justify-center p-4 bg-amber-100 rounded-full mb-6 shadow-sm">
            <BookOpen className="w-8 h-8 text-amber-600" aria-hidden />
          </div>
          <p className="text-amber-700 font-bold tracking-widest text-xs uppercase mb-3">From the roastery</p>
          <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight mb-4 font-playfair">
            Blog
          </h1>
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
  );
};

export default BlogIndexPage;
