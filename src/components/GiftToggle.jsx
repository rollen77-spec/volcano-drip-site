import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import GiftDetailsForm from './GiftDetailsForm';

const GiftToggle = ({ onGiftChange, isDarkTheme = false }) => {
  const [isGift, setIsGift] = useState(false);
  const [giftData, setGiftData] = useState({
    recipientName: '',
    recipientEmail: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    occasion: '',
    personalMessage: ''
  });

  const handleToggle = (checked) => {
    setIsGift(checked);
    onGiftChange({ isGift: checked, details: checked ? giftData : null });
  };

  const handleDataChange = (newData) => {
    setGiftData(newData);
    onGiftChange({ isGift, details: newData });
  };

  return (
    <div className="w-full">
      <div 
        className={`flex items-center space-x-3 p-3 sm:p-4 md:p-6 min-h-[48px] sm:min-h-[56px] rounded-md border transition-colors cursor-pointer touch-manipulation ${
          isGift 
            ? 'border-amber-500 bg-amber-500/5' 
            : isDarkTheme 
              ? 'border-stone-800 hover:border-stone-700' 
              : 'border-stone-200 hover:border-stone-300'
        }`}
        onClick={() => handleToggle(!isGift)}
      >
        <Checkbox 
          id="gift-toggle" 
          checked={isGift} 
          onCheckedChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
          className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 h-5 w-5 sm:h-6 sm:w-6"
        />
        <label
          htmlFor="gift-toggle"
          className={`text-sm sm:text-base md:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer ${
            isDarkTheme ? 'text-stone-200' : 'text-stone-800'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          Gift this purchase
        </label>
      </div>

      <AnimatePresence>
        {isGift && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <GiftDetailsForm 
              giftData={giftData} 
              onChange={handleDataChange} 
              isDarkTheme={isDarkTheme}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftToggle;