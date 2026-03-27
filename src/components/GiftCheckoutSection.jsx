import React from 'react';
import GiftToggle from './GiftToggle';

const GiftCheckoutSection = ({ onGiftChange }) => {
  return (
    <div className="bg-stone-800/40 p-4 rounded-lg border border-stone-800/60 mt-6 mb-6">
      <div className="mb-2">
        <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          Gift Order (Optional)
        </h4>
        <p className="text-xs text-stone-400">Send this entire order as a gift to someone special. We'll handle the shipping and personal note.</p>
      </div>
      
      <GiftToggle 
        onGiftChange={onGiftChange} 
        isDarkTheme={true} 
      />
    </div>
  );
};

export default GiftCheckoutSection;