export default function ResourcesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2" aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[128px] animate-pulse rounded-[14px] bg-[#EDEEF2]"
        />
      ))}
    </div>
  );
}
