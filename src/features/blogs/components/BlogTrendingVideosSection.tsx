'use client';

import Image from '@/components/common/AppImage';
import type { BlogTrendingVideo } from '@/features/blogs/services/blogDetailsService';
import { BLOG_TRENDING_VIDEOS_SECTION_ID } from '@/features/blogs/services/blogDetailsService';
import { Play } from 'lucide-react';

const GRADIENT_TITLE =
  'bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent';

type BlogTrendingVideosSectionProps = {
  videos: BlogTrendingVideo[];
  isLoading?: boolean;
  className?: string;
};

function TrendingVideoRow({ video }: { video: BlogTrendingVideo }) {
  return (
    <a
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 border-b border-[#E7E7E7] pb-5 transition-opacity last:border-b-0 last:pb-0 hover:opacity-90"
    >
      <div className="relative h-[112px] w-[150px] shrink-0 overflow-hidden rounded-[6px] sm:h-[120px] sm:w-[170px]">
        <Image src={video.image} alt={video.title} fill className="object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-md">
            <Play size={18} fill="currentColor" className="ml-0.5" aria-hidden />
          </span>
        </span>
      </div>

      <div className="min-w-0 flex-1 pt-1">
        <p className="text-[16px] font-bold leading-[1.45] text-black sm:text-[18px]">
          {video.title}
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#3380C4]">
          <Play size={14} fill="currentColor" aria-hidden />
          Youtube
        </span>
      </div>
    </a>
  );
}

export default function BlogTrendingVideosSection({
  videos,
  isLoading = false,
  className = '',
}: BlogTrendingVideosSectionProps) {
  return (
    <section
      id={BLOG_TRENDING_VIDEOS_SECTION_ID}
      className={`scroll-mt-28 rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:p-6 ${className}`.trim()}
    >
      <h2 className="mb-6 text-center text-[30px] font-extrabold leading-none sm:text-[34px]">
        <span className={GRADIENT_TITLE}>Trending Videos</span>
      </h2>

      {isLoading ? (
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex animate-pulse gap-4">
              <div className="h-[112px] w-[150px] shrink-0 rounded-[6px] bg-slate-200 sm:h-[120px] sm:w-[170px]" />
              <div className="flex-1 space-y-3 pt-2">
                <div className="h-5 w-4/5 rounded bg-slate-200" />
                <div className="h-4 w-24 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="space-y-5">
          {videos.map((video) => (
            <TrendingVideoRow key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[15px] font-medium text-gray-600">
          No trending videos available right now.
        </p>
      )}
    </section>
  );
}
