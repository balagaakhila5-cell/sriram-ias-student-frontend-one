'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BlogActionButtons from './BlogActionButtons';
import type { BlogBookmarkInput } from '../types';

type BlogGridCardProps = {
  blog: BlogBookmarkInput;
  className?: string;
};

export default function BlogGridCard({ blog, className = '' }: BlogGridCardProps) {
  return (
    <div
      className={`blog-grid-card group relative h-[260px] overflow-hidden rounded-[8px] shadow-md transition-all duration-500 ease-out hover:scale-[1.08] hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)] ${className}`}
    >
      <Image src={blog.image} alt={blog.title} fill className="object-cover" />

      <div className="absolute inset-0 bg-black/15" />

      <div className="absolute right-4 top-4">
        <BlogActionButtons bookmark={blog} />
      </div>

      <div className="absolute bottom-4 left-5 right-4">
        <h3 className="mb-3 text-[19px] font-extrabold leading-[1.45] text-white sm:text-[20px]">
          {blog.title}
        </h3>

        <p className="mb-2 text-[13px] font-bold text-white">{blog.date}</p>

        {blog.time ? (
          <p className="mb-3 text-[13px] font-bold text-white">{blog.time}</p>
        ) : null}

        <Link
          href={`/blogs/${blog.slug}`}
          className="ml-auto flex h-[36px] w-fit min-w-[120px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white"
        >
          Read More <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
