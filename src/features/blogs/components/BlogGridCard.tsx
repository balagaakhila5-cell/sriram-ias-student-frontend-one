'use client';

import Image from '@/components/common/AppImage';
import Link from '@/components/common/AppLink';
import { ArrowRight } from 'lucide-react';
import BlogActionButtons from './BlogActionButtons';
import type { BlogBookmarkInput } from '../types';
import { buildBlogMetaLine } from '@/features/blogs/utils/blogDateTime';
import { cn } from '@/lib/utils';

type BlogGridCardProps = {
  blog: BlogBookmarkInput;
  className?: string;
};

export default function BlogGridCard({ blog, className = '' }: BlogGridCardProps) {
  const metaLine = buildBlogMetaLine({
    date: blog.date,
    time: blog.time,
    readTime: blog.readTime,
  });

  return (
    <div
      className={cn(
        'blog-grid-card group relative h-[240px] overflow-hidden rounded-[8px] shadow-md transition-all duration-500 ease-out hover:scale-[1.08] hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)]',
        className,
      )}
    >
      <Image src={blog.image} alt={blog.title} fill className="object-cover" />

      <div className="absolute inset-0 bg-black/15" />

      <div className="absolute right-4 top-4">
        <BlogActionButtons bookmark={blog} />
      </div>

      <div className="absolute bottom-4 left-5 right-4">
        {blog.category ? (
          <span className="mb-2 inline-flex rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#148ED1]">
            {blog.category}
          </span>
        ) : null}

        <h3 className="mb-2 text-[19px] font-extrabold leading-[1.4] text-white sm:text-[20px]">
          {blog.title}
        </h3>

        {metaLine ? (
          <p className="mb-2 text-[13px] font-bold leading-relaxed text-white">{metaLine}</p>
        ) : null}

        {blog.tags && blog.tags.length > 0 ? (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/35 px-2 py-0.5 text-[10px] font-semibold text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <Link
          href={`/blogs/${blog.id}`}
          className="ml-auto flex h-[36px] w-fit min-w-[120px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white"
        >
          Read More <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
