'use client';

import BlogGridCard from '@/features/blogs/components/BlogGridCard';
import BlogListSkeleton from '@/features/blogs/components/BlogListSkeleton';
import BlogPagination from '@/features/blogs/components/BlogPagination';
import type { BlogBookmarkInput } from '@/features/blogs/types';
import type { PublicBlogListPagination } from '@/features/blogs/types/publicBlog';
import { cn } from '@/lib/utils';

type BlogListProps = {
  blogs: BlogBookmarkInput[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  pagination?: PublicBlogListPagination;
  onPageChange?: (page: number) => void;
  skeletonCount?: number;
  emptyMessage?: string;
  className?: string;
  gridClassName?: string;
  cardClassName?: string;
  showPagination?: boolean;
};

export default function BlogList({
  blogs,
  isLoading = false,
  isError = false,
  errorMessage,
  pagination,
  onPageChange,
  skeletonCount = 6,
  emptyMessage = 'No Blogs Available',
  className = '',
  gridClassName = '',
  cardClassName = '',
  showPagination = true,
}: BlogListProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <BlogListSkeleton count={skeletonCount} className={gridClassName} />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          'rounded-[8px] border border-red-200 bg-red-50 px-4 py-8 text-center text-sm font-medium text-red-700',
          className,
        )}
      >
        {errorMessage || 'Unable to load blogs. Please try again.'}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div
        className={cn(
          'rounded-[8px] border border-dashed border-[#b9d6ea] bg-[#f7fbff] px-4 py-10 text-center text-sm font-semibold text-[#246392]',
          className,
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className={cn(
          'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3',
          gridClassName,
        )}
      >
        {blogs.map((blog) => (
          <BlogGridCard key={blog.id} blog={blog} className={cardClassName} />
        ))}
      </div>

      {showPagination && pagination && onPageChange ? (
        <BlogPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
          total={pagination.total}
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
}
