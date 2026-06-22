'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type ToppersYearFilter = number | 'all';

type ToppersYearFilterDropdownProps = {
  years: number[];
  selectedYear: ToppersYearFilter;
  onYearChange: (year: ToppersYearFilter) => void;
  className?: string;
};

export default function ToppersYearFilterDropdown({
  years,
  selectedYear,
  onYearChange,
  className = '',
}: ToppersYearFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (year: ToppersYearFilter) => {
    onYearChange(year);
    setIsOpen(false);
  };

  const buttonLabel =
    selectedYear === 'all' ? 'All years' : String(selectedYear);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#178fd2]/30 bg-white px-4 py-2 text-[11px] font-bold text-[#178fd2] shadow-[0_8px_24px_rgba(38,143,208,0.12)] transition-all hover:bg-[#e4f5ff] sm:px-5 sm:py-2.5 sm:text-[12px] md:text-[14px]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Filter toppers by year"
      >
        {buttonLabel}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Filter toppers by year"
          className="absolute right-0 z-30 mt-2 max-h-[320px] min-w-[140px] overflow-y-auto rounded-[14px] border border-[#178fd2]/20 bg-white py-2 shadow-[0_12px_32px_rgba(29,119,176,0.18)]"
        >
          <li role="option">
            <button
              type="button"
              onClick={() => handleSelect('all')}
              className={`block w-full px-5 py-2.5 text-left text-[12px] font-semibold transition-colors hover:bg-[#e4f5ff] hover:text-[#178fd2] sm:text-[13px] md:text-[14px] ${
                selectedYear === 'all'
                  ? 'bg-[#e4f5ff] text-[#178fd2]'
                  : 'text-[#213b4c]'
              }`}
            >
              All years
            </button>
          </li>
          {years.map((year) => (
            <li key={year} role="option">
              <button
                type="button"
                onClick={() => handleSelect(year)}
                className={`block w-full px-5 py-2.5 text-left text-[12px] font-semibold transition-colors hover:bg-[#e4f5ff] hover:text-[#178fd2] sm:text-[13px] md:text-[14px] ${
                  selectedYear === year
                    ? 'bg-[#e4f5ff] text-[#178fd2]'
                    : 'text-[#213b4c]'
                }`}
              >
                {year}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
