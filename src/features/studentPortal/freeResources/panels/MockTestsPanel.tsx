"use client";

import { useMemo, useState } from "react";
import SubNavToggle from "@/features/studentPortal/components/SubNavToggle";
import MockTestCard from "@/features/resources/components/MockTestCard";
import { listDemoMockTestCards } from "@/features/resources/catalog/demoMockTests";
import {
  findCategoryByKey,
  findSubCategoryByName,
  useMockTests,
  useResourceCategories,
  useResourceSubCategories,
} from "@/features/resources/hooks/useResources";

type MockTab = "prelims" | "mains";

const MOCK_TABS: { id: MockTab; label: string }[] = [
  { id: "prelims", label: "Prelims" },
  { id: "mains", label: "Mains" },
];

export default function MockTestsPanel() {
  const [activeTab, setActiveTab] = useState<MockTab>("prelims");

  const { data: categories } = useResourceCategories();
  const mockCategory = useMemo(
    () => findCategoryByKey(categories, "MOCK_TESTS"),
    [categories],
  );
  const categoryId = mockCategory?._id;

  const { data: subCategories } = useResourceSubCategories(categoryId);
  const subCategory = useMemo(
    () => findSubCategoryByName(subCategories, activeTab),
    [subCategories, activeTab],
  );
  const subCategoryId = subCategory?._id;

  const { data: mockTests = [] } = useMockTests(
    { categoryId, subCategoryId },
    true,
    activeTab,
  );

  const displayTests = mockTests.length > 0 ? mockTests : listDemoMockTestCards(activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <SubNavToggle
          options={MOCK_TABS}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {displayTests.map((test) => (
          <MockTestCard key={test._id} test={test} />
        ))}
      </div>
    </div>
  );
}
