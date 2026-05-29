"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QuickLinks from "@/components/common/QuickLinks";
import Courses from "@/components/common/Courses";
import CustomDropdown from "@/components/common/CustomDropdown";
import FloatingActions from "@/components/common/FloatingActions";

import MockTestCard from "@/features/resources/components/MockTestCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
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
  const prefersReducedMotion = usePrefersReducedMotion();

  const [selectedPaper, setSelectedPaper] = useState("");
  const [activeTab, setActiveTab] = useState<"prelims" | "mains">("prelims");
  const [appliedPaperId, setAppliedPaperId] = useState<string | undefined>();
  const [showResults, setShowResults] = useState(true);

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
      const subId = typeof sub === "string" ? sub : (sub as { _id?: string } | undefined)?._id;
      return !subId || subId === subCategoryId;
    });
    return filtered.filter((p, i, arr) => arr.findIndex((x) => x.value === p.value) === i);
  }, [allPapers, subCategoryId]);

  const paperId = useMemo(
    () => papers.find((p) => p.value === selectedPaper)?._id,
    [papers, selectedPaper],
  );

  const { data: mockTests = [], isFetching } = useMockTests(
    { categoryId, subCategoryId, paperId: appliedPaperId },
    showResults,
    activeTab,
  );

  const displayTests =
    mockTests.length > 0 ? mockTests : listDemoMockTestCards(activeTab);

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
      gsap.fromTo(
        ".animate-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".animate-cards-container", start: "top 85%" },
        },
      );
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

  const handleSearch = () => {
    setAppliedPaperId(paperId);
    setShowResults(true);
  };

  return (
    <>
      <Header />

      <main ref={containerRef} className="min-h-screen font-['Montserrat',sans-serif]">
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
                <span className="bg-gradient-to-r from-[#5f8fcb] via-[#8e8fb7] to-[#b57ea5] bg-clip-text text-transparent">
                  Free Mock Tests
                </span>
              </h1>

                <div className="animate-tabs mx-auto mb-8 max-w-[800px] rounded-[24px] bg-[#F4F4F4] p-4 shadow-sm">
                  <div className="flex w-full overflow-hidden">
                    <button
                      onClick={() => {
                        setActiveTab("prelims");
                        setSelectedPaper("");
                        setAppliedPaperId(undefined);
                      }}
                      className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-[16px] py-4 transition-all duration-300 ${
                        activeTab === "prelims"
                          ? "bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] text-white shadow-lg"
                          : "bg-transparent text-[#444] hover:bg-[#ebebeb]"
                      }`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === "prelims" ? "stroke-white" : "stroke-[#444]"}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M16 13H8"></path>
                        <path d="M16 17H8"></path>
                        <path d="M10 9H8"></path>
                      </svg>
                      <span className="text-[16px] font-semibold md:text-[18px]">Prelims</span>
                    </button>

                    <div className="my-2 mx-2 w-[1px] bg-[#d9d9d9]"></div>

                    <button
                      onClick={() => {
                        setActiveTab("mains");
                        setSelectedPaper("");
                        setAppliedPaperId(undefined);
                      }}
                      className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-[16px] py-4 transition-all duration-300 ${
                        activeTab === "mains"
                          ? "bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] text-white shadow-lg"
                          : "bg-transparent text-[#444] hover:bg-[#ebebeb]"
                      }`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === "mains" ? "stroke-white" : "stroke-[#444]"}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M16 13H8"></path>
                        <path d="M16 17H8"></path>
                        <path d="M10 9H8"></path>
                      </svg>
                      <span className="text-[16px] font-medium md:text-[18px]">Mains</span>
                    </button>
                  </div>
                </div>

                <div className="relative z-[60] mb-8 flex justify-center">
                  <CustomDropdown
                    options={papers.map((p) => p.value)}
                    value={selectedPaper}
                    onChange={setSelectedPaper}
                    placeholder="Select Paper (optional)"
                  />
                </div>

                <div className="mb-12 flex justify-center">
                  <button
                    onClick={handleSearch}
                    className="rounded-full bg-[linear-gradient(90deg,#167fbd_0%,#03283b_100%)] px-10 py-2.5 text-[16px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-transform hover:scale-105"
                  >
                    Show Tests
                  </button>
                </div>

                {showResults && (
                  <div className="animate-cards-container">
                    {isFetching && (
                      <p className="mb-4 text-center text-[16px] text-[#555]">
                        Loading...
                      </p>
                    )}
                    {!isFetching && displayTests.length === 0 && (
                      <p className="mb-4 text-center text-[16px] text-[#555]">
                        No mock tests available.
                      </p>
                    )}
                    {!isFetching && displayTests.length > 0 && (
                      <ResourceCardGrid>
                        {displayTests.map((test) => (
                          <MockTestCard key={test._id} test={test} variant="public" />
                        ))}
                      </ResourceCardGrid>
                    )}
                  </div>
                )}
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
