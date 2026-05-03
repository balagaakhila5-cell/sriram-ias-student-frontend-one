"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import QuickLinks from "@/components/common/QuickLinks";
import Courses from "@/components/common/Courses";
import CustomDropdown from "@/components/common/CustomDropdown";
import FloatingActions from "@/components/common/FloatingActions";

import {
  findCategoryByKey,
  findSubCategoryByName,
  useResourceCategories,
  useResourceFiles,
  useResourceFilters,
  useResourceSubCategories,
} from "@/features/resources/hooks/useResources";

gsap.registerPlugin(ScrollTrigger);

type Section = "LIST" | "PRELIMS" | "MAINS";
const defaultQuestionPapers = (section: Section) => [
  {
    _id: "1",
    title: `${section === "PRELIMS" ? "Prelims" : "Mains"} Exam Paper-2 Question Paper .`,
    fileUrl: "#",
  },
  {
    _id: "2",
    title: `${section === "PRELIMS" ? "Prelims" : "Mains"} Exam Paper-2 Question Paper .`,
    fileUrl: "#",
  },
  {
    _id: "3",
    title: `${section === "PRELIMS" ? "Prelims" : "Mains"} Exam Paper-2 Question Paper .`,
    fileUrl: "#",
  },
  {
    _id: "4",
    title: `${section === "PRELIMS" ? "Prelims" : "Mains"} Exam Paper-2 Question Paper .`,
    fileUrl: "#",
  },
  {
    _id: "5",
    title: `${section === "PRELIMS" ? "Prelims" : "Mains"} Exam Paper-2 Question Paper .`,
    fileUrl: "#",
  },
];

