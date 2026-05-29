import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";

export default function ResourcesGridSkeleton() {
  return (
    <ResourceCardGrid aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[132px] animate-pulse rounded-[14px] bg-[#EDEEF2]"
        />
      ))}
    </ResourceCardGrid>
  );
}
