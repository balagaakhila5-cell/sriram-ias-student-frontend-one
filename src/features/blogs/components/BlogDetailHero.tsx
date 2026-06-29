'use client';

import Image from '@/components/common/AppImage';
import BlogDetailBookmarkButton from '@/features/blogs/components/BlogDetailBookmarkButton';
import type { BlogBookmarkInput } from '@/features/blogs/types';
import type { BlogDetails } from '@/features/blogs/types/blogDetails';
import { Clock3 } from 'lucide-react';

type BlogDetailHeroProps = {
  blog: BlogDetails;
  bookmark: BlogBookmarkInput;
  showHeader?: boolean;
  showImage?: boolean;
  imageClassName?: string;
};

export default function BlogDetailHero({
  blog,
  bookmark,
  showHeader = true,
  showImage = true,
  imageClassName = '',
}: BlogDetailHeroProps) {
  return (
    <>
      {showHeader ? (
      <div className="mb-10 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h2 className="mb-6 text-[32px] font-black leading-[1.15] sm:text-[44px] xl:text-[48px]">
            <span className="bg-gradient-to-r from-[#3099DD] via-[#8B85AA] to-[#D06D7A] bg-clip-text text-transparent">
              {blog.title}
            </span>
          </h2>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[16px] font-semibold text-[#666] sm:text-[18px]">
            {blog.category ? <span>{blog.category}</span> : null}
            {blog.category && blog.language.languageName ? <span>|</span> : null}
            {blog.language.languageName ? <span>{blog.language.languageName}</span> : null}
            {(blog.category || blog.language.languageName) && blog.date ? <span>|</span> : null}
            {blog.date ? <span>{blog.date}</span> : null}
            {blog.time ? <span>{blog.time}</span> : null}
            {blog.readTime ? (
              <span className="flex items-center gap-2">
                <Clock3 size={20} />
                Read Time : {blog.readTime}
              </span>
            ) : null}
          </div>

          {blog.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#eef6fc] px-3 py-1 text-sm font-semibold text-[#246392]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <BlogDetailBookmarkButton bookmark={bookmark} />
      </div>
      ) : null}

      {showImage ? (
      <div
        className={`blog-section-card relative mb-10 h-[280px] w-full overflow-hidden rounded-[10px] sm:h-[380px] md:h-[440px] lg:h-[480px] ${imageClassName}`.trim()}
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          sizes="(max-width: 1280px) calc(100vw - 48px), (max-width: 1360px) calc(100vw - 255px - 96px), 1000px"
          className="object-cover"
        />
      </div>
      ) : null}
    </>
  );
}
