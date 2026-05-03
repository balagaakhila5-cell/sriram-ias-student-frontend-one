"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
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
                  <span className="bg-gradient-to-r from-[#b57ea5] via-[#8e8fb7] to-[#5f8fcb] bg-clip-text text-transparent">
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

                <div className="animate-cards-container grid grid-cols-1 gap-6 md:grid-cols-2">
                  {isFetching && (
                    <p className="col-span-full text-center text-[16px] text-[#555]">
                      Loading...
                    </p>
                  )}
                  {!isFetching && files.length === 0 && (
                    <p className="col-span-full text-center text-[16px] text-[#555]">
                      No study material available for {activeTab}.
                    </p>
                  )}
                  {files.map((item) => (
                    <div
                      key={item._id}
                      className="animate-card group rounded-[18px] px-7 py-8"
                      style={{
                        backgroundColor: "#FAF8F3",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                        transition:
                          "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
                        transformOrigin: "bottom left",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.transform = "translateY(-8px) scale(1.02)";
                        el.style.backgroundColor = "#FEF2E5";
                        el.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.transform = "";
                        el.style.backgroundColor = "#FAF8F3";
                        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                      }}
                    >
                      <h3 className="mb-6 text-center text-[17px] font-extrabold text-[#111] md:text-[18px]">
                        {item.title}
                      </h3>

                      <div className="flex justify-center">
                        <Link
                          href={item.fileUrl ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-w-[130px] items-center justify-center rounded-[8px] border-[1.5px] border-[#58b7ea] bg-white px-5 py-2 text-[15px] font-bold text-[#2a9cda] transition-all duration-300 hover:border-transparent hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white"
                        >
                          View PDF
                        </Link>
                      </div>
                    </div>
                  ))}
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
