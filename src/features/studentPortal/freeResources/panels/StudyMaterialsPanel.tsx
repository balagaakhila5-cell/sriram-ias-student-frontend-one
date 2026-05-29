"use client";

import { useMemo, useState } from "react";
import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import StudyMaterialsGrid from "@/features/resources/components/StudyMaterialsGrid";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import SubNavToggle from "@/features/studentPortal/components/SubNavToggle";
import {
  findCategoryByKey,
  findSubCategoryByName,
  useResourceCategories,
  useResourceFiles,
  useResourceSubCategories,
} from "@/features/resources/hooks/useResources";
import type { CatalogDocument } from "@/features/resources/catalog/types";

type StudyTab = "prelims" | "mains" | "interview";

const STUDY_TABS: { id: StudyTab; label: string }[] = [
  { id: "prelims", label: "Prelims" },
  { id: "mains", label: "Mains" },
  { id: "interview", label: "Interview" },
];

export default function StudyMaterialsPanel() {
  const [activeTab, setActiveTab] = useState<StudyTab>("prelims");
  const fallback = useMemo(
    () => listFreeResourceDocuments("study-materials"),
    [],
  );

  const { data: categories } = useResourceCategories();
  const studyCategory = useMemo(
    () => findCategoryByKey(categories, "STUDY_MATERIALS"),
    [categories],
  );
  const categoryId = studyCategory?._id;

  const { data: subCategories } = useResourceSubCategories(categoryId);
  const subCategory = useMemo(
    () => findSubCategoryByName(subCategories, activeTab),
    [subCategories, activeTab],
  );
  const subCategoryId = subCategory?._id;

  const { data: files = [], isFetching } = useResourceFiles(
    { categoryId, subCategoryId },
    !!categoryId && !!subCategoryId,
  );

  const tabLabel = activeTab.toUpperCase();
  const filteredFallback = fallback
    .filter((item) => item.title.toUpperCase().includes(tabLabel))
    .slice(0, 6);

  const catalogFallback =
    filteredFallback.length > 0
      ? filteredFallback
      : fallback.slice(0, 6).map((item, i) => ({
          ...item,
          id: `${item.id}-${activeTab}-${i}`,
          title: `${tabLabel} - Study Material ${i + 1}`,
        }));

  const items: CatalogDocument[] = useMemo(
    () =>
      mapApiFilesToCatalog(files, "study-materials", catalogFallback, 6).map(
        (item) => ({ ...item, hideImage: true, image: "" }),
      ),
    [files, catalogFallback],
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <SubNavToggle
          options={STUDY_TABS}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="space-y-4">
        {isFetching && files.length > 0 ? (
          <p className="text-center text-[13px] font-medium text-[#5A6573]">
            Updating results…
          </p>
        ) : null}
        <StudyMaterialsGrid items={items} variant="portal" />
      </div>
    </div>
  );
}
