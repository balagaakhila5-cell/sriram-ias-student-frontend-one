import { Suspense } from "react";
import FreeResourcesHub from "@/features/studentPortal/freeResources/FreeResourcesHub";

export default function FreeResourcesPage() {
  return (
    <Suspense fallback={null}>
      <FreeResourcesHub initialTab="free-resources" />
    </Suspense>
  );
}
