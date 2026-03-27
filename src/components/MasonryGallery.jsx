import React from 'react';
import { motion } from 'framer-motion';

const MasonryGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  // Define grid spans for a masonry-like effect
  // These are tailwind classes that will be applied based on the index
  const getSpanClasses = (index) => {
    const pattern = index % 6;
    switch (pattern) {
      case 0:
        return "col-span-1 row-span-2 md:col-span-2 md:row-span-2"; // Large feature
      case 1:
      case 2:
        return "col-span-1 row-span-1"; // Standard square
      case 3:
        return "col-span-1 row-span-2"; // Tall vertical
      case 4:
        return "col-span-1 row-span-1 md:col-span-2 md:row-span-1"; // Wide horizontal
      case 5:
        return "col-span-1 row-span-1"; // Standard square
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="w-full mt-12 mb-8">
      <h3 className="text-2xl font-bold mb-6 text-stone-900">Gallery</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-lg shadow-md group bg-stone-100 ${getSpanClasses(index)}`}
          >
            <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGallery;