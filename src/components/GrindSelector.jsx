import React from 'react';

const GRIND_OPTIONS = [
  "Whole Bean (not ground)",
  "French Press Grind",
  "Percolator Grind",
  "Flat Bottom Filter Drip Coffee Grind",
  "Aeropress Grind",
  "Cone Filter Drip Coffee Grind",
  "Stone Top Espresso / Moka Pot",
  "Espresso Machine",
  "Turkish Grind"
];

const GrindSelector = ({ selectedGrind, onGrindChange, className = "mb-6", showLabel = true, idPrefix = "product" }) => {
  return (
    <div className={className}>
      {showLabel && (
        <label htmlFor={`${idPrefix}-grind-select`} className="block text-sm sm:text-base font-bold text-stone-900 mb-2 uppercase tracking-wide">
          Grind Preference
        </label>
      )}
      <div className="relative">
        <select
          id={`${idPrefix}-grind-select`}
          value={selectedGrind}
          onChange={(e) => onGrindChange(e.target.value)}
          className="w-full min-h-[48px] text-sm sm:text-base appearance-none bg-stone-50 border border-stone-200 hover:border-stone-300 text-stone-700 py-3 px-4 pr-10 rounded-sm leading-tight focus:outline-none focus:border-stone-900 focus:ring-0 transition-colors cursor-pointer touch-manipulation"
        >
          {GRIND_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GrindSelector;