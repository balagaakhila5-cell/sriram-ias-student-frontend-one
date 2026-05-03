"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";
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
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("April");

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

      gsap.fromTo(
        ".animate-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".cards-grid",
            start: "top 85%",
          },
        }
      );

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
                  <span className="bg-gradient-to-r from-[#d97b8d] via-[#8b7ac9] to-[#2aa3ea] bg-clip-text text-transparent">
                    Monthly Magazine
                  </span>
                </h1>

                {/* Fixed Dropdowns */}
                <div className="animate-filters mb-12 flex flex-col items-center justify-center gap-5 md:flex-row md:gap-6">
                  <CustomDropdown
                    options={["2026", "2025", "2024", "2023"]}
                    value={selectedYear}
                    onChange={setSelectedYear}
                    placeholder="Year"
                  />
                  <CustomDropdown
                    options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    placeholder="Month"
                  />
                </div>

                {/* Cards */}
                <div className="cards-grid grid grid-cols-1 gap-5 md:grid-cols-2">
                  {magazineCards.map((card) => (
                    <div
                      key={card.id}
                      className="animate-card group flex min-h-[155px] items-center gap-4 rounded-[18px] bg-[#f4efe7] px-5 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] origin-bottom-left transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#FEF2E5] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                    >
                      {/* Image Container */}
                      <div className="relative flex h-[92px] w-[92px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] ">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-center">
                        <h3 className="mb-4 max-w-[240px] text-[19px] font-semibold leading-[1.35] text-[#111111]">
                          April Month Magazine
                          <br />
                          2026
                        </h3>

                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href={card.sampleLink}
                            className="rounded-[10px] border border-[#55b7f3] bg-white px-4 py-2 text-[15px] font-semibold text-[#4aaee8] transition-all duration-300 hover:bg-[#eef8ff]"
                          >
                            Sample
                          </Link>

                          <Link
                            href={card.downloadLink}
                            className="rounded-[10px] border border-[#55b7f3] bg-white px-4 py-2 text-[15px] font-semibold text-[#4aaee8] transition-all duration-300 hover:bg-[#eef8ff]"
                          >
                            Download PDF
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
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