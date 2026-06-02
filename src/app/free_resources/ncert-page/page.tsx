"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CustomDropdown from "@/components/common/CustomDropdown";
import FloatingActions from "@/components/common/FloatingActions";
import FreeResourcesCourseSlider from "@/components/common/FreeResourcesCourseSlider";
import { PremiumSearchButton } from "@/components/common/ResourceFilterButtons";

import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import NcertBookCard from "@/features/resources/components/NcertBookCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import {
  FREE_RESOURCE_CARD_GRID,
  RESOURCE_PAGE_HEADING_GRADIENT,
} from "@/features/resources/components/cardStyles";
import {
  useResourceCategories,
  useResourceFiles,
  useResourceFilters,
  findCategoryByKey,
} from "@/features/resources/hooks/useResources";

gsap.registerPlugin(ScrollTrigger);

const toppers = [
  {
    image: "/assets/free-resources/NCERT-BOOKS/ABHI-JAIN(AIR-34).png",
    name: "Abhi Jain",
    rank: "AIR 34",
  },
  {
    image: "/assets/free-resources/NCERT-BOOKS/ABHISHEK-SHARMA-(AIR-38) .png",
    name: "Abhishek Sharma",
    rank: "AIR 38",
  },
  {
    image: "/assets/free-resources/NCERT-BOOKS/DIKSHA-RAI(AIR-40).png",
    name: "Diksha Rai",
    rank: "AIR 40",
  },
  {
    image: "/assets/free-resources/NCERT-BOOKS/NABIYA-PARVEZ(AIR-29).png",
    name: "Nabiya Parvez",
    rank: "AIR 29",
  },
  {
    image: "/assets/free-resources/NCERT-BOOKS/RAGHAV-JHUNJWALA(AIR-4).png",
    name: "Raghav Jhunjwala",
    rank: "AIR 4",
  },
  {
    image: "/assets/free-resources/NCERT-BOOKS/RAJ-KRISHNA JHA(AIR-8).png",
    name: "Raj Krishna Jha",
    rank: "AIR 8",
  },
  {
    image: "/assets/free-resources/NCERT-BOOKS/ROHIN-KUMAR(AIR-39).png",
    name: "Rohin Kumar",
    rank: "AIR 39",
  },
];

