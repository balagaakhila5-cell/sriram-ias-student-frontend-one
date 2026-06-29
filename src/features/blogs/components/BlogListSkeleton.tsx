'use client';

import { cn } from '@/lib/utils';

type BlogListSkeletonProps = {
  count?: number;
  className?: string;
  cardClassName?: string;
};

function BlogCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative h-[240px] overflow-hidden rounded-[8px] bg-slate-200 animate-pulse',
        className,
      )}
    >
      <div className="absolute inset-x-5 bottom-5 space-y-2">
        <div className="h-5 w-4/5 rounded bg-slate-300" />
        <div className="h-3 w-1/3 rounded bg-slate-300" />
        <div className="h-3 w-1/4 rounded bg-slate-300" />
        <div className="mt-3 h-9 w-[120px] rounded-full bg-slate-300" />
      </div>
    </div>
  );
}

export default function BlogListSkeleton({
  count = 6,
  className = '',
  cardClassName = '',
}: BlogListSkeletonProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <BlogCardSkeleton key={index} className={cardClassName} />
      ))}
    </div>
  );
}

export function BlogFeaturedSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative mb-7 h-[320px] overflow-hidden rounded-[7px] bg-slate-200 animate-pulse sm:h-[340px]',
        className,
      )}
    >
      <div className="absolute left-[38px] top-[62px] max-w-[480px] space-y-4">
        <div className="h-10 w-4/5 rounded bg-slate-300" />
        <div className="h-5 w-1/3 rounded bg-slate-300" />
        <div className="h-5 w-1/4 rounded bg-slate-300" />
      </div>
      <div className="absolute bottom-[18px] right-[22px] h-[38px] w-[124px] rounded-full bg-slate-300" />
    </div>
  );
}
