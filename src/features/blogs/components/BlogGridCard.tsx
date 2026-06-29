'use client';

import Image from '@/components/common/AppImage';
import Link from '@/components/common/AppLink';
import { ArrowRight } from 'lucide-react';
import BlogActionButtons from '@/features/blogs/components/BlogActionButtons';
import BlogCardDateTime from '@/features/blogs/components/BlogCardDateTime';
import type { BlogBookmarkInput } from '../types';
import { cn } from '@/lib/utils';

type BlogGridCardProps = {
  blog: BlogBookmarkInput;
  className?: string;
};

export default function BlogGridCard({ blog, className = '' }: BlogGridCardProps) {
  return (
    <div
      className={cn(
        'blog-grid-card group relative flex h-[260px] flex-col overflow-hidden rounded-[8px] shadow-md transition-all duration-500 ease-out hover:scale-[1.08] hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)]',
        className,
      )}
    >
      <Image src={blog.image} alt={blog.title} fill className="object-cover" />

      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-20 flex shrink-0 justify-end px-4 pb-0 pt-4">
        <BlogActionButtons bookmark={blog} />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pb-4 pt-1">
        <h3 className="mb-2 line-clamp-3 text-left text-[15px] font-semibold leading-[1.4] text-white sm:text-[16px]">
          {blog.title}
        </h3>

        <BlogCardDateTime date={blog.date} time={blog.time} variant="grid" className="mb-0" />

        <Link
          href={`/blogs/${blog.id}`}
          className="mt-auto ml-auto flex h-[36px] w-fit min-w-[120px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white"
        >
          Read More <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
