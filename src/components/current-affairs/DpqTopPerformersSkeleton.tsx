export default function DpqTopPerformersSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading top performers">
      <div className="mx-auto h-4 w-[70%] animate-pulse rounded-full bg-[#EDEEF2]" />
      <div className="h-12 animate-pulse rounded-xl bg-[#EEF2FF]" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-[58px] animate-pulse rounded-xl bg-[#EDEEF2]"
        />
      ))}
    </div>
  );
}
