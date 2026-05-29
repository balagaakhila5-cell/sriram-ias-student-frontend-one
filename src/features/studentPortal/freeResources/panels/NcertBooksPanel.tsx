"use client";

import { useMemo } from "react";
import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import NcertBookCard from "@/features/resources/components/NcertBookCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import {
  findCategoryByKey,
  useResourceCategories,
  useResourceFiles,
} from "@/features/resources/hooks/useResources";
import type { CatalogDocument } from "@/features/resources/catalog/types";

export default function NcertBooksPanel() {
  const fallback = useMemo(
    () => listFreeResourceDocuments("ncert-books"),
    [],
  );

  const { data: categories } = useResourceCategories();
  const ncertCategory = useMemo(
    () => findCategoryByKey(categories, "NCERT"),
    [categories],
  );
  const categoryId = ncertCategory?._id;

  const { data: files = [], isFetching } = useResourceFiles(
    { categoryId },
    !!categoryId,
  );

  const items: CatalogDocument[] = useMemo(
    () =>
      mapApiFilesToCatalog(files, "ncert-books", fallback, 6).map((item) => ({
        ...item,
        hideImage: true,
        image: "",
      })),
    [files, fallback],
  );

  return (
    <div className="space-y-4">
      {isFetching && files.length > 0 ? (
        <p className="text-center text-[13px] font-medium text-[#5A6573]">
          Updating results…
        </p>
      ) : null}
      <ResourceCardGrid>
        {items.map((item) => (
          <NcertBookCard key={item.id} item={item} variant="portal" />
        ))}
      </ResourceCardGrid>
    </div>
  );
}
