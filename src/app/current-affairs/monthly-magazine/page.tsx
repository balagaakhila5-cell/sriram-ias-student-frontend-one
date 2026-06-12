"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { revealResourceCards } from "@/features/resources/utils/resourceCardGsap";
import { useCurrentAffairsDocuments } from "@/features/currentAffairs/hooks/useCurrentAffairs";
import DocumentsGrid from "@/features/currentAffairs/components/DocumentsGrid";
import {
  ALL_FILTER,
  CA_FILTER_MONTHS,
  CA_FILTER_YEARS,
  toFilterValue,
} from "@/features/currentAffairs/filters";

import Header from "@/components/common/Header";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";
import Footer from "@/components/common/Footer";
import CustomDropdown from "@/components/common/CustomDropdown";
import FloatingActions from "@/components/common/FloatingActions";
import TrendingVideosCard from "@/components/common/TrendingVideosCard";
import QuickLinks from "@/components/common/QuickLinks";

gsap.registerPlugin(ScrollTrigger);

const magazineCards = [
  {
    id: 1,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
  {
    id: 2,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
  {
    id: 3,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
  {
    id: 4,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
  {
    id: 5,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
  {
    id: 6,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
  {
    id: 7,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
  {
    id: 8,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
  {
    id: 9,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
  {
    id: 10,
    title: "April Month Magazine 2026",
    image: "/assets/current-affairs/monthly-magazine/magazine.png",
    sampleLink: "#",
    downloadLink: "#",
  },
];


export default function MonthlyMagazinePage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedYear, setSelectedYear] = useState<string>(ALL_FILTER);
  const [selectedMonth, setSelectedMonth] = useState<string>(ALL_FILTER);

  const { documents, isLoading, isError, error } = useCurrentAffairsDocuments(
    "MONTHLY_MAGAZINE",
    toFilterValue(selectedYear),
    toFilterValue(selectedMonth),
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".animate-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".animate-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".animate-filters",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".animate-filters",
            start: "top 85%",
          },
        }
      );

      revealResourceCards(".cards-grid");

      gsap.fromTo(
        ".animate-sidebar",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".animate-sidebar",
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="w-full overflow-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]"
      >
        {/* Banner */}
        <section className="relative h-[230px] w-full overflow-hidden md:h-[280px] lg:h-[320px]">
          <Image
            src="/assets/current-affairs/monthly-magazine/monthly-magazine-banner.png"
            alt="Monthly Magazine Banner"
            fill
            priority
            className="object-cover object-center brightness-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.08)_40%,rgba(0,0,0,0)_100%)]" />
        </section>

        {/* Main Content */}
        <section className="relative bg-[url('/assets/free-resources/free-resource-bg-1.png')] bg-cover bg-center bg-no-repeat px-4 py-14 md:px-8 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
              {/* Left Content */}
              <div>
              <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold uppercase leading-none md:text-[48px] lg:text-[56px]">
                <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                  Monthly Magazine
                </span>
              </h1>

                {/* Fixed Dropdowns */}
                <div className="animate-filters mb-12 flex flex-col items-center justify-center gap-5 md:flex-row md:gap-6">
                  <CustomDropdown
                    options={CA_FILTER_YEARS}
                    value={selectedYear}
                    onChange={setSelectedYear}
                    placeholder="Year"
                  />
                  <CustomDropdown
                    options={CA_FILTER_MONTHS}
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    placeholder="Month"
                  />
                </div>

                {/* Cards */}
                <div className="cards-grid">
                  <DocumentsGrid
                    documents={documents}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                  />
                </div>
              </div>

              {/* Right Sidebar - Trending Videos Only */}
              <aside className="animate-sidebar w-full xl:mt-[95px] xl:space-y-5">
                <TrendingVideosCard />
                <QuickLinks />
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