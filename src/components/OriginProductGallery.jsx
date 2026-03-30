import React from 'react';
import { motion } from 'framer-motion';

/**
 * Four equal slots in one row (2×2 on small screens) — avoids masonry whitespace.
 * Expects `images` in order: front, side, three-quarter, back.
 */
const OriginProductGallery = ({ images }) => {
  if (!images || images.length === 0) return null;
  const slots = images.slice(0, 4);

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4 text-stone-900 tracking-tight">Product views</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {slots.map((image, index) => (
          <motion.div
            key={`${image.src}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative aspect-[3/4] overflow-hidden rounded-lg border border-stone-200 bg-stone-100 shadow-sm group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-contain object-center p-2 sm:p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OriginProductGallery;