export default function PreviousYearPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeSection, setActiveSection] = useState<Section>("LIST");
  const [selectedPaper, setSelectedPaper] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<{
    paperId?: string;
    yearId?: string;
  }>({});

  const { data: categories } = useResourceCategories();
  const pyqCategory = useMemo(
    () => findCategoryByKey(categories, "PYQ"),
    [categories],
  );
  const categoryId = pyqCategory?._id;

  const { data: subCategories } = useResourceSubCategories(categoryId);
  const subCategory = useMemo(
    () =>
      activeSection === "LIST"
        ? undefined
        : findSubCategoryByName(subCategories, activeSection.toLowerCase()),
    [subCategories, activeSection],
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
  const { data: years = [] } = useResourceFilters(
    { type: "YEAR", categoryId },
    !!categoryId,
  );

  const paperId = useMemo(
    () => papers.find((p) => p.value === selectedPaper)?._id,
    [papers, selectedPaper],
  );
  const yearId = useMemo(
    () => years.find((y) => y.value === selectedYear)?._id,
    [years, selectedYear],
  );

  const { data: files = [], isFetching } = useResourceFiles(
    {
      categoryId,
      subCategoryId,
      paperId: appliedFilters.paperId,
      yearId: appliedFilters.yearId,
    },
    !!categoryId &&
      !!subCategoryId &&
      (!!appliedFilters.paperId || !!appliedFilters.yearId),
  );
  const showResults =
  "paperId" in appliedFilters || "yearId" in appliedFilters;

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
          clearProps: "transform",
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
      dependencies: [prefersReducedMotion, activeSection, showResults],
    },
  );

  const handleSearch = () => setAppliedFilters({ paperId, yearId });
  const handleBack = () => {
    setActiveSection("LIST");
    setAppliedFilters({});
    setSelectedPaper("");
    setSelectedYear("");
  };

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="min-h-screen bg-[#fcfcfc] font-['Montserrat',sans-serif]"
      >
        <section className="relative h-[320px] w-full overflow-hidden md:h-[400px] lg:h-[420px]">
          <Image
            src="/assets/free-resources/previous-year/previous-year.png"
            alt="Previous Year Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_15.33%,rgba(0,0,0,0.1)_50.97%)]" />
        </section>

        <section className="relative bg-[#fcfcfc] bg-[url('/assets/bg-wave.png')] bg-cover bg-center bg-no-repeat px-6 py-16 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-[1400px]">
            {activeSection === "LIST" ? (
              <>
                <h1 className="animate-heading mb-14 text-center text-[36px] font-extrabold uppercase leading-[1.05] md:text-[46px] lg:text-[56px]">
                  <span className="-ml-95 drop-shadow-sm bg-[linear-gradient(90deg,#D57E89_0%,#759AB7_60%,#3E9CDB_100%)] bg-clip-text text-transparent">
                    PREVIOUS YEAR QUESTION
                  </span>
                  <br />
                  <span className="-ml-95 drop-shadow-sm bg-[linear-gradient(90deg,#9A8FB6_0%,#7287B8_50%,#5A91CF_100%)] bg-clip-text text-transparent">
                    PAPERS
                  </span>
                </h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-10">
                  <div className="animate-cards-container grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
                    <div className="animate-card group relative flex min-h-[250px] w-full overflow-hidden rounded-[24px] bg-[#FDF6EA] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl">
                      <div className="relative z-20 flex w-[55%] flex-col justify-center transition-all duration-300 group-hover:translate-x-2">
                        <h2 className="mb-3 text-[26px] font-extrabold uppercase tracking-wide xl:text-[28px]">
                          <span className="bg-[linear-gradient(90deg,#E18A98_0%,#5AAEE2_100%)] bg-clip-text text-transparent">
                            PRELIMS
                          </span>
                        </h2>
                        <p className="mb-6 text-[15px] font-medium leading-snug text-[#555] xl:text-[16px]">
                          Check all PRELIMS previous year question paper
                        </p>
                        <div>
                          <button
                            onClick={() => setActiveSection("PRELIMS")}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(90deg,#2BA9E0,#032B3F)] px-6 py-2.5 text-[14px] font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
                          >
                            View &rarr;
                          </button>
                        </div>
                      </div>

                      <div className="absolute right-[-5%] top-0 flex h-full w-[50%] origin-right scale-125 items-center justify-center pointer-events-none md:scale-110 lg:scale-[1.3]">
                        <svg viewBox="-40 -20 280 260" className="relative z-0 h-full w-full drop-shadow-xl transition-all duration-500 group-hover:scale-105">
                          <defs>
                            <clipPath id="popOutClipPrelims">
                              <path d="M 100 0 C 120 0 125 25 143.3 35 C 161.6 45 186.6 40 195 58.3 C 203.4 76.6 185 91.6 185 110 C 185 128.4 203.4 143.4 195 161.7 C 186.6 180 161.6 175 143.3 185 C 125 195 120 220 100 220 C 80 220 75 195 56.7 185 C 38.4 175 13.4 180 5 161.7 C -3.4 143.4 15 128.4 15 110 C 15 91.6 -3.4 76.6 5 58.3 C 13.4 40 38.4 45 56.7 35 C 75 25 80 0 100 0 Z" />
                              <rect x="-100" y="-100" width="400" height="270" />
                            </clipPath>
                          </defs>
                          <path fill="#D8CEF6" d="M 100 0 C 120 0 125 25 143.3 35 C 161.6 45 186.6 40 195 58.3 C 203.4 76.6 185 91.6 185 110 C 185 128.4 203.4 143.4 195 161.7 C 186.6 180 161.6 175 143.3 185 C 125 195 120 220 100 220 C 80 220 75 195 56.7 185 C 38.4 175 13.4 180 5 161.7 C -3.4 143.4 15 128.4 15 110 C 15 91.6 -3.4 76.6 5 58.3 C 13.4 40 38.4 45 56.7 35 C 75 25 80 0 100 0 Z" />
                          <image
                            href="/assets/course/course-details-person.png"
                            clipPath="url(#popOutClipPrelims)"
                            x="-35"
                            y="10"
                            width="270"
                            height="250"
                            preserveAspectRatio="xMidYMid slice"
                            className="origin-bottom transition-all duration-500 group-hover:scale-[1.08]"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="animate-card group relative flex min-h-[250px] w-full overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#DCEAFC_0%,#C0DDF6_100%)] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl">
                      <div className="relative z-20 flex w-[55%] flex-col justify-center transition-all duration-300 group-hover:translate-x-2">
                        <h2 className="mb-3 text-[26px] font-extrabold uppercase tracking-wide xl:text-[28px]">
                          <span className="bg-[linear-gradient(90deg,#E18A98_0%,#5AAEE2_100%)] bg-clip-text text-transparent">
                            MAINS
                          </span>
                        </h2>
                        <p className="mb-6 text-[15px] font-medium leading-snug text-[#555] xl:text-[16px]">
                          Check all MAINS previous year question paper
                        </p>
                        <div>
                          <button
                            onClick={() => setActiveSection("MAINS")}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(90deg,#2BA9E0,#032B3F)] px-6 py-2.5 text-[14px] font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
                          >
                            View &rarr;
                          </button>
                        </div>
                      </div>

                      <div className="absolute right-[-5%] top-0 flex h-full w-[50%] origin-right scale-125 items-center justify-center pointer-events-none md:scale-110 lg:scale-[1.3]">
                        <svg viewBox="-40 -20 280 260" className="relative z-0 h-full w-full drop-shadow-xl transition-all duration-500 group-hover:scale-105">
                          <defs>
                            <clipPath id="popOutClipMains">
                              <path d="M 100 0 C 120 0 125 25 143.3 35 C 161.6 45 186.6 40 195 58.3 C 203.4 76.6 185 91.6 185 110 C 185 128.4 203.4 143.4 195 161.7 C 186.6 180 161.6 175 143.3 185 C 125 195 120 220 100 220 C 80 220 75 195 56.7 185 C 38.4 175 13.4 180 5 161.7 C -3.4 143.4 15 128.4 15 110 C 15 91.6 -3.4 76.6 5 58.3 C 13.4 40 38.4 45 56.7 35 C 75 25 80 0 100 0 Z" />
                              <rect x="-100" y="-100" width="400" height="270" />
                            </clipPath>
                          </defs>
                          <path fill="#D8CEF6" d="M 100 0 C 120 0 125 25 143.3 35 C 161.6 45 186.6 40 195 58.3 C 203.4 76.6 185 91.6 185 110 C 185 128.4 203.4 143.4 195 161.7 C 186.6 180 161.6 175 143.3 185 C 125 195 120 220 100 220 C 80 220 75 195 56.7 185 C 38.4 175 13.4 180 5 161.7 C -3.4 143.4 15 128.4 15 110 C 15 91.6 -3.4 76.6 5 58.3 C 13.4 40 38.4 45 56.7 35 C 75 25 80 0 100 0 Z" />
                          <image
                            href="/assets/free-resources/previous-year-person.png"
                            clipPath="url(#popOutClipMains)"
                            x="-35"
                            y="10"
                            width="250"
                            height="250"
                            preserveAspectRatio="xMidYMid slice"
                            className="origin-bottom transition-all duration-500 group-hover:scale-[1.08]"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <aside className="animate-sidebar w-full">
                    <QuickLinks />
                  </aside>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 flex justify-center md:justify-start">
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 rounded-full border border-[#e7ebf3] bg-[#edf0fb] px-5 py-2.5 text-[14px] font-bold text-[#111] shadow-sm transition-all hover:bg-[#e2e6f4]"
                  >
                    &larr; Back
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_380px]">
                  <div>
                    <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold uppercase leading-none md:text-[48px] lg:text-[56px]">
                      <span className="bg-[linear-gradient(90deg,#D57E89_0%,#9A8FB6_42%,#3E9CDB_100%)] bg-clip-text text-transparent">
                        {activeSection} QUESTION PAPERS
                      </span>
                    </h1>

                    <div className="animate-tabs relative z-[60] mb-12">
                      <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                        <CustomDropdown
                          options={papers.map((p) => p.value)}
                          value={selectedPaper}
                          onChange={setSelectedPaper}
                          placeholder="Select Paper"
                        />
                        <CustomDropdown
                          options={years.map((y) => y.value)}
                          value={selectedYear}
                          onChange={setSelectedYear}
                          placeholder="Year"
                        />
                      </div>

                      <div className="mt-12 flex justify-center">
                       
                          <button
                             onClick={handleSearch}
                          className="rounded-full bg-[linear-gradient(90deg,#167fbd_0%,#03283b_100%)] px-14 py-3 text-[18px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.03] "
                        >
                          Search
                        </button>
                      </div>
                    </div>

                    {showResults && (
                      <div className="animate-cards-container grid grid-cols-1 gap-5 md:grid-cols-2">
                        {isFetching && (
                          <p className="col-span-full text-center text-[16px] text-[#555]">
                            Loading...
                          </p>
                        )}
                       {!isFetching &&
                         (files.length >= 5 ? files : defaultQuestionPapers(activeSection)).map((book) => (
                          <div
                            key={book._id}
                            className="animate-card group origin-bottom-left rounded-[18px] bg-[#FAF8F3] px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#FEF2E5] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center transition-all duration-300 group-hover:scale-110">
                                <Image
                                  src="/assets/free-resources/previous-year/Pdf-img.png"
                                  alt="PDF"
                                  width={82}
                                  height={82}
                                  className="h-auto w-full object-contain"
                                />
                              </div>
                              <div className="flex-1 transition-all duration-300 group-hover:translate-x-1">
                                <h3 className="text-[18px] font-bold leading-[1.3] text-[#161616]">
                                  {book.title}
                                </h3>
                                <div className="mt-4 flex flex-wrap gap-3">
                                  <Link
                                    href={book.fileUrl ?? "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-w-[88px] items-center justify-center rounded-[10px] border border-[#58b7ea] bg-white px-5 py-2 text-[15px] font-bold text-[#2a9cda] transition-all duration-300 hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white"
                                  >
                                    View
                                  </Link>
                                  <a
                                    href={book.fileUrl ?? "#"}
                                    download
                                    className="inline-flex min-w-[140px] items-center justify-center rounded-[10px] border border-[#58b7ea] bg-white px-5 py-2 text-[15px] font-bold text-[#2a9cda] transition-all duration-300 hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white"
                                  >
                                    Download PDF
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <aside className="animate-sidebar mx-auto w-full max-w-[380px] space-y-8 xl:ml-auto xl:mt-[90px]">
                    <Courses />

                    <div className="rounded-[22px] bg-[#E2EDFE] px-3 py-8 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
                      <h2 className="mb-6 ml-1.5 text-center text-[18px] font-extrabold leading-tight bg-[linear-gradient(90deg,#20A0E0_0%,rgba(246,58,65,0.8)_99.99%)] bg-clip-text text-transparent">
                        <span className="-ml-2.5">UPSC</span> Prelims 2026 Examination<br />
                        <span>Countdown</span>
                      </h2>

                      <div className="flex justify-center gap-2.5">
                        {[
                          { label: "DAYS", value: "360" },
                          { label: "HOURS", value: "24" },
                          { label: "MINUTES", value: "60" },
                          { label: "SECONDS", value: "60" },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex h-[78px] w-[72px] flex-col items-center justify-center rounded-[12px] bg-[#0B1628] shadow-lg"
                          >
                            <div className="text-[22px] font-extrabold leading-none text-white">
                              {item.value}
                            </div>
                            <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wide text-[#A5DEFF]">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex justify-center">
                        <button className="rounded-full bg-[linear-gradient(90deg,#0C4A6E_0%,#032B3F_100%)] px-6 py-3 text-[14px] font-bold text-white shadow-md transition-transform hover:scale-105">
                          View Complete Schedule
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
