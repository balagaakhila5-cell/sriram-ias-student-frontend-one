const SKELETON_COUNT = 10;

export default function ToppersGallerySkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <article
          key={`topper-skeleton-${index}`}
          className="flex w-full flex-col items-center text-center"
          aria-hidden
        >
          <div className="h-[280px] w-full animate-pulse rounded-[24px] bg-white/35 sm:h-[310px] lg:h-[360px]" />
          <div className="mt-4 h-4 w-32 animate-pulse rounded-full bg-white/40" />
          <div className="mt-3 h-7 w-24 animate-pulse rounded-full bg-white/45" />
          <div className="mt-3 h-3 w-40 animate-pulse rounded-full bg-white/35" />
        </article>
      ))}
    </div>
  );
}
