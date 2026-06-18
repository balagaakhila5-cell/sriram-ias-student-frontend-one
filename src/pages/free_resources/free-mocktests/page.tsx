"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { revealResourceCards } from "@/features/resources/utils/resourceCardGsap";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QuickLinks from "@/components/common/QuickLinks";
import Courses from "@/components/common/Courses";
import CustomDropdown from "@/components/common/CustomDropdown";
import FloatingActions from "@/components/common/FloatingActions";
import PrelimsMainsExamTabs from "@/components/common/PrelimsMainsExamTabs";
import { PremiumAttemptNowButton } from "@/components/common/ResourceFilterButtons";

import MockTestCard from "@/features/resources/components/MockTestCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import {
  FREE_RESOURCE_CARD_GRID,
  RESOURCE_CARD_LIMIT,
  RESOURCE_PAGE_HEADING_GRADIENT,
} from "@/features/resources/components/cardStyles";
import { listDemoMockTestCards } from "@/features/resources/catalog/demoMockTests";
import {
  findCategoryByKey,
  findSubCategoryByName,
  useMockTests,
  useResourceCategories,
  useResourceFilters,
  useResourceSubCategories,
} from "@/features/resources/hooks/useResources";

gsap.registerPlugin(ScrollTrigger);

export default function FreeMockTestsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [selectedPaper, setSelectedPaper] = useState("");
  const [activeTab, setActiveTab] = useState<"prelims" | "mains">("prelims");
  const [appliedFilters, setAppliedFilters] = useState<{
    subCategoryId?: string;
    paperId?: string;
    examTab?: "prelims" | "mains";
  }>({});

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

  const { data: allPapers = [] } = useResourceFilters(
    { type: "PAPER", categoryId },
    !!categoryId,
  );
  const papers = useMemo(() => {
    if (!subCategoryId) return [];
    const filtered = allPapers.filter((p) => {
      const sub = p.subCategory;
      const subId =
        typeof sub === "string"
          ? sub
          : (sub as { _id?: string } | undefined)?._id;
      return !subId || subId === subCategoryId;
    });
    return filtered.filter(
      (p, i, arr) => arr.findIndex((x) => x.value === p.value) === i,
    );
  }, [allPapers, subCategoryId]);

  const paperId = useMemo(
    () => papers.find((p) => p.value === selectedPaper)?._id,
    [papers, selectedPaper],
  );

  const showResults = appliedFilters.examTab != null;
  const resultsExamTab = appliedFilters.examTab ?? activeTab;

  const { data: mockTests = [], isFetching } = useMockTests(
    {
      categoryId,
      subCategoryId: appliedFilters.subCategoryId,
      paperId: appliedFilters.paperId,
    },
    showResults,
    resultsExamTab,
  );

  const displayTests = useMemo(() => {
    if (!showResults) return [];
    const tests =
      mockTests.length > 0
        ? mockTests
        : listDemoMockTestCards(resultsExamTab);
    return tests.slice(0, RESOURCE_CARD_LIMIT);
  }, [showResults, mockTests, resultsExamTab]);

  const handleTabChange = (tab: "prelims" | "mains") => {
    setActiveTab(tab);
    setSelectedPaper("");
    setAppliedFilters({});
  };

  const handleAttemptNow = () => {
    setAppliedFilters({
      subCategoryId,
      paperId: paperId || undefined,
      examTab: activeTab,
    });
    cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.fromTo(
        ".animate-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
      gsap.fromTo(
        ".animate-tabs",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
      );
      revealResourceCards(".animate-cards-container");
      gsap.fromTo(
        ".animate-sidebar",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
    },
    {
      scope: containerRef,
      dependencies: [prefersReducedMotion, activeTab, showResults],
    },
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="min-h-screen font-['Montserrat',sans-serif]"
      >
        <section className="relative h-[300px] w-full overflow-hidden md:h-[380px] lg:h-[390px]">
          <Image
            src="/assets/free-resources/free-mocktests/freemock-tests.png"
            alt="Free Mock Tests Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_15.33%,rgba(0,0,0,0.1)_50.97%)]" />
        </section>

        <section className="relative bg-[#fcfcfc] bg-[url('/assets/bg-wave.png')] bg-cover bg-center bg-no-repeat px-5 py-16 md:px-8 lg:px-12 xl:px-16">
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
              <div>
                <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold leading-none md:text-[56px] lg:text-[56px]">
                  <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                    Free Mock Tests
                  </span>
                </h1>

                <div className="animate-tabs mx-auto mb-12 max-w-[900px]">
                  <PrelimsMainsExamTabs
                    activeTab={activeTab}
                    onChange={handleTabChange}
                    className="mb-8"
                  />

                  <div className="relative z-[60] mb-8 flex justify-center">
                    <CustomDropdown
                      options={
                        papers.length > 0
                          ? papers.map((p) => p.value)
                          : Array.from({ length: 10 }, (_, i) => `Paper ${i + 1}`)
                      }
                      value={selectedPaper}
                      onChange={setSelectedPaper}
                      placeholder="Select Paper"
                      buttonLabel="Select Paper"
                    />
                  </div>

                  <PremiumAttemptNowButton onClick={handleAttemptNow} />
                </div>

                <div ref={cardsRef} className="animate-cards-container">
                  {showResults && isFetching && (
                    <p className="mb-4 text-center text-[16px] text-[#555]">
                      Loading...
                    </p>
                  )}
                  {showResults && !isFetching && displayTests.length === 0 && (
                    <p className="mb-4 text-center text-[16px] text-[#555]">
                      No mock tests available.
                    </p>
                  )}
                  {showResults && !isFetching && displayTests.length > 0 && (
                    <ResourceCardGrid className={FREE_RESOURCE_CARD_GRID}>
                      {displayTests.map((test, index) => (
                        <MockTestCard
                          key={test._id}
                          test={test}
                          variant="public"
                          examType={resultsExamTab}
                          index={index}
                        />
                      ))}
                    </ResourceCardGrid>
                  )}
                </div>
              </div>

              <aside className="animate-sidebar w-full xl:mt-[100px]">
                <div className="space-y-8">
                  <QuickLinks />
                  <Courses />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
