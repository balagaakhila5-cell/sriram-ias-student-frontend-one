'use client';

import { TOPPER_YEARS } from '@/features/ourToppers/data/yearWiseToppers';

type AllYearsGridProps = {
  onYearPick?: (year: number) => void;
};

export default function AllYearsGrid({ onYearPick }: AllYearsGridProps) {
  return (
    <div className="mx-auto grid w-full max-w-[980px] grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 lg:px-0">
      {TOPPER_YEARS.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => onYearPick?.(year)}
          className="rounded-[14px] border border-white/80 bg-white/90 px-4 py-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_32px_rgba(15,23,42,0.12)]"
        >
          <span className="block text-[22px] font-black text-[#178fd2] sm:text-[26px]">
            {year}
          </span>
          <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wide text-[#4a6272] sm:text-[12px]">
            View toppers
          </span>
        </button>
      ))}
    </div>
  );
}
