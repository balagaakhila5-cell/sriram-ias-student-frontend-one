'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getBlogSectionId } from '@/features/blogs/services/blogDetailsService';
import type { BlogTableOfContent } from '@/features/blogs/types/blogDetails';

type BlogDetailTableOfContentsProps = {
  sections: BlogTableOfContent[];
  activeId: string;
  onSectionClick: (sectionOrder: number) => void;
  className?: string;
};

export default function BlogDetailTableOfContents({
  sections,
  activeId,
  onSectionClick,
  className = '',
}: BlogDetailTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (sections.length === 0) return null;

  return (
    <aside
      className={`h-fit rounded-[12px] bg-white px-6 py-7 shadow-[0_8px_30px_rgba(0,0,0,0.08)] xl:sticky xl:top-[100px] ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="mb-0 flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={isOpen}
        aria-controls="blog-table-of-content"
      >
        <h3 className="text-[24px] font-bold">
          <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
            Table Of Content
          </span>
        </h3>
        <ChevronDown
          size={24}
          className={`shrink-0 text-[#349EE3] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      <ul
        id="blog-table-of-content"
        className={`space-y-4 overflow-hidden text-[18px] font-bold transition-all duration-300 ease-in-out ${
          isOpen ? 'mt-7 max-h-[640px] opacity-100' : 'mt-0 max-h-0 opacity-0'
        }`}
      >
        {sections.map((section) => {
          const sectionId = getBlogSectionId(section.order);

          return (
            <li key={sectionId}>
              <button
                type="button"
                onClick={() => onSectionClick(section.order)}
                className={`w-full rounded-[8px] px-3 py-2 text-left text-[18px] font-semibold transition-all duration-300 sm:text-[20px] ${
                  activeId === sectionId
                    ? 'bg-[#EBF7FF] text-[#22A8EA]'
                    : 'text-[#777] hover:bg-[#F5FBFF] hover:text-[#22A8EA]'
                }`}
              >
                {section.order}. {section.topic}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
