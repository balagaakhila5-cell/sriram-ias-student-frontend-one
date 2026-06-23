"use client";

import Image from "@/components/common/AppImage";
import { useMemo, useRef, useState } from "react";
import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import StudyMaterialsGrid from "@/features/resources/components/StudyMaterialsGrid";
import {
  FREE_RESOURCE_CARD_GRID,
  RESOURCE_PAGE_HEADING_GRADIENT,
  RESOURCE_SECTION_SHELL,
  RESOURCE_SECTION_TEXTURE_OVERLAY,
} from "@/features/resources/components/cardStyles";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { revealResourceCards } from "@/features/resources/utils/resourceCardGsap";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingActions from "@/components/common/FloatingActions";
import StudyMaterialsExamTabs, {
  type StudyMaterialsExamType,
} from "@/components/common/StudyMaterialsExamTabs";
import StudyMaterialsSidebar from "@/features/resources/components/StudyMaterialsSidebar";

import {
  findCategoryByKey,
  findSubCategoryByName,
  useResourceCategories,
  useResourceFiles,
  useResourceSubCategories,
} from "@/features/resources/hooks/useResources";

gsap.registerPlugin(ScrollTrigger);

const TAB_TO_EXAM: Record<"PRELIMS" | "MAINS" | "INTERVIEW", StudyMaterialsExamType> =
  {
    PRELIMS: "prelims",
    MAINS: "mains",
    INTERVIEW: "interview",
  };

const EXAM_TO_TAB: Record<StudyMaterialsExamType, "PRELIMS" | "MAINS" | "INTERVIEW"> =
  {
    prelims: "PRELIMS",
    mains: "MAINS",
    interview: "INTERVIEW",
  };

type TabKey = keyof typeof TAB_TO_EXAM;

export default function StudyMaterialsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState<TabKey>("PRELIMS");

  const { data: categories } = useResourceCategories();
  const studyCategory = useMemo(
    () => findCategoryByKey(categories, "STUDY_MATERIALS"),
    [categories],
  );
  const categoryId = studyCategory?._id;

  const { data: subCategories } = useResourceSubCategories(categoryId);
  const subCategory = useMemo(
    () => findSubCategoryByName(subCategories, activeTab.toLowerCase()),
    [subCategories, activeTab],
  );
  const subCategoryId = subCategory?._id;

  const { data: files = [], isFetching } = useResourceFiles(
    { categoryId, subCategoryId },
    !!categoryId && !!subCategoryId,
  );

  const examType =
    activeTab === "MAINS"
      ? "mains"
      : activeTab === "PRELIMS"
        ? "prelims"
        : activeTab === "INTERVIEW"
          ? "interview"
          : undefined;

  const tabLabel = activeTab.toUpperCase();
  const fallback = useMemo(() => {
    if (examType) {
      return listFreeResourceDocuments(
        "study-materials",
        undefined,
        undefined,
        examType,
      );
    }
    return listFreeResourceDocuments("study-materials").filter((item) =>
      item.title.toUpperCase().includes(tabLabel),
    );
  }, [examType, tabLabel]);

  const catalogItems = useMemo(
    () =>
      mapApiFilesToCatalog(files, "study-materials", fallback, 50).map((item) => ({
        ...item,
        hideImage: true,
        image: "",
      })),
    [files, fallback],
  );

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
        ".animate-sidebar",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      revealResourceCards(".animate-cards-container");
    },
    {
      scope: containerRef,
      dependencies: [prefersReducedMotion, activeTab, catalogItems.length],
    },
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="w-full overflow-x-hidden bg-[#f2f6fa] font-['Montserrat',sans-serif]"
      >
        <section className="relative h-[320px] w-full md:h-[380px] lg:h-[420px]">
          <Image
            src="/assets/free-resources/study-materials/study-materials.jpg"
            alt="Study Materials Banner"
            fill
            priority
            className="object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,#000000_100%)]" />
        </section>

        <section className={`${RESOURCE_SECTION_SHELL} px-5 py-16 md:px-8 lg:px-12 xl:px-16`}>
          <div className={RESOURCE_SECTION_TEXTURE_OVERLAY} aria-hidden />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 xl:gap-14">
              <div className="min-w-0">
                <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold leading-none md:text-[58px] lg:text-[56px]">
                  <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                    Study Materials
                  </span>
                </h1>

                <StudyMaterialsExamTabs
                  className="animate-tabs mb-12"
                  activeTab={TAB_TO_EXAM[activeTab]}
                  onChange={(exam) => setActiveTab(EXAM_TO_TAB[exam])}
                />

                <div key={activeTab} className="animate-cards-container overflow-visible px-1 py-2">
                  {isFetching && (
                    <p className="mb-4 text-center text-[16px] text-[#555]">
                      Loading...
                    </p>
                  )}
                  <StudyMaterialsGrid
                    items={catalogItems}
                    emptyMessage={`No study material available for ${activeTab}.`}
                    gridClassName={FREE_RESOURCE_CARD_GRID}
                    resetKey={activeTab}
                  />
                </div>
              </div>

              <div className="w-full lg:sticky lg:top-[120px] lg:mt-[110px] lg:self-start">
                <StudyMaterialsSidebar />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
