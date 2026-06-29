'use client';

import type { BlogCategory } from '@/features/blogs/types/blogCategory';

type BlogCategorySelectorProps = {
  categories: BlogCategory[];
  selectedCategory: BlogCategory | null;
  onSelect: (category: BlogCategory) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  className?: string;
};

function CategorySkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-[46px] min-w-[130px] animate-pulse rounded-[8px] bg-slate-200"
        />
      ))}
    </div>
  );
}

export default function BlogCategorySelector({
  categories,
  selectedCategory,
  onSelect,
  isLoading = false,
  isError = false,
  errorMessage,
  className = '',
}: BlogCategorySelectorProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <CategorySkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700 ${className}`}
      >
        {errorMessage || 'Unable to load blog categories. Please try again.'}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div
        className={`rounded-[8px] border border-dashed border-[#b9d6ea] bg-[#f7fbff] px-4 py-3 text-center text-sm font-semibold text-[#246392] ${className}`}
      >
        No Categories Available
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {categories.map((category) => {
        const isActive = selectedCategory?.value === category.value;

        return (
          <button
            key={category.value}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={`h-[46px] min-w-[130px] rounded-[8px] px-4 text-[18px] font-semibold shadow-md transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-[#37AEEB] to-[#032C42] text-white'
                : 'bg-white text-black hover:bg-[#F5F5F5]'
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
