'use client';

import type { BlogLanguage } from '@/features/blogs/types/blogLanguage';

type BlogLanguageSelectorProps = {
  languages: BlogLanguage[];
  selectedLanguage: BlogLanguage | null;
  onSelect: (language: BlogLanguage) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  className?: string;
};

function LanguageSkeleton() {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-[46px] min-w-[130px] animate-pulse rounded-[8px] bg-slate-200"
        />
      ))}
    </div>
  );
}

export default function BlogLanguageSelector({
  languages,
  selectedLanguage,
  onSelect,
  isLoading = false,
  isError = false,
  errorMessage,
  className = '',
}: BlogLanguageSelectorProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <LanguageSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ${className}`}
      >
        {errorMessage || 'Unable to load blog languages. Please try again.'}
      </div>
    );
  }

  if (languages.length === 0) {
    return (
      <div
        className={`rounded-[8px] border border-dashed border-[#b9d6ea] bg-[#f7fbff] px-4 py-3 text-sm font-semibold text-[#246392] ${className}`}
      >
        No Languages Available
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {languages.map((language) => {
        const isActive = selectedLanguage?._id === language._id;

        return (
          <button
            key={language._id}
            type="button"
            onClick={() => onSelect(language)}
            aria-pressed={isActive}
            className={`h-[46px] min-w-[130px] rounded-[8px] px-4 text-[18px] font-semibold shadow-md transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-[#37AEEB] to-[#032C42] text-white'
                : 'bg-white text-black hover:bg-[#F5F5F5]'
            }`}
          >
            {language.languageName}
          </button>
        );
      })}
    </div>
  );
}
