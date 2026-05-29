"use client";

import { useMemo } from "react";
import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import {
  findCategoryByKey,
  useResourceCategories,
  useResourceFiles,
} from "@/features/resources/hooks/useResources";
import type { CatalogDocument } from "@/features/resources/catalog/types";

export default function PreviousYearPanel() {
  const fallback = useMemo(
    () => listFreeResourceDocuments("previous-year"),
    [],
  );

  const { data: categories } = useResourceCategories();
  const pyqCategory = useMemo(
    () => findCategoryByKey(categories, "PYQ"),
    [categories],
  );
  const categoryId = pyqCategory?._id;

  const { data: files = [], isFetching } = useResourceFiles(
    { categoryId },
    !!categoryId,
  );

  const items: CatalogDocument[] = useMemo(
    () => mapApiFilesToCatalog(files, "previous-year", fallback, 6),
    [files, fallback],
  );

  return (
    <div className="space-y-4">
      {isFetching && files.length > 0 ? (
        <p className="text-center text-[13px] font-medium text-[#5A6573]">
          Updating results…
        </p>
      ) : null}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((item) => (
          <ResourceDocumentCard key={item.id} item={item} variant="portal" />
        ))}
      </div>
    </div>
  );
}
