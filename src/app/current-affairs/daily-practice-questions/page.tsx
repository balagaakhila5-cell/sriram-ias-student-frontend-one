
"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import { FileText, ClipboardList, Trophy } from "lucide-react";
import {
  listPracticeTests,
  PORTAL_FILTER_MONTHS,
  PORTAL_FILTER_YEARS,
  buildDateFilterOptions,
} from "@/features/resources/catalog/currentAffairs";
import PracticeTestCard from "@/features/resources/components/PracticeTestCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingActions from "@/components/common/FloatingActions";
import TrendingArticles from "@/components/common/TrendingArticles";
import DateIconDropdown from "@/components/common/DateIconDropdown";

gsap.registerPlugin(ScrollTrigger);


const TopPerformance = () => {
  // Added 'image' and 'points' to match your second screenshot
  const students = [
    { name: "Darshan", points: 1200, rank: 1, image: "https://imgs.search.brave.com/BNIlKL17iuYEUXhy6kmCeblF2PjY4w6LaLhgZGRo2lo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU2L2Fm/LzZhLzU2YWY2YTE2/Mjk3NmIwNjhkYjRm/NzQyZWEyNmNlZTI2/LmpwZw" },
    { name: "Darshan", points: 1100, rank: 2, image: "https://imgs.search.brave.com/HYetXaBPLxp0lcbXES4oobs8n3JjI0VwnRUL4v-WdGM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LXlv/dW5nLWZlbWFsZS1z/dHVkZW50LXJlZC1z/aGlydC1ibGFjay1i/YWctaG9sZGluZy1w/YWludGJydXNoLXBh/aW50aW5nLXNtaWxp/bmctd2hpdGVfMTQw/NzI1LTE2NjI2Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA" },
    { name: "Darshan", points: 1000, rank: 3, image: "https://imgs.search.brave.com/BNIlKL17iuYEUXhy6kmCeblF2PjY4w6LaLhgZGRo2lo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU2L2Fm/LzZhLzU2YWY2YTE2/Mjk3NmIwNjhkYjRm/NzQyZWEyNmNlZTI2/LmpwZw" },
    { name: "You", points: 900, rank: 10, image: "https://imgs.search.brave.com/HYetXaBPLxp0lcbXES4oobs8n3JjI0VwnRUL4v-WdGM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LXlv/dW5nLWZlbWFsZS1z/dHVkZW50LXJlZC1z/aGlydC1ibGFjay1i/YWctaG9sZGluZy1w/YWludGJydXNoLXBh/aW50aW5nLXNtaWxp/bmctd2hpdGVfMTQw/NzI1LTE2NjI2Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA" },
  ];

  return (
    <div className="rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] bg-[linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8)),url('/dot_background.svg')] bg-[position:top_left,bottom_right] bg-[size:180px_auto] bg-no-repeat overflow-hidden">
      <div className="relative z-10">
        {/* Updated Title */}
        <h2 className="mb-6 text-center text-[30px] font-extrabold leading-none md:text-[34px]">
          <span className="bg-[linear-gradient(90deg,#4D90D2_0%,#B57B95_100%)] bg-clip-text text-transparent">
            Top Performers
          </span>
        </h2>

        {/* New Header Row */}
        <div className="mb-4 flex items-center justify-between rounded-xl bg-[#EEF2FF] px-4 py-3 text-[16px] font-medium text-[#111111]">
          <span className="w-12">Rank</span>
          <span className="flex-1 text-center">Student</span>
          <span className="w-16 text-right">Points</span>
        </div>

        {/* Student List */}
        <div className="space-y-3">
          {students.map((student) => (
            <div 
              key={student.rank} 
              className="flex items-center justify-between rounded-xl bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-50 transition-transform hover:scale-[1.02]"
            >
              {/* Rank */}
              <div className="w-12 text-[18px] font-bold text-[#111111]">
                {student.rank}.
              </div>

              {/* Student Info with Avatar */}
              <div className="flex flex-1 items-center justify-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-100">
                  <img 
                    src={student.image} 
                    alt={student.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-[16px] font-semibold text-[#111111]">
                  {student.name}
                </span>
              </div>

              {/* Points */}
              <div className="w-16 text-right text-[16px] font-bold text-[#111111]">
                {student.points}
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-6 text-center">
          <Link href="/performance" className="text-[14px] font-bold text-[#4D90D2] hover:underline">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Types & Data ---

type ExamType = "prelims" | "mains";

export default function DailyPracticeQuestionsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeTab, setActiveTab] = useState<ExamType>("prelims");
  const filterYear = PORTAL_FILTER_YEARS[0];
  const filterMonth = PORTAL_FILTER_MONTHS[3];
  const dateOptions = useMemo(
    () => buildDateFilterOptions(filterMonth, filterYear),
    [filterMonth, filterYear],
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    () => buildDateFilterOptions(filterMonth, filterYear)[0],
  );

  const practiceTests = useMemo(
    () => listPracticeTests(filterYear, filterMonth, activeTab, selectedDate),
    [filterYear, filterMonth, activeTab, selectedDate],
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
          scrollTrigger: { trigger: ".animate-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".animate-filter",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".animate-filter", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".animate-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: ".cards-grid", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".animate-sidebar",
        { x: 45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".animate-sidebar", start: "top 85%" },
        }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, activeTab] }
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="w-full overflow-hidden bg-[#F7F8FB] font-['Montserrat',sans-serif]"
      >
        {/* Banner */}
        <section className="relative h-[280px] w-full overflow-hidden md:h-[340px] lg:h-[390px]">
          <Image
            src="/assets/current-affairs/daily-practice-questions/daily-practice-questions-banner.png"
            alt="Daily Practice Questions Banner"
            fill
            priority
            className="object-cover object-center brightness-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.08)_40%,rgba(0,0,0,0)_100%)]" />
        </section>

        {/* Content Section with Corner Dots */}
        <section className="relative bg-white bg-[url('/dot_background.svg'),url('/dot_background.svg')] bg-[position:top_left,bottom_right] bg-[size:450px_auto] bg-no-repeat px-4 py-14 md:px-8 lg:px-10 xl:px-14">
          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
              <div>
                <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold uppercase leading-none md:text-[48px] lg:text-[56px]">
                <span className="bg-gradient-to-r from-[#1E9CE7] via-[#B68DB2] to-[#F07F7F] bg-clip-text text-transparent">
                  Daily Practice Questions
                </span>
              </h1>

                {/* Tab Switcher */}
                <div className="animate-filter mx-auto mb-10 flex max-w-[620px] overflow-hidden rounded-[26px] bg-[#F1F1F1] p-3 shadow-[0px_10px_30px_rgba(0,0,0,0.08)]">
                  <button
                    type="button"
                    onClick={() => setActiveTab("prelims")}
                    className={`flex h-[112px] flex-1 items-center justify-center rounded-[20px] transition-all duration-300 ${activeTab === "prelims"
                      ? "bg-gradient-to-r from-[#2FA3E8] to-[#0F567D] text-white shadow-[0px_12px_24px_rgba(23,110,156,0.28)]"
                      : "bg-transparent text-[#111111]"
                      }`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <FileText
                        className={`mb-3 h-8 w-8 ${activeTab === "prelims" ? "text-white" : "text-black"}`}
                      />
                      <span className="text-[18px] font-semibold md:text-[20px]">Prelims</span>
                    </div>
                  </button>

                  <div className="mx-2 hidden w-[1px] bg-[#D0D0D0] md:block" />

                  <button
                    type="button"
                    onClick={() => setActiveTab("mains")}
                    className={`flex h-[112px] flex-1 items-center justify-center rounded-[20px] transition-all duration-300 ${activeTab === "mains"
                      ? "bg-gradient-to-r from-[#2FA3E8] to-[#0F567D] text-white shadow-[0px_12px_24px_rgba(23,110,156,0.28)]"
                      : "bg-transparent text-[#111111]"
                      }`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <ClipboardList
                        className={`mb-3 h-8 w-8 ${activeTab === "mains" ? "text-white" : "text-black"}`}
                      />
                      <span className="text-[18px] font-semibold md:text-[20px]">Mains</span>
                    </div>
                  </button>
                </div>

                <div className="animate-filter mb-10 flex justify-center">
                  <DateIconDropdown
                    options={dateOptions}
                    value={selectedDate}
                    onChange={setSelectedDate}
                  />
                </div>

                {/* Cards Grid */}
                <div className="cards-grid">
                  <ResourceCardGrid>
                    {practiceTests.map((card) => (
                      <PracticeTestCard key={card.id} test={card} variant="public" />
                    ))}
                  </ResourceCardGrid>
                </div>
              </div>

              {/* Sidebar Area */}
              <aside className="animate-sidebar w-full xl:mt-[65px]">
                <div className="space-y-8">
                  <TopPerformance /> {/* Added here on top */}
                  <TrendingArticles />
                  {/* <QuickLinks /> */}
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