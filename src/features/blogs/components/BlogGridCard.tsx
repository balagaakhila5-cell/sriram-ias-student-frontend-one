'use client';

import Image from '@/components/common/AppImage';
import Link from '@/components/common/AppLink';
import { ArrowRight } from 'lucide-react';
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
        'blog-grid-card group relative h-[240px] overflow-hidden rounded-[8px] shadow-md transition-all duration-500 ease-out hover:scale-[1.08] hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)]',
        className,
      )}
    >
      <Image src={blog.image} alt={blog.title} fill className="object-cover" />

      <div className="absolute inset-0 bg-black/15" />

      <div className="absolute left-5 right-4 top-4 z-10">
        <h3 className="mb-2 text-[19px] font-extrabold leading-[1.4] text-white sm:text-[20px]">
          {blog.title}
        </h3>

        <BlogCardDateTime
          date={blog.date}
          time={blog.time}
          variant="grid"
          className="mb-0"
        />
      </div>

      <Link
        href={`/blogs/${blog.id}`}
        className="absolute bottom-4 left-1/2 z-10 flex h-[36px] w-fit min-w-[120px] -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white"
      >
        Read More <ArrowRight size={15} />
      </Link>
    </div>
  );
}
