'use client';

import Link from '@/components/common/AppLink';
import Image from '@/components/common/AppImage';
import { ArrowRight } from 'lucide-react';
import BlogCardDateTime from '@/features/blogs/components/BlogCardDateTime';
import { BlogFeaturedSkeleton } from '@/features/blogs/components/BlogListSkeleton';
import type { BlogBookmarkInput } from '@/features/blogs/types';
import { cn } from '@/lib/utils';

type FeaturedBlogProps = {
  blog?: BlogBookmarkInput | null;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  className?: string;
};

export default function FeaturedBlog({
  blog,
  isLoading = false,
  isError = false,
  errorMessage,
  className = '',
}: FeaturedBlogProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <BlogFeaturedSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          'mb-7 rounded-[7px] border border-red-200 bg-red-50 px-4 py-8 text-center text-sm font-medium text-red-700',
          className,
        )}
      >
        {errorMessage || 'Unable to load featured blog. Please try again.'}
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div
      className={cn(
        'blog-main-card group relative mb-7 h-[320px] overflow-hidden rounded-[7px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:scale-[1.06] hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)] sm:h-[340px]',
        className,
      )}
    >
      <Image
        src={blog.image}
        alt={blog.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 1320px"
        className="object-cover object-[38%_center]"
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute left-5 top-10 max-w-[480px] sm:left-[38px] sm:top-[62px]">
        <h2 className="mb-3 text-[28px] font-extrabold leading-[1.35] text-white sm:mb-4 sm:text-[42px]">
          {blog.title}
        </h2>

        <BlogCardDateTime
          date={blog.date}
          time={blog.time}
          variant="featured"
          className="mb-1 sm:mb-2"
        />
      </div>

      <Link
        href={`/blogs/${blog.id}`}
        className="absolute bottom-[18px] right-[18px] flex h-[38px] min-w-[124px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#159DE2] hover:text-white sm:right-[22px]"
      >
        Read More <ArrowRight size={16} />
      </Link>
    </div>
  );
}
