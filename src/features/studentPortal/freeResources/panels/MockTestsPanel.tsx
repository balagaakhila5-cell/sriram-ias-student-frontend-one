"use client";

import { useMemo } from "react";
import MockTestCard from "@/features/resources/components/MockTestCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import {
  FREE_RESOURCE_CARD_GRID,
  RESOURCE_CARD_LIMIT,
} from "@/features/resources/components/cardStyles";
import { listDemoMockTestCards } from "@/features/resources/catalog/demoMockTests";
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

  const { data: mockTests = [] } = useMockTests(
    { categoryId, subCategoryId },
    true,
    examType,
  );

  const displayTests = (
    mockTests.length > 0 ? mockTests : listDemoMockTestCards(examType)
  ).slice(0, RESOURCE_CARD_LIMIT);

  return (
    <ResourceCardGrid className={FREE_RESOURCE_CARD_GRID}>
      {displayTests.map((test) => (
        <MockTestCard key={test._id} test={test} variant="portal" />
      ))}
    </ResourceCardGrid>
  );
}
