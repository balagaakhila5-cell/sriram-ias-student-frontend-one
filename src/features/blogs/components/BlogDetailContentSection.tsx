'use client';

import Image from '@/components/common/AppImage';
import BlogHtmlContent from '@/features/blogs/components/BlogHtmlContent';
import { getBlogSectionId } from '@/features/blogs/services/blogDetailsService';
import type { BlogTableOfContent } from '@/features/blogs/types/blogDetails';

type BlogDetailContentSectionProps = {
  section: BlogTableOfContent;
  className?: string;
};

export default function BlogDetailContentSection({
  section,
  className = '',
}: BlogDetailContentSectionProps) {
  return (
    <section
      id={getBlogSectionId(section.order)}
      className={`blog-section-card mb-12 scroll-mt-[100px] ${className}`}
    >
      <h3 className="mb-6 text-[24px] font-semibold text-black">
        {section.order} . {section.topic}
      </h3>

      {section.image ? (
        <div className="relative mb-6 h-[220px] overflow-hidden rounded-[10px] sm:h-[280px]">
          <Image
            src={section.image}
            alt={section.topic}
            fill
            loading="lazy"
            className="object-cover"
          />
        </div>
      ) : null}

      <BlogHtmlContent html={section.content} />
    </section>
  );
}
