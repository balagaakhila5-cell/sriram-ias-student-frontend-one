export default function DpqTestResultsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading test results">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-[18px] border border-gray-50 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
        >
          <div className="mb-4 h-5 w-[55%] animate-pulse rounded-full bg-[#EDEEF2]" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((__, cellIndex) => (
              <div
                key={cellIndex}
                className="h-10 animate-pulse rounded-lg bg-[#F3F5F8]"
              />
            ))}
          </div>
          <div className="mt-5 h-11 w-[170px] animate-pulse rounded-full bg-[#EDEEF2]" />
        </div>
      ))}
    </div>
  );
}
