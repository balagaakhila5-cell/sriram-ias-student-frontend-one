"use client";

type LoadingSkeletonProps = {
  count?: number;
  columnsClassName?: string;
};

export default function LoadingSkeleton({
  count = 6,
  columnsClassName = "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3",
}: LoadingSkeletonProps) {
  return (
    <div className={columnsClassName} aria-hidden>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`ca-skeleton-${index}`}
          className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
        >
          <div className="h-[180px] animate-pulse bg-[#e8eef5]" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 animate-pulse rounded bg-[#e8eef5]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#eef3f8]" />
            <div className="flex gap-3 pt-2">
              <div className="h-10 flex-1 animate-pulse rounded-full bg-[#e8eef5]" />
              <div className="h-10 flex-1 animate-pulse rounded-full bg-[#e8eef5]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
