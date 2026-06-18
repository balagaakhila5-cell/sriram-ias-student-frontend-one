"use client";

import { useMemo } from "react";
import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import PaginatedPdfGrid from "@/features/resources/components/PaginatedPdfGrid";
import { FREE_RESOURCE_CARD_GRID } from "@/features/resources/components/cardStyles";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import {
  findCategoryByKey,
  useResourceCategories,
  useResourceFiles,
} from "@/features/resources/hooks/useResources";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import { buildPyqPortalCardTitle } from "../resourceFilters";

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
    () => listFreeResourceDocuments("previous-year", pyqYear, undefined, examType),
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
    const mapped = mapApiFilesToCatalog(files, "previous-year", fallback, 50).map(
      (item) => ({
        ...item,
        image: RESOURCE_ASSETS.PDF_ICON,
        year: pyqYear,
      }),
    );

    const base = mapped.length > 0 ? mapped : fallback;

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
      <PaginatedPdfGrid
        items={items}
        gridClassName={FREE_RESOURCE_CARD_GRID}
        resetKey={`${pyqYear}-${examType}`}
        getKey={(item) => item.id}
        renderItem={(item) => (
          <ResourceDocumentCard
            item={item}
            variant="portal"
            singleRowActions
          />
        )}
      />
    </div>
  );
}