export default function NcertBooksPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { data: categories } = useResourceCategories();

  const ncertCategory = useMemo(
    () => findCategoryByKey(categories, "NCERT"),
    [categories]
  );

  const categoryId = ncertCategory?._id;

  const { data: subjects = [] } = useResourceFilters(
    { type: "SUBJECT", categoryId, moduleType: "NCERT" },
    !!categoryId
  );

  const { data: classes = [] } = useResourceFilters(
    { type: "CLASS", categoryId, moduleType: "NCERT" },
    !!categoryId
  );

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [hasSearched, setHasSearched] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
    subjectId?: string;
    classId?: string;
  }>({});

  const subjectId = useMemo(
    () => subjects.find((s) => s.value === selectedSubject)?._id,
    [subjects, selectedSubject]
  );

  const classId = useMemo(
    () => classes.find((c) => c.value === selectedClass)?._id,
    [classes, selectedClass]
  );

  const { data: files = [], isFetching } = useResourceFiles(
    {
      categoryId,
      subjectId: appliedFilters.subjectId,
      classId: appliedFilters.classId,
    },
    !!categoryId && hasSearched,
  );

  const showResults = hasSearched;

  const catalogItems = useMemo(() => {
    if (!showResults) return [];
    const fallback = listFreeResourceDocuments("ncert-books");
    return mapApiFilesToCatalog(files, "ncert-books", fallback);
  }, [files, showResults]);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".animate-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".animate-tabs",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".animate-card",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".animate-cards-container",
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".animate-sidebar",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, showResults] }
  );

  const handleSearch = () => {
    setHasSearched(true);
    setAppliedFilters({ subjectId, classId });
  };

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="min-h-screen bg-[#f7f7f7] font-['Montserrat',sans-serif]"
      >
        <section className="relative h-[300px] w-full overflow-hidden md:h-[380px] lg:h-[400px]">
          <Image
            src="/assets/free-resources/NCERT-BOOKS/NCERT-book.png"
            alt="NCERT Books Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_15.33%,rgba(0,0,0,0.1)_50.97%)]" />
        </section>

        <section className="relative overflow-hidden bg-[#f7f7f7] px-5 py-12 md:px-8 lg:px-12 xl:px-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[url('/assets/free-resources/free-resource-bg-1.png')] bg-cover bg-center bg-no-repeat opacity-50" />

          <div className="relative mx-auto max-w-[1500px]">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold uppercase leading-none md:text-[48px] lg:text-[56px]">
                  <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                    NCERT BOOKS
                  </span>
                </h1>

                <div className="animate-tabs relative z-[60] mb-12">
                  <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                    <CustomDropdown
                      options={subjects.map((s) => s.value)}
                      value={selectedSubject}
                      onChange={setSelectedSubject}
                      placeholder="Subject"
                    />

                    <CustomDropdown
                      options={classes.map((c) => c.value)}
                      value={selectedClass}
                      onChange={setSelectedClass}
                      placeholder="Class"
                    />
                  </div>

                  <PremiumSearchButton onClick={handleSearch} className="mt-8" />
                </div>

                <div className="animate-cards-container overflow-visible">
                  {showResults && isFetching && (
                    <p className="mb-4 text-center text-[16px] text-[#555]">
                      Loading...
                    </p>
                  )}

                  {showResults && !isFetching && catalogItems.length === 0 && (
                    <p className="mb-4 text-center text-[16px] text-[#555]">
                      No books found for the selected filters.
                    </p>
                  )}

                  {showResults && !isFetching && catalogItems.length > 0 && (
                    <ResourceCardGrid className={FREE_RESOURCE_CARD_GRID}>
                      {catalogItems.map((item) => (
                        <NcertBookCard
                          key={item.id}
                          item={item}
                          className="animate-card"
                        />
                      ))}
                    </ResourceCardGrid>
                  )}
                </div>
              </div>

              <aside className="animate-sidebar sticky top-[120px] mx-auto w-full max-w-[310px] shrink-0 isolate self-start space-y-7 xl:ml-auto xl:mt-[40px]">
                <FreeResourcesCourseSlider />

                {/* OUR TOPPERS */}
                <div className="toppers-card">
                  <h2 className="toppers-title">
                    <span>Our Toppers</span>
                  </h2>

                  <div className="toppers-image-area">
                    {toppers.map((topper, index) => (
                      <div
                        key={`${topper.name}-${index}`}
                        className={`topper-slide topper-slide-${index + 1}`}
                      >
                        <div className="topper-inner-card">
                          <div className="topper-image-wrap">
                            <Image
                              src={topper.image}
                              alt={topper.name}
                              fill
                              sizes="330px"
                              className="topper-img"
                            />
                          </div>

                          <div className="topper-info">
                            <span className="topper-rank">{topper.rank}</span>
                            <h3>{topper.name}</h3>
                            <p>GS Foundation Course</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="toppers-dots">
                      {toppers.map((_, index) => (
                        <span
                          key={index}
                          className={`topper-dot-${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />

      <style jsx>{`
        .toppers-card {
          width: 100%;
          overflow: hidden;
          border-radius: 18px;
          background: #dfe9f8;
          padding: 12px;
          box-shadow: 0px 8px 22px rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }

        .toppers-title {
          margin-bottom: 10px;
          text-align: center;
          font-size: 27px;
          font-weight: 900;
          line-height: 1;
        }

        .toppers-title span {
          background: linear-gradient(
            90deg,
            #3e9cdb 0%,
            #8e9bc8 38%,
            #d57e89 72%,
            #e53935 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .toppers-image-area {
          position: relative;
          height: 330px;
          width: 100%;
          overflow: hidden;
          border-radius: 14px;
        }

        .topper-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(100%);
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
        }

        .topper-slide-1 {
          opacity: 1;
          transform: translateX(0);
        }

        .topper-inner-card {
          width: 100%;
          max-width: 248px;
          height: 310px;
          border-radius: 16px;
          background: linear-gradient(
            180deg,
            rgba(233, 243, 255, 0.98) 0%,
            rgba(223, 233, 248, 0.96) 48%,
            rgba(213, 228, 247, 0.98) 100%
          );
          overflow: hidden;
          box-shadow:
            inset 0px 0px 18px rgba(255, 255, 255, 0.55),
            0px 10px 26px rgba(60, 100, 150, 0.14);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* IMAGE SIZE INCREASED, MAIN CARD SAME */
        .topper-image-wrap {
          position: relative;
          width: 100%;
          height: 248px;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            rgba(232, 243, 255, 0.65) 0%,
            rgba(223, 233, 248, 0.2) 100%
          );
        }

        .topper-img {
          object-fit: contain;
          object-position: center bottom;
          transform: scale(1.08);
        }

        .topper-info {
          padding: 5px 8px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
        }

        .topper-rank {
          border-radius: 999px;
          background: #ff9800;
          padding: 3px 11px;
          font-size: 10px;
          font-weight: 900;
          line-height: 1;
          color: #ffffff;
        }

        .topper-info h3 {
          font-size: 14px;
          font-weight: 900;
          line-height: 1.1;
          color: #333333;
        }

        .topper-info p {
          font-size: 10px;
          font-weight: 500;
          color: #555555;
        }

        .toppers-card:hover .topper-slide-1 {
          animation: topperMove1 28s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-2 {
          animation: topperMove2 28s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-3 {
          animation: topperMove3 28s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-4 {
          animation: topperMove4 28s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-5 {
          animation: topperMove5 28s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-6 {
          animation: topperMove6 28s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-7 {
          animation: topperMove7 28s infinite ease-in-out;
        }

        @keyframes topperMove1 {
          0%,
          11% {
            opacity: 1;
            transform: translateX(0);
          }

          14.28%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes topperMove2 {
          0%,
          11% {
            opacity: 1;
            transform: translateX(100%);
          }

          14.28%,
          25% {
            opacity: 1;
            transform: translateX(0);
          }

          28.56%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes topperMove3 {
          0%,
          25% {
            opacity: 1;
            transform: translateX(100%);
          }

          28.56%,
          39% {
            opacity: 1;
            transform: translateX(0);
          }

          42.84%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes topperMove4 {
          0%,
          39% {
            opacity: 1;
            transform: translateX(100%);
          }

          42.84%,
          53% {
            opacity: 1;
            transform: translateX(0);
          }

          57.12%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes topperMove5 {
          0%,
          53% {
            opacity: 1;
            transform: translateX(100%);
          }

          57.12%,
          67% {
            opacity: 1;
            transform: translateX(0);
          }

          71.4%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes topperMove6 {
          0%,
          67% {
            opacity: 1;
            transform: translateX(100%);
          }

          71.4%,
          81% {
            opacity: 1;
            transform: translateX(0);
          }

          85.68%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes topperMove7 {
          0%,
          81% {
            opacity: 1;
            transform: translateX(100%);
          }

          85.68%,
          96% {
            opacity: 1;
            transform: translateX(0);
          }

          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        .toppers-dots {
          position: absolute;
          left: 50%;
          bottom: 8px;
          z-index: 10;
          display: flex;
          gap: 7px;
          transform: translateX(-50%);
        }

        .toppers-dots span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
        }

        .toppers-card:hover .topper-dot-1 {
          animation: activeTopperDot1 28s infinite;
        }

        .toppers-card:hover .topper-dot-2 {
          animation: activeTopperDot2 28s infinite;
        }

        .toppers-card:hover .topper-dot-3 {
          animation: activeTopperDot3 28s infinite;
        }

        .toppers-card:hover .topper-dot-4 {
          animation: activeTopperDot4 28s infinite;
        }

        .toppers-card:hover .topper-dot-5 {
          animation: activeTopperDot5 28s infinite;
        }

        .toppers-card:hover .topper-dot-6 {
          animation: activeTopperDot6 28s infinite;
        }

        .toppers-card:hover .topper-dot-7 {
          animation: activeTopperDot7 28s infinite;
        }

        @keyframes activeTopperDot1 {
          0%,
          11% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          14.28%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes activeTopperDot2 {
          0%,
          11% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          14.28%,
          25% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          28.56%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes activeTopperDot3 {
          0%,
          25% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          28.56%,
          39% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          42.84%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes activeTopperDot4 {
          0%,
          39% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          42.84%,
          53% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          57.12%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes activeTopperDot5 {
          0%,
          53% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          57.12%,
          67% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          71.4%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes activeTopperDot6 {
          0%,
          67% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          71.4%,
          81% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          85.68%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes activeTopperDot7 {
          0%,
          81% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          85.68%,
          96% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @media (max-width: 1023px) {
          .toppers-card {
            padding: 12px;
          }

          .toppers-title {
            font-size: 24px;
          }

          .toppers-image-area {
            height: 300px;
          }

          .topper-inner-card {
            max-width: 230px;
            height: 285px;
          }

          .topper-image-wrap {
            height: 228px;
          }

          .topper-img {
            transform: scale(1.05);
          }

          .topper-info {
            padding-top: 4px;
            gap: 3px;
          }

          .topper-info h3 {
            font-size: 16px;
          }

          .topper-info p {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}
