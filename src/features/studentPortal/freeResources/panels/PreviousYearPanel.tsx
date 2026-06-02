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
  useResourceCategories,
  useResourceFiles,
} from "@/features/resources/hooks/useResources";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import {
  buildPyqPortalCardTitle,
} from "../resourceFilters";

interface PreviousYearPanelProps {
  pyqYear: string;
  selectPaper: string;
  examType: "prelims" | "mains";
}

export default function PreviousYearPanel({
  pyqYear,
  selectPaper: _selectPaper,
  examType,
}: PreviousYearPanelProps) {
  const fallback = useMemo(
    () =>
      listFreeResourceDocuments("previous-year", pyqYear, undefined, examType).slice(
        0,
        10,
      ),
    [pyqYear, examType],
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

  const items: CatalogDocument[] = useMemo(() => {
    const mapped = mapApiFilesToCatalog(files, "previous-year", fallback).map(
      (item) => ({
        ...item,
        image: RESOURCE_ASSETS.PDF_ICON,
        year: pyqYear,
      }),
    );

    const base = (mapped.length > 0 ? mapped : fallback).slice(0, 10);

    return base.map((item, index) => ({
      ...item,
      title: buildPyqPortalCardTitle(examType, index + 1),
    }));
  }, [files, fallback, pyqYear, examType]);

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
