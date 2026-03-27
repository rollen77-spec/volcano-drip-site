import React from 'react';
import { motion } from 'framer-motion';

const HeroImage = ({ 
  src = "https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/de6e30f58e9e5e6cfdf96365ee06182d.png", 
  alt = "Majestic volcanic landscape featuring warm orange and yellow tones", 
  className = '' 
}) => {
  return (
    <motion.img
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 10, ease: "easeOut" }}
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
};

export default HeroImage;