'use client';

import { useNavigate } from 'react-router-dom';
import YearWiseDropdown, {
  type YearWiseSelection,
} from '@/features/ourToppers/components/YearWiseDropdown';

export type ToppersGalleryTab = 'Toppers' | 'Testimonials';

type ToppersGalleryTabsProps = {
  activeTab: ToppersGalleryTab;
  onTabChange: (tab: ToppersGalleryTab) => void;
  selectedYear?: YearWiseSelection | null;
  onYearSelect?: (selection: YearWiseSelection) => void;
  showBackToGallery?: boolean;
};

export default function ToppersGalleryTabs({
  activeTab,
  onTabChange,
  selectedYear = null,
  onYearSelect,
  showBackToGallery = false,
}: ToppersGalleryTabsProps) {
  const navigate = useNavigate();

  const handleYearSelect = (selection: YearWiseSelection) => {
    if (onYearSelect) {
      onYearSelect(selection);
      return;
    }

    navigate(`/our-toppers-gallery/year-wise/${selection}`);
  };

  return (
    <div className="mx-auto mt-1 flex w-full max-w-[520px] flex-wrap items-center justify-center gap-2 md:mx-0 md:w-fit md:max-w-none">
      {selectedYear === null && (
        <div className="flex items-center gap-1 rounded-full bg-white/85 p-1.5 shadow-[0_8px_24px_rgba(38,143,208,0.16)] backdrop-blur">
          {(['Toppers', 'Testimonials'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`rounded-full px-4 py-2 text-[11px] font-bold transition-all sm:px-5 sm:py-2.5 sm:text-[12px] md:text-[14px] ${
                activeTab === tab
                  ? 'bg-[#178fd2] text-white shadow-md'
                  : 'text-[#213b4c] hover:bg-[#e4f5ff]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {selectedYear !== null && (
        <div className="flex items-center gap-1 rounded-full bg-white/85 p-1.5 shadow-[0_8px_24px_rgba(38,143,208,0.16)] backdrop-blur">
          <button
            type="button"
            onClick={() => onTabChange('Toppers')}
            className="rounded-full bg-[#178fd2] px-4 py-2 text-[11px] font-bold text-white shadow-md sm:px-5 sm:py-2.5 sm:text-[12px] md:text-[14px]"
          >
            Toppers
          </button>
          <button
            type="button"
            onClick={() => onTabChange('Testimonials')}
            className={`rounded-full px-4 py-2 text-[11px] font-bold transition-all sm:px-5 sm:py-2.5 sm:text-[12px] md:text-[14px] ${
              activeTab === 'Testimonials'
                ? 'bg-[#178fd2] text-white shadow-md'
                : 'text-[#213b4c] hover:bg-[#e4f5ff]'
            }`}
          >
            Testimonials
          </button>
        </div>
      )}

      <YearWiseDropdown
        selectedYear={selectedYear}
        onYearSelect={handleYearSelect}
      />

      {showBackToGallery && (
        <button
          type="button"
          onClick={() => navigate('/our-toppers-gallery')}
          className="rounded-full border border-[#178fd2]/30 bg-white px-4 py-2 text-[11px] font-bold text-[#178fd2] shadow-[0_8px_24px_rgba(38,143,208,0.12)] transition-all hover:bg-[#e4f5ff] sm:px-5 sm:py-2.5 sm:text-[12px] md:text-[14px]"
        >
          Toppers Gallery
        </button>
      )}
    </div>
  );
}
