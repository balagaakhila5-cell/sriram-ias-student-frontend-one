"use client";

import { useMemo } from "react";
import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import { FREE_RESOURCE_CARD_GRID } from "@/features/resources/components/cardStyles";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import {
  findCategoryByKey,
  findSubCategoryByName,
  useResourceCategories,
  useResourceFiles,
  useResourceSubCategories,
} from "@/features/resources/hooks/useResources";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import type { PyqPaperFilter } from "../resourceFilters";

interface PreviousYearPanelProps {
  paper: PyqPaperFilter;
  pyqYear: string;
}

export default function PreviousYearPanel({
  paper,
  pyqYear,
}: PreviousYearPanelProps) {
  const fallback = useMemo(
    () =>
      listFreeResourceDocuments(
        "previous-year",
        pyqYear,
        undefined,
        undefined,
        paper,
      ),
    [paper, pyqYear],
  );

  const { data: categories } = useResourceCategories();
  const pyqCategory = useMemo(
    () => findCategoryByKey(categories, "PYQ"),
    [categories],
  );
  const categoryId = pyqCategory?._id;

  const { data: subCategories } = useResourceSubCategories(categoryId);
  const subCategory = useMemo(
    () => findSubCategoryByName(subCategories, paper.toLowerCase()),
    [subCategories, paper],
  );
  const subCategoryId = subCategory?._id;

  const { data: files = [], isFetching } = useResourceFiles(
    { categoryId, subCategoryId },
    !!categoryId && !!subCategoryId,
  );

  const items: CatalogDocument[] = useMemo(
    () =>
      mapApiFilesToCatalog(files, "previous-year", fallback).map((item) => ({
        ...item,
        image: RESOURCE_ASSETS.PDF_ICON,
        year: pyqYear,
      })),
    [files, fallback, pyqYear],
  );

  return (
    <div className="space-y-4">
      {isFetching && files.length > 0 ? (
        <p className="text-center text-[13px] font-medium text-[#5A6573]">
          Updating results…
        </p>
      ) : null}
      <ResourceCardGrid className={FREE_RESOURCE_CARD_GRID}>
        {items.map((item) => (
          <ResourceDocumentCard
            key={item.id}
            item={item}
            variant="portal"
            singleRowActions
          />
        ))}
      </ResourceCardGrid>
    </div>
  );
}
