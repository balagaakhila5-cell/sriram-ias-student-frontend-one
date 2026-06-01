"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import StudyMaterialsGrid from "@/features/resources/components/StudyMaterialsGrid";
import { FREE_RESOURCE_CARD_GRID } from "@/features/resources/components/cardStyles";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import OurBooks from "@/components/common/OurBooks";
import Courses from "@/components/common/Courses";
import FloatingActions from "@/components/common/FloatingActions";
import React from "react";

import {
  findCategoryByKey,
  findSubCategoryByName,
  useResourceCategories,
  useResourceFiles,
  useResourceSubCategories,
} from "@/features/resources/hooks/useResources";

gsap.registerPlugin(ScrollTrigger);

type TabKey = "PRELIMS" | "MAINS" | "INTERVIEW";

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
      mapApiFilesToCatalog(files, "study-materials", fallback).map((item) => ({
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
    { scope: containerRef, dependencies: [prefersReducedMotion, activeTab] },
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="w-full overflow-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]"
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

        <section className="relative bg-[url('/assets/free-resources/free-resource-bg-1.png')] bg-cover bg-center bg-no-repeat px-5 py-16 md:px-8 lg:px-12 xl:px-16">
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
              <div>
                <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold leading-none md:text-[58px] lg:text-[56px]">
                  <span className="bg-gradient-to-r from-[#5f8fcb] via-[#8e8fb7] to-[#b57ea5] bg-clip-text text-transparent">
                    Study Materials
                  </span>
                </h1>

                <div className="animate-tabs mx-auto mb-12 flex w-full items-center rounded-[20px] bg-[#F4F4F4] p-2 shadow-inner">
                  {[
                    { key: "PRELIMS" as TabKey, label: "Prelims", icon: "doc" },
                    { key: "MAINS" as TabKey, label: "Mains", icon: "doc" },
                    { key: "INTERVIEW" as TabKey, label: "Interview", icon: "person" },
                  ].map((tab, index, array) => {
                    const isActive = activeTab === tab.key;

                    return (
                      <React.Fragment key={tab.key}>
                        <button
                          onClick={() => setActiveTab(tab.key)}
                          className={`flex flex-1 flex-col items-center justify-center gap-2.5 py-5 transition-all duration-300 ${
                            isActive
                              ? "rounded-[16px] bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] shadow-lg"
                              : "hover:bg-[#ebebeb]"
                          }`}
                        >
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isActive ? "#fff" : "#444"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {tab.icon === "doc" ? (
                              <>
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <path d="M16 13H8"></path>
                                <path d="M16 17H8"></path>
                                <path d="M10 9H8"></path>
                              </>
                            ) : (
                              <>
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="2" y1="20" x2="22" y2="20"></line>
                                <circle cx="12" cy="10" r="3"></circle>
                                <path d="M7 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"></path>
                              </>
                            )}
                          </svg>
                          <span
                            className={`text-[17px] md:text-[19px] ${
                              isActive ? "font-semibold text-white" : "font-medium text-[#444]"
                            }`}
                          >
                            {tab.label}
                          </span>
                        </button>

                        {index < array.length - 1 && (
                          <div className="mx-2 h-18 w-[1.5px] bg-[#D9D9D9]"></div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className="animate-cards-container">
                  {isFetching && (
                    <p className="mb-4 text-center text-[16px] text-[#555]">
                      Loading...
                    </p>
                  )}
                  <StudyMaterialsGrid
                    items={catalogItems}
                    emptyMessage={`No study material available for ${activeTab}.`}
                    gridClassName={FREE_RESOURCE_CARD_GRID}
                  />
                </div>
              </div>

              <aside className="animate-sidebar w-full xl:mt-[110px]">
                <div className="space-y-8">
                  <OurBooks />
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
