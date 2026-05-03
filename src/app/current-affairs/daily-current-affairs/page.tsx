"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QuickLinks from "@/components/common/QuickLinks";
import FloatingActions from "@/components/common/FloatingActions";
import TrendingVideosCard from "@/components/common/TrendingVideosCard";
import CustomDropdown from "@/components/common/CustomDropdown";

gsap.registerPlugin(ScrollTrigger);

const dummyResults = [
  {
    id: 1,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
  {
    id: 2,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
  {
    id: 3,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
  {
    id: 4,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
  {
    id: 5,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
  {
    id: 6,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
  {
    id: 7,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
  {
    id: 8,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
  {
    id: 9,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
  {
    id: 10,
    title: "Apr 10 News today from Jammu Kashmir",
    image: "/assets/current-affairs/pdf-icon.png",
    viewLink: "#",
    downloadLink: "#",
  },
];

const quickLinks = [
  {
    title: "Daily Practice Questions",
    href: "/current-affairs/daily-practice-questions",
    border: "border-[#7B72C4]",
    text: "text-[#625BB0]",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#625BB0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    title: "Monthly Magazine",
    href: "/current-affairs/monthly-magazine",
    border: "border-[#E29A9A]",
    text: "text-[#C77878]",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C77878"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    title: "Monthly Recap",
    href: "/current-affairs/monthly-recap",
    border: "border-[#91B25F]",
    text: "text-[#73923F]",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#73923F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];



function DocumentCard({
  title,
  image,
  viewLink,
  downloadLink,
}: {
  title: string;
  image: string;
  viewLink: string;
  downloadLink: string;
}) {
  return (
    <div className="animate-card group flex min-h-[122px] items-center gap-5 rounded-[14px] bg-[#F5F2EE] px-6 py-4 shadow-[0px_6px_18px_rgba(0,0,0,0.08)] origin-bottom-left transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#FEF2E5] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
      <div className="relative h-[90px] w-[84px] shrink-0 overflow-hidden rounded-[16px]">


        <div className="relative h-[100px] w-[84px] shrink-0 overflow-hidden rounded-[16px] bg-transparent">

          <Image src="/assets/image_89.svg" alt="PDF" fill className="object-contain p-0 group-hover:scale-110" />
        </div>

      </div>

      <div className="min-w-0 flex-1">
        <h3 className="mb-4 max-w-[260px] text-[16px] font-semibold leading-[1.45] text-[#111]">
          {title}
        </h3>

        <div className="flex flex-wrap gap-3">
          <a
            href={viewLink}
            className="rounded-[8px] border border-[#57B0F2] px-4 py-2 text-[14px] font-semibold text-[#46A7ED] transition-colors hover:bg-[#F2FAFF]"
          >
            Read
          </a>
          <a
            href={downloadLink}
            className="rounded-[8px] border border-[#57B0F2] px-4 py-2 text-[14px] font-semibold text-[#46A7ED] transition-colors hover:bg-[#F2FAFF]"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

function QuickLinksCard() {
  return (
    <div className="rounded-[26px] bg-white/95 p-6 shadow-[0px_12px_30px_rgba(0,0,0,0.06)]">
      <h2 className="mb-6 text-center text-[34px] font-extrabold leading-none">
        <span className="bg-gradient-to-r from-[#4A8CCB] via-[#7882C7] to-[#B36F95] bg-clip-text text-transparent">
          Quick Links
        </span>
      </h2>

      <div className="space-y-4">
        {quickLinks.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className={`flex min-h-[60px] items-center gap-4 rounded-full border bg-white px-6 transition-all duration-300 hover:shadow-sm ${item.border}`}
          >
            <span className="shrink-0">{item.icon}</span>
            <span className={`text-[16px] font-semibold ${item.text}`}>
              {item.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function DailyCurrentAffairsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("April");

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".animate-heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".animate-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".animate-filters",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: ".animate-filters", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".animate-card",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".animate-cards-container",
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
          scrollTrigger: { trigger: ".animate-sidebar", start: "top 85%" },
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
        <section className="relative h-[280px] w-full overflow-hidden md:h-[340px] lg:h-[390px]">
          <Image
            src="/assets/current-affairs/daily-current-affairs/daily-current-affairs-banner.png"
            alt="Daily Current Affairs Banner"
            fill
            priority
            className="object-cover brightness-[1.08]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.04)_45%,rgba(0,0,0,0.00)_100%)]" />
        </section>

        {/* Content */}
        <section className="relative bg-[url('/assets/free-resources/free-resource-bg-1.png')] bg-cover bg-center bg-no-repeat px-5 py-12 md:px-8 lg:px-12 xl:px-16">
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
              {/* Left */}
              <div>
                <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold uppercase leading-none md:text-[48px] lg:text-[56px]">
                  <span className="bg-gradient-to-r from-[rgba(225,97,101,0.9)] via-[#9a6db5] to-[#20a0e0] bg-clip-text text-transparent">
                    Daily Current Affairs
                  </span>
                </h1>

                <div className="animate-filters relative z-20 mb-12 flex flex-col items-center justify-center gap-5 md:flex-row md:gap-6">
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

                <div className="animate-cards-container grid grid-cols-1 gap-5 md:grid-cols-2">
                  {dummyResults.map((item) => (
                    <DocumentCard
                      key={item.id}
                      title={item.title}
                      image={item.image}
                      viewLink={item.viewLink}
                      downloadLink={item.downloadLink}
                    />
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <aside className="animate-sidebar w-full xl:mt-[65px]">
                <div className="space-y-8">
                  <TrendingVideosCard />
                  <QuickLinksCard />
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