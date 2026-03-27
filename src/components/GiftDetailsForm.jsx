import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const OCCASIONS = {
  "Happy Birthday!": "Wishing you a fantastic birthday filled with great coffee and joy!",
  "Thinking of You!": "Just wanted to send some good vibes and great coffee your way.",
  "Happy Anniversary!": "Cheers to another year! Enjoy this special brew together.",
  "Merry Christmas!": "Warm wishes and warm mugs for a very Merry Christmas!",
  "Wedding Gift!": "Congratulations on your special day! Here's to love and coffee.",
  "Happy Valentine's Day!": "Sending you love and the perfect cup of coffee.",
  "To Show Appreciation and Gratitude!": "Thank you for everything. Please enjoy this token of appreciation.",
  "Special Gift for a Special Someone": "A special treat for someone truly special.",
  "To the Coffee Lover in My Life!": "Fueling your passion for the perfect cup!",
  "Other": ""
};

const GiftDetailsForm = ({ giftData, onChange, isDarkTheme = false }) => {
  const [localMessage, setLocalMessage] = useState(giftData.personalMessage || "");
  const [charCount, setCharCount] = useState((giftData.personalMessage || "").length);

  const handleChange = (field, value) => {
    const updatedData = { ...giftData, [field]: value };
    
    if (field === 'occasion' && value !== 'Other' && OCCASIONS[value]) {
      updatedData.personalMessage = OCCASIONS[value];
      setLocalMessage(OCCASIONS[value]);
      setCharCount(OCCASIONS[value].length);
    } else if (field === 'personalMessage') {
      setLocalMessage(value);
      setCharCount(value.length);
    }
    
    onChange(updatedData);
  };

  const themeClasses = {
    label: `text-sm sm:text-base font-medium ${isDarkTheme ? "text-stone-300" : "text-stone-700"}`,
    input: `min-h-[48px] text-sm sm:text-base w-full flex items-center transition-colors ${isDarkTheme 
      ? "bg-stone-800 border-stone-700 text-white placeholder:text-stone-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
      : "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"}`,
    hint: `text-xs sm:text-sm ${isDarkTheme ? "text-stone-400" : "text-stone-500"}`,
  };

  return (
    <div className="space-y-5 sm:space-y-6 p-4 sm:p-6 rounded-md border border-amber-500/30 bg-amber-500/5 mt-4">
      <h4 className={`font-bold text-sm sm:text-base uppercase tracking-wider mb-2 ${isDarkTheme ? 'text-amber-500' : 'text-amber-600'}`}>
        Gift Details
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="recipientName" className={themeClasses.label}>Recipient Full Name <span className="text-amber-500">*</span></Label>
          <Input 
            id="recipientName" 
            placeholder="Jane Doe" 
            value={giftData.recipientName || ''} 
            onChange={(e) => handleChange('recipientName', e.target.value)}
            className={themeClasses.input}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipientEmail" className={themeClasses.label}>Recipient Email <span className="text-amber-500">*</span></Label>
          <Input 
            id="recipientEmail" 
            type="email" 
            placeholder="jane@example.com" 
            value={giftData.recipientEmail || ''} 
            onChange={(e) => handleChange('recipientEmail', e.target.value)}
            className={themeClasses.input}
            required
          />
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5 pt-4 border-t border-amber-500/20">
        <h5 className={`font-bold text-xs sm:text-sm uppercase tracking-wider ${isDarkTheme ? 'text-stone-400' : 'text-stone-600'}`}>
          Shipping Address (Where to send the gift)
        </h5>
        
        <div className="space-y-2">
          <Label htmlFor="street" className={themeClasses.label}>Street Address <span className="text-amber-500">*</span></Label>
          <Input 
            id="street" 
            placeholder="123 Coffee Lane" 
            value={giftData.street || ''} 
            onChange={(e) => handleChange('street', e.target.value)}
            className={themeClasses.input}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="city" className={themeClasses.label}>City <span className="text-amber-500">*</span></Label>
            <Input 
              id="city" 
              placeholder="Seattle" 
              value={giftData.city || ''} 
              onChange={(e) => handleChange('city', e.target.value)}
              className={themeClasses.input}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className={themeClasses.label}>State / Province <span className="text-amber-500">*</span></Label>
            <Input 
              id="state" 
              placeholder="WA" 
              value={giftData.state || ''} 
              onChange={(e) => handleChange('state', e.target.value)}
              className={themeClasses.input}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="zip" className={themeClasses.label}>Postal Code <span className="text-amber-500">*</span></Label>
            <Input 
              id="zip" 
              placeholder="98101" 
              value={giftData.zip || ''} 
              onChange={(e) => handleChange('zip', e.target.value)}
              className={themeClasses.input}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country" className={themeClasses.label}>Country <span className="text-amber-500">*</span></Label>
            <Input 
              id="country" 
              placeholder="United States" 
              value={giftData.country || ''} 
              onChange={(e) => handleChange('country', e.target.value)}
              className={themeClasses.input}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5 pt-4 border-t border-amber-500/20">
         <h5 className={`font-bold text-xs sm:text-sm uppercase tracking-wider ${isDarkTheme ? 'text-stone-400' : 'text-stone-600'}`}>
          Gift Message
        </h5>
        
        <div className="space-y-2">
          <Label htmlFor="occasion" className={themeClasses.label}>Occasion</Label>
          <select
            id="occasion"
            value={giftData.occasion || ''}
            onChange={(e) => handleChange('occasion', e.target.value)}
            className={`flex min-h-[48px] w-full rounded-md border px-3 py-2 text-sm sm:text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation ${themeClasses.input}`}
          >
            <option value="" disabled>Select an occasion...</option>
            {Object.keys(OCCASIONS).map(occ => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2 relative pb-6">
          <Label htmlFor="personalMessage" className={themeClasses.label}>Personal Message</Label>
          <Textarea 
            id="personalMessage" 
            placeholder="Type your custom message here..." 
            value={localMessage}
            onChange={(e) => handleChange('personalMessage', e.target.value)}
            maxLength={250}
            className={`min-h-[120px] resize-y ${themeClasses.input}`}
          />
          <div className={`absolute bottom-0 right-1 pt-1 ${themeClasses.hint}`}>
            {charCount}/250
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftDetailsForm;