"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CustomDropdown from "@/components/common/CustomDropdown";
import FloatingActions from "@/components/common/FloatingActions";

import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import {
  resourceDownloadPath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import {
  useResourceCategories,
  useResourceFiles,
  useResourceFilters,
  findCategoryByKey,
} from "@/features/resources/hooks/useResources";

gsap.registerPlugin(ScrollTrigger);

const defaultBooks = [
  { _id: "1", title: "History - NCERT Book", fileUrl: "#" },
  { _id: "2", title: "History - NCERT Book", fileUrl: "#" },
  { _id: "3", title: "History - NCERT Book", fileUrl: "#" },
  { _id: "4", title: "History - NCERT Book", fileUrl: "#" },
  { _id: "5", title: "History - NCERT Book", fileUrl: "#" },
];

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

const courseSlides = [
  {
    image: "/assets/course_image.png",
  },
  {
    image: "/assets/free-resources/NCERT/optional-foundation-course.png",
  },
  {
    image: "/assets/free-resources/NCERT/mentorship-program.png",
  },
  {
    image: "/assets/free-resources/NCERT/test-series.png",
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
    !!categoryId
  );

  const showResults =
    "subjectId" in appliedFilters || "classId" in appliedFilters;

  const catalogItems = useMemo(() => {
    const fallback = listFreeResourceDocuments("ncert-books");
    if (!showResults) return fallback.slice(0, 6);
    return mapApiFilesToCatalog(files, "ncert-books", fallback, 6);
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".animate-cards-container",
            start: "top 85%",
          },
        }
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
                  <span className="bg-[linear-gradient(90deg,#3E9CDB_0%,#9A8FB6_42%,#D57E89_100%)] bg-clip-text text-transparent">
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

                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={handleSearch}
                      className="rounded-full bg-[linear-gradient(90deg,#167fbd_0%,#03283b_100%)] px-14 py-3 text-[18px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.03]"
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="animate-cards-container grid grid-cols-1 gap-8 overflow-visible md:grid-cols-2">
                    {isFetching && (
                      <p className="col-span-full text-center text-[16px] text-[#555]">
                        Loading...
                      </p>
                    )}

                    {!isFetching &&
                      catalogItems.map((item) => (
                        <div
                          key={item.id}
                          className="animate-card group relative z-0 origin-left rounded-[18px] bg-[#FAF8F3] px-4 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:z-30 hover:translate-x-8 hover:-translate-y-3 hover:scale-[1.12] hover:bg-[#FEF2E5] hover:shadow-[0_24px_55px_rgba(0,0,0,0.20)]"
                        >
                          <h3 className="mb-6 text-center text-[18px] font-bold leading-[100%] text-[#000000] transition-all duration-300 group-hover:text-[20px]">
                            {item.title}
                          </h3>

                          <div className="flex items-center justify-center gap-3 transition-all duration-300 group-hover:translate-x-3">
                            <Link
                              href={resourceViewPath(item)}
                              className="inline-flex min-w-[88px] items-center justify-center rounded-[10px] border border-[#58b7ea] bg-white px-5 py-2.5 text-[16px] font-bold text-[#2a9cda] transition-all duration-300 hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white"
                            >
                              Read
                            </Link>

                            <a
                              href={resourceDownloadPath(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-w-[160px] items-center justify-center rounded-[10px] border border-[#58b7ea] bg-white px-5 py-2.5 text-[16px] font-bold text-[#2a9cda] transition-all duration-300 hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white"
                            >
                              Download PDF
                            </a>
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              <aside className="animate-sidebar sticky top-[120px] mx-auto w-full max-w-[310px] self-start space-y-7 xl:ml-auto xl:mt-[40px]">
                {/* COURSES SLIDER */}
                <div className="course-slider-card">
                  <h2 className="course-slider-title">
                    <span>Courses</span>
                  </h2>

                  <div className="course-slider-image-area">
                    {courseSlides.map((course, index) => (
                      <div
                        key={`${course.image}-${index}`}
                        className={`course-slide course-slide-${index + 1}`}
                      >
                        <Image
                          src={course.image}
                          alt="Course"
                          fill
                          sizes="310px"
                          className="course-img"
                        />
                      </div>
                    ))}

                    <div className="course-dots">
                      {courseSlides.map((_, index) => (
                        <span key={index} className={`course-dot-${index + 1}`} />
                      ))}
                    </div>
                  </div>
                </div>

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
                              sizes="310px"
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

                    <div className="topper-dots">
                      {toppers.map((_, index) => (
                        <span key={index} className={`topper-dot-${index + 1}`} />
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
        .course-slider-card {
          width: 100%;
          overflow: hidden;
          border-radius: 20px;
          background: #ffffff;
          padding: 12px;
          box-shadow: 0px 8px 26px rgba(0, 0, 0, 0.07);
          cursor: pointer;
        }

        .course-slider-title {
          margin-bottom: 12px;
          text-align: center;
          font-size: 30px;
          font-weight: 900;
          line-height: 1;
        }

        .course-slider-title span {
          background: linear-gradient(
            90deg,
            #20a0e0 0%,
            #8e8fb7 45%,
            #d57e89 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .course-slider-image-area {
          position: relative;
          height: 275px;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          background: #ffffff;
        }

        .course-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(100%);
          will-change: transform, opacity;
        }

        .course-slide-1 {
          opacity: 1;
          transform: translateX(0);
        }

        .course-img {
          object-fit: cover;
          object-position: center;
          transition: transform 0.4s ease;
        }

        .course-slider-card:hover .course-img {
          transform: scale(1.04);
        }

        .course-slider-card:hover .course-slide-1 {
          animation: courseMove1 12s infinite ease-in-out;
        }

        .course-slider-card:hover .course-slide-2 {
          animation: courseMove2 12s infinite ease-in-out;
        }

        .course-slider-card:hover .course-slide-3 {
          animation: courseMove3 12s infinite ease-in-out;
        }

        .course-slider-card:hover .course-slide-4 {
          animation: courseMove4 12s infinite ease-in-out;
        }

        @keyframes courseMove1 {
          0%,
          20% {
            opacity: 1;
            transform: translateX(0);
          }

          25%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes courseMove2 {
          0%,
          20% {
            opacity: 1;
            transform: translateX(100%);
          }

          25%,
          45% {
            opacity: 1;
            transform: translateX(0);
          }

          50%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes courseMove3 {
          0%,
          45% {
            opacity: 1;
            transform: translateX(100%);
          }

          50%,
          70% {
            opacity: 1;
            transform: translateX(0);
          }

          75%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes courseMove4 {
          0%,
          70% {
            opacity: 1;
            transform: translateX(100%);
          }

          75%,
          95% {
            opacity: 1;
            transform: translateX(0);
          }

          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        .course-dots {
          position: absolute;
          left: 50%;
          bottom: 14px;
          z-index: 10;
          display: flex;
          gap: 7px;
          transform: translateX(-50%);
        }

        .course-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.78);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
        }

        .course-slider-card:hover .course-dot-1 {
          animation: courseDot1 12s infinite;
        }

        .course-slider-card:hover .course-dot-2 {
          animation: courseDot2 12s infinite;
        }

        .course-slider-card:hover .course-dot-3 {
          animation: courseDot3 12s infinite;
        }

        .course-slider-card:hover .course-dot-4 {
          animation: courseDot4 12s infinite;
        }

        @keyframes courseDot1 {
          0%,
          20% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          25%,
          100% {
            background: rgba(255, 255, 255, 0.78);
            transform: scale(1);
          }
        }

        @keyframes courseDot2 {
          0%,
          20% {
            background: rgba(255, 255, 255, 0.78);
            transform: scale(1);
          }

          25%,
          45% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          50%,
          100% {
            background: rgba(255, 255, 255, 0.78);
            transform: scale(1);
          }
        }

        @keyframes courseDot3 {
          0%,
          45% {
            background: rgba(255, 255, 255, 0.78);
            transform: scale(1);
          }

          50%,
          70% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          75%,
          100% {
            background: rgba(255, 255, 255, 0.78);
            transform: scale(1);
          }
        }

        @keyframes courseDot4 {
          0%,
          70% {
            background: rgba(255, 255, 255, 0.78);
            transform: scale(1);
          }

          75%,
          95% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          100% {
            background: rgba(255, 255, 255, 0.78);
            transform: scale(1);
          }
        }

        .toppers-card {
          width: 100%;
          overflow: hidden;
          border-radius: 20px;
          background: #dfe9f8;
          padding: 12px;
          box-shadow: 0px 8px 26px rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }

        .toppers-title {
          margin-bottom: 10px;
          text-align: center;
          font-size: 30px;
          font-weight: 900;
          line-height: 1;
        }

        .toppers-title span {
          background: linear-gradient(90deg, #4d90d2 0%, #b57b95 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .toppers-image-area {
          position: relative;
          height: 370px;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          background: #dfe9f8;
        }

        .topper-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(100%);
          will-change: transform, opacity;
        }

        .topper-slide-1 {
          opacity: 1;
          transform: translateX(0);
        }

        .toppers-card:hover .topper-slide-1 {
          animation: topperMove1 21s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-2 {
          animation: topperMove2 21s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-3 {
          animation: topperMove3 21s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-4 {
          animation: topperMove4 21s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-5 {
          animation: topperMove5 21s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-6 {
          animation: topperMove6 21s infinite ease-in-out;
        }

        .toppers-card:hover .topper-slide-7 {
          animation: topperMove7 21s infinite ease-in-out;
        }

        @keyframes topperMove1 {
          0%,
          10% {
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
          10% {
            opacity: 1;
            transform: translateX(100%);
          }

          14.28%,
          24.28% {
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
          24.28% {
            opacity: 1;
            transform: translateX(100%);
          }

          28.56%,
          38.56% {
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
          38.56% {
            opacity: 1;
            transform: translateX(100%);
          }

          42.84%,
          52.84% {
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
          52.84% {
            opacity: 1;
            transform: translateX(100%);
          }

          57.12%,
          67.12% {
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
          67.12% {
            opacity: 1;
            transform: translateX(100%);
          }

          71.4%,
          81.4% {
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
          81.4% {
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

        .topper-inner-card {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(
            180deg,
            rgba(239, 248, 255, 0.96) 0%,
            rgba(223, 233, 248, 0.98) 52%,
            rgba(211, 226, 246, 0.96) 100%
          );
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow:
            inset 0 0 22px rgba(255, 255, 255, 0.65),
            inset 0 -12px 24px rgba(91, 151, 210, 0.12),
            0 10px 24px rgba(60, 100, 150, 0.16);
        }

        .topper-image-wrap {
          position: relative;
          width: 100%;
          height: 292px;
          overflow: hidden;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(223, 233, 248, 0.92) 55%,
            rgba(211, 226, 246, 0.96) 100%
          );
        }

        .topper-img {
          object-fit: contain;
          object-position: center bottom;
          transform: scale(1.1);
          transition: transform 0.4s ease;
        }

        .toppers-card:hover .topper-img {
          transform: scale(1.15);
        }

        .topper-info {
          width: 100%;
          flex: 1;
          background: rgba(223, 233, 248, 0.92);
          padding: 5px 8px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          text-align: center;
        }

        .topper-rank {
          border-radius: 999px;
          background: #ff9800;
          padding: 4px 13px;
          font-size: 11px;
          font-weight: 900;
          line-height: 1;
          color: #ffffff;
        }

        .topper-info h3 {
          font-size: 15px;
          font-weight: 900;
          line-height: 1.1;
          color: #333333;
        }

        .topper-info p {
          font-size: 11px;
          font-weight: 500;
          color: #555555;
        }

        .topper-dots {
          position: absolute;
          left: 50%;
          bottom: 12px;
          z-index: 20;
          display: flex;
          gap: 6px;
          transform: translateX(-50%);
        }

        .topper-dots span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.22);
        }

        .toppers-card:hover .topper-dot-1 {
          animation: topperDot1 21s infinite;
        }

        .toppers-card:hover .topper-dot-2 {
          animation: topperDot2 21s infinite;
        }

        .toppers-card:hover .topper-dot-3 {
          animation: topperDot3 21s infinite;
        }

        .toppers-card:hover .topper-dot-4 {
          animation: topperDot4 21s infinite;
        }

        .toppers-card:hover .topper-dot-5 {
          animation: topperDot5 21s infinite;
        }

        .toppers-card:hover .topper-dot-6 {
          animation: topperDot6 21s infinite;
        }

        .toppers-card:hover .topper-dot-7 {
          animation: topperDot7 21s infinite;
        }

        @keyframes topperDot1 {
          0%,
          10% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          14.28%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes topperDot2 {
          0%,
          10% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          14.28%,
          24.28% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          28.56%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes topperDot3 {
          0%,
          24.28% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          28.56%,
          38.56% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          42.84%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes topperDot4 {
          0%,
          38.56% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          42.84%,
          52.84% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          57.12%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes topperDot5 {
          0%,
          52.84% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          57.12%,
          67.12% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          71.4%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes topperDot6 {
          0%,
          67.12% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          71.4%,
          81.4% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          85.68%,
          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @keyframes topperDot7 {
          0%,
          81.4% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }

          85.68%,
          96% {
            background: #ff3f6c;
            transform: scale(1.45);
          }

          100% {
            background: rgba(255, 255, 255, 0.85);
            transform: scale(1);
          }
        }

        @media (max-width: 1023px) {
          .course-slider-card {
            padding: 12px;
          }

          .course-slider-title {
            font-size: 27px;
          }

          .course-slider-image-area {
            height: 260px;
          }

          .toppers-card {
            padding: 12px;
          }

          .toppers-title {
            font-size: 27px;
          }

          .toppers-image-area {
            height: 345px;
          }

          .topper-image-wrap {
            height: 270px;
          }

          .topper-img {
            transform: scale(1.08);
          }

          .toppers-card:hover .topper-img {
            transform: scale(1.12);
          }

          .topper-info h3 {
            font-size: 15px;
          }

          .topper-info p {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
}