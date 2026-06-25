"use client";

import { useMemo } from "react";
import MockTestCard from "@/features/resources/components/MockTestCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import {
  FREE_RESOURCE_CARD_GRID,
  RESOURCE_CARD_LIMIT,
} from "@/features/resources/components/cardStyles";
import {
  findCategoryByKey,
  findSubCategoryByName,
  useMockTests,
  useResourceCategories,
  useResourceSubCategories,
} from "@/features/resources/hooks/useResources";
import type { FreeResourcesExamType } from "../config";

interface MockTestsPanelProps {
  examType: FreeResourcesExamType;
}

export default function MockTestsPanel({ examType }: MockTestsPanelProps) {
  const { data: categories } = useResourceCategories();
  const mockCategory = useMemo(
    () => findCategoryByKey(categories, "MOCK_TESTS"),
    [categories],
  );
  const categoryId = mockCategory?._id;

  const { data: subCategories } = useResourceSubCategories(categoryId);
  const subCategory = useMemo(
    () => findSubCategoryByName(subCategories, examType),
    [subCategories, examType],
  );
  const subCategoryId = subCategory?._id;

  const { data: mockTests = [], isLoading, isError } = useMockTests(
    { categoryId, subCategoryId },
    Boolean(categoryId && subCategoryId),
  );

  const displayTests = useMemo(
    () => mockTests.slice(0, RESOURCE_CARD_LIMIT),
    [mockTests],
  );

  if (isLoading) {
    return <p className="text-center text-[15px] text-[#555]">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-[15px] text-red-600">Failed to load mock tests.</p>;
  }

  if (displayTests.length === 0) {
    return <p className="text-center text-[15px] text-[#555]">No Records Found</p>;
  }

  return (
    <ResourceCardGrid className={FREE_RESOURCE_CARD_GRID}>
      {displayTests.map((test, index) => (
        <MockTestCard
          key={test._id}
          test={test}
          variant="portal"
          examType={examType}
          index={index}
        />
      ))}
    </ResourceCardGrid>
  );
}
