export default function TopperDetailSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-[980px] flex-col items-center gap-8 px-4 py-10 md:flex-row md:items-start md:gap-12 md:py-14">
      <div className="h-[320px] w-[240px] shrink-0 animate-pulse rounded-[24px] bg-[#e8eef5] sm:h-[380px] sm:w-[280px] md:h-[440px] md:w-[320px]" />

      <div className="flex w-full max-w-[520px] flex-col items-center gap-4 md:items-start">
        <div className="h-6 w-24 animate-pulse rounded-full bg-[#e8eef5]" />
        <div className="h-10 w-3/4 max-w-[360px] animate-pulse rounded bg-[#e8eef5]" />
        <div className="h-5 w-32 animate-pulse rounded bg-[#e8eef5]" />
        <div className="h-8 w-40 animate-pulse rounded-full bg-[#e8eef5]" />
        <div className="h-5 w-56 animate-pulse rounded bg-[#e8eef5]" />
        <div className="h-5 w-24 animate-pulse rounded bg-[#e8eef5]" />
      </div>
    </div>
  );
}
