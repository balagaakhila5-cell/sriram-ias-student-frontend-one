import ResourcesGridSkeleton from "@/features/studentPortal/freeResources/components/ResourcesGridSkeleton";

export default function FreeResourcesLoading() {
  return (
    <div className="space-y-8">
      <div className="mx-auto h-12 w-[320px] animate-pulse rounded-full bg-[#EDEEF2]" />
      <div className="mx-auto flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-11 w-[200px] animate-pulse rounded-full bg-[#EDEEF2]"
          />
        ))}
      </div>
      <ResourcesGridSkeleton />
    </div>
  );
}
