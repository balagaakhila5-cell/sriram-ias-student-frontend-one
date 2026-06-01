"use client";

import { useMemo } from "react";
import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import StudyMaterialsGrid from "@/features/resources/components/StudyMaterialsGrid";
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
import type { StudyMaterialsExamType } from "../config";

interface StudyMaterialsPanelProps {
  examType: StudyMaterialsExamType;
}

export default function StudyMaterialsPanel({
  examType,
}: StudyMaterialsPanelProps) {
  const fallback = useMemo(
    () =>
      listFreeResourceDocuments(
        "study-materials",
        undefined,
        undefined,
        examType,
      ),
    [examType],
  );

  const { data: categories } = useResourceCategories();
  const studyCategory = useMemo(
    () => findCategoryByKey(categories, "STUDY_MATERIALS"),
    [categories],
  );
  const categoryId = studyCategory?._id;

  const { data: subCategories } = useResourceSubCategories(categoryId);
  const subCategory = useMemo(
    () => findSubCategoryByName(subCategories, examType),
    [subCategories, examType],
  );
  const subCategoryId = subCategory?._id;

  const { data: files = [], isFetching } = useResourceFiles(
    { categoryId, subCategoryId },
    !!categoryId && !!subCategoryId,
  );

  const items: CatalogDocument[] = useMemo(
    () => mapApiFilesToCatalog(files, "study-materials", fallback),
    [files, fallback],
  );

  return (
    <div className="space-y-4">
      {isFetching && files.length > 0 ? (
        <p className="text-center text-[13px] font-medium text-[#5A6573]">
          Updating results…
        </p>
      ) : null}
      <StudyMaterialsGrid
        items={items}
        variant="portal"
        gridClassName={FREE_RESOURCE_CARD_GRID}
      />
    </div>
  );
}
