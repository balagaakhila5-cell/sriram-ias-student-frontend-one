'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type ToppersGalleryPaginationProps = {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

function getVisiblePages(current: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  if (current > 3) {
    pages.push('ellipsis');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(totalPages - 1, current + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (current < totalPages - 2) {
    pages.push('ellipsis');
  }

  pages.push(totalPages);
  return pages;
}

export default function ToppersGalleryPagination({
  page,
  total,
  pageSize,
  onPageChange,
}: ToppersGalleryPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (total === 0) {
    return null;
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="mt-10 flex w-full flex-col items-center gap-4 px-4 sm:px-6">
      <p className="text-center text-[13px] font-medium text-[#1f3442] sm:text-[14px]">
        Showing {start}-{end} of {total} toppers
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#178fd2]/25 bg-white text-[#178fd2] transition-colors hover:bg-[#e4f5ff] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {visiblePages.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-[14px] font-semibold text-[#1f3442]/70"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-label={`Go to page ${item}`}
              aria-current={item === page ? 'page' : undefined}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-[13px] font-bold transition-colors sm:text-[14px] ${
                item === page
                  ? 'bg-[#178fd2] text-white shadow-md'
                  : 'border border-[#178fd2]/25 bg-white text-[#178fd2] hover:bg-[#e4f5ff]'
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#178fd2]/25 bg-white text-[#178fd2] transition-colors hover:bg-[#e4f5ff] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
