'use client';

type BlogPaginationProps = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  total?: number;
  className?: string;
};

export default function BlogPagination({
  page,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  total,
  className = '',
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div
      className={`mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row ${className}`}
    >
      <p className="text-[14px] font-medium text-[#667788]">
        Page {page} of {totalPages}
        {typeof total === 'number' ? ` · ${total} blogs` : ''}
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={!hasPrevPage}
          onClick={() => onPageChange(page - 1)}
          className="rounded-full border border-[#58b7ea] px-5 py-2 text-[14px] font-bold text-[#2a9cda] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          className="rounded-full bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] px-5 py-2 text-[14px] font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
