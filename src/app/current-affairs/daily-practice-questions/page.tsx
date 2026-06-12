"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { parseDpqExamType } from "@/features/currentAffairs/data/dpqTestResultsMock";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import { FileText, ClipboardList } from "lucide-react";
import { buildTextDateOptions } from "@/features/resources/catalog/currentAffairs";
import { useDailyPracticeTests } from "@/features/currentAffairs/hooks/useCurrentAffairs";
import {
  listPracticeTests,
  PORTAL_FILTER_MONTHS,
  PORTAL_FILTER_YEARS,
  buildDayOnlyDateOptions,
} from "@/features/resources/catalog/currentAffairs";
import PracticeTestCard from "@/features/resources/components/PracticeTestCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import {
  FREE_RESOURCE_CARD_GRID,
  RESOURCE_PAGE_HEADING_GRADIENT,
} from "@/features/resources/components/cardStyles";
import DpqTopPerformers from "@/components/current-affairs/DpqTopPerformers";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingActions from "@/components/common/FloatingActions";
import CustomDropdown from "@/components/common/CustomDropdown";

const TrendingArticles = dynamic(
  () => import("@/components/common/TrendingArticles"),
  {
    loading: () => (
      <div className="h-48 animate-pulse rounded-[22px] bg-[#EEF2F6]" aria-hidden />
    ),
  },
);

type ExamType = "prelims" | "mains";

export default function DailyPracticeQuestionsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<ExamType>(() =>
    parseDpqExamType(searchParams.get("examType")),
  );

  useEffect(() => {
    setActiveTab(parseDpqExamType(searchParams.get("examType")));
  }, [searchParams]);
  const [filterYear, setFilterYear] = useState<string>(PORTAL_FILTER_YEARS[0]);
  const [filterMonth, setFilterMonth] = useState<string>(PORTAL_FILTER_MONTHS[3]);

  const dateOptions = useMemo(
    () => buildDayOnlyDateOptions(filterMonth, filterYear),
    [filterMonth, filterYear],
  );

  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    setSelectedDate((current) =>
      dateOptions.includes(current) ? current : dateOptions[0] ?? "",
    );
  }, [dateOptions]);

  const {
    tests: practiceTests,
    isLoading,
    isError,
    error,
  } = useDailyPracticeTests(
    activeTab,
    toFilterValue(filterYear),
    toFilterValue(filterMonth),
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".dpq-animate-heading",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
      );
      gsap.fromTo(
        ".dpq-animate-filters",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          delay: 0.06,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ".dpq-animate-sidebar",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          delay: 0.1,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion || practiceTests.length === 0) return;

      gsap.fromTo(
        ".cards-grid .resource-card-surface",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.05,
          duration: 0.35,
          ease: "power2.out",
        },
      );
    },
    {
      scope: containerRef,
      dependencies: [prefersReducedMotion, activeTab, practiceTests.length],
    },
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="w-full overflow-hidden bg-[#F7F8FB] font-['Montserrat',sans-serif]"
      >
        <section className="relative h-[280px] w-full overflow-hidden md:h-[340px] lg:h-[390px]">
          <Image
            src="/assets/current-affairs/daily-practice-questions/daily-practice-questions-banner.png"
            alt="Daily Practice Questions Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.08)_40%,rgba(0,0,0,0)_100%)]" />
        </section>

        <section className="relative bg-white px-4 py-14 md:px-8 lg:px-10 xl:px-14">
          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
              <div>
                <h1 className="dpq-animate-heading mb-10 text-center text-[22px] font-extrabold uppercase leading-tight tracking-tight sm:text-[30px] md:text-[40px] lg:text-[48px] xl:text-[52px]">
                  <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                    Daily Practice Questions
                  </span>
                </h1>

                <div className="dpq-animate-filters mx-auto mb-10 flex max-w-[620px] overflow-hidden rounded-[26px] bg-[#F1F1F1] p-2 sm:p-3 shadow-[0px_10px_30px_rgba(0,0,0,0.08)]">
                  <button
                    type="button"
                    onClick={() => setActiveTab("prelims")}
                    className={`flex min-h-[88px] sm:h-[112px] flex-1 items-center justify-center rounded-[20px] transition-all duration-300 ${
                      activeTab === "prelims"
                        ? "bg-gradient-to-r from-[#2FA3E8] to-[#0F567D] text-white shadow-[0px_12px_24px_rgba(23,110,156,0.28)]"
                        : "bg-transparent text-[#111111]"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <FileText
                        className={`mb-3 h-8 w-8 ${activeTab === "prelims" ? "text-white" : "text-black"}`}
                      />
                      <span className="text-[18px] font-semibold md:text-[20px]">
                        Prelims
                      </span>
                    </div>
                  </button>

                  <div className="mx-2 hidden w-[1px] bg-[#D0D0D0] md:block" />

                  <button
                    type="button"
                    onClick={() => setActiveTab("mains")}
                    className={`flex min-h-[88px] sm:h-[112px] flex-1 items-center justify-center rounded-[20px] transition-all duration-300 ${
                      activeTab === "mains"
                        ? "bg-gradient-to-r from-[#2FA3E8] to-[#0F567D] text-white shadow-[0px_12px_24px_rgba(23,110,156,0.28)]"
                        : "bg-transparent text-[#111111]"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <ClipboardList
                        className={`mb-3 h-8 w-8 ${activeTab === "mains" ? "text-white" : "text-black"}`}
                      />
                      <span className="text-[18px] font-semibold md:text-[20px]">
                        Mains
                      </span>
                    </div>
                  </button>
                </div>

                <div className="dpq-animate-filters mb-10 flex flex-col items-center justify-center gap-5 md:flex-row md:gap-6">
                  <CustomDropdown
                    options={CA_FILTER_YEARS}
                    value={filterYear}
                    onChange={setFilterYear}
                    placeholder="Year"
                  />
                  <CustomDropdown
                    options={CA_FILTER_MONTHS}
                    value={filterMonth}
                    onChange={setFilterMonth}
                    placeholder="Month"
                  />
                  <CustomDropdown
                    options={dateOptions}
                    value={selectedDate}
                    onChange={setSelectedDate}
                    placeholder="Date"
                    buttonLabel="Date"
                  />
                </div>

                <div className="cards-grid">
                  {isLoading ? (
                    <p className="text-center text-[16px] font-medium text-[#555]">
                      Loading…
                    </p>
                  ) : isError ? (
                    <p className="text-center text-[16px] font-medium text-red-600">
                      {error?.message ?? "Failed to load practice tests."}
                    </p>
                  ) : practiceTests.length === 0 ? (
                    <p className="text-center text-[16px] font-medium text-[#555]">
                      No practice tests found for the selected filters.
                    </p>
                  ) : (
                    <ResourceCardGrid className={FREE_RESOURCE_CARD_GRID}>
                      {practiceTests.map((card) => (
                        <PracticeTestCard
                          key={card.id}
                          test={card}
                          variant="public"
                        />
                      ))}
                    </ResourceCardGrid>
                  )}
                </div>
              </div>

              <aside className="dpq-animate-sidebar w-full xl:mt-[65px]">
                <div className="space-y-8">
                  <DpqTopPerformers examType={activeTab} />
                  <TrendingArticles viewAllHref="/blogs/all" />
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
