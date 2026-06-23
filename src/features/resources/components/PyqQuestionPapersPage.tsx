"use client";



import { useMemo, useRef, useState } from "react";

import Image from "@/components/common/AppImage";

import gsap from "gsap";

import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";

import Footer from "@/components/common/Footer";

import PyqExamSidebar from "@/features/resources/components/PyqExamSidebar";

import CustomDropdown from "@/components/common/CustomDropdown";

import FloatingActions from "@/components/common/FloatingActions";

import { PremiumSearchButton } from "@/components/common/ResourceFilterButtons";

import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import { buildPyqCardTitle } from "@/features/resources/utils/pyqCardTitle";

import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";

import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";

import PyqPaperCard from "@/features/resources/components/PyqPaperCard";

import PaginatedPdfGrid from "@/features/resources/components/PaginatedPdfGrid";

import {
  PYQ_SELECT_PAPER_OPTIONS,
  PYQ_YEAR_OPTIONS,
  filterCatalogByPyqPaper,
  resolvePyqPaperId,
} from "@/features/resources/constants/pyqFilters";

import {
  FREE_RESOURCE_CARD_GRID,
  RESOURCE_PAGE_HEADING_GRADIENT,
  RESOURCE_SECTION_SHELL,
  RESOURCE_SECTION_WAVE_OVERLAY,
} from "@/features/resources/components/cardStyles";

import {

  findCategoryByKey,

  findSubCategoryByName,

  useResourceCategories,

  useResourceFiles,

  useResourceFilters,

  useResourceSubCategories,

} from "@/features/resources/hooks/useResources";



gsap.registerPlugin(ScrollTrigger);



type ExamSection = "prelims" | "mains";



interface PyqQuestionPapersPageProps {

  section: ExamSection;

}



export default function PyqQuestionPapersPage({ section }: PyqQuestionPapersPageProps) {

  const containerRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();



  const [selectedPaper, setSelectedPaper] = useState("");

  const [selectedYear, setSelectedYear] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState<{

    paperId?: string;

    yearId?: string;

  }>({});



  const title =

    section === "prelims" ? "PRELIMS QUESTION PAPERS" : "MAINS QUESTION PAPERS";



  const { data: categories } = useResourceCategories();

  const pyqCategory = useMemo(

    () => findCategoryByKey(categories, "PYQ"),

    [categories],

  );

  const categoryId = pyqCategory?._id;



  const { data: subCategories } = useResourceSubCategories(categoryId);

  const subCategory = useMemo(

    () => findSubCategoryByName(subCategories, section),

    [subCategories, section],

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

      const subId =

        typeof sub === "string"

          ? sub

          : (sub as { _id?: string } | undefined)?._id;

      return !subId || subId === subCategoryId;

    });

    return filtered.filter(

      (p, i, arr) => arr.findIndex((x) => x.value === p.value) === i,

    );

  }, [allPapers, subCategoryId]);



  const { data: years = [] } = useResourceFilters(

    { type: "YEAR", categoryId },

    !!categoryId,

  );



  const paperId = useMemo(

    () => resolvePyqPaperId(papers, selectedPaper),

    [papers, selectedPaper],

  );

  const yearId = useMemo(

    () => years.find((y) => y.value === selectedYear)?._id,

    [years, selectedYear],

  );



  const showResults = hasSearched;



  const { data: files = [], isFetching } = useResourceFiles(

    {

      categoryId,

      subCategoryId,

      paperId: appliedFilters.paperId,

      yearId: appliedFilters.yearId,

    },

    !!categoryId && !!subCategoryId && showResults,

  );



  const catalogItems = useMemo(() => {

    if (!showResults) return [];

    const fallback = listFreeResourceDocuments(

      "previous-year",

      selectedYear || undefined,

      undefined,

      section,

    );

    const mapped = mapApiFilesToCatalog(files, "previous-year", fallback, 50).map(

      (item, index) => ({

        ...item,

        title: buildPyqCardTitle(section, index + 1),

        image: RESOURCE_ASSETS.PDF_ICON,

      }),

    );

    const byYear = selectedYear

      ? mapped.filter((item) => !item.year || item.year === selectedYear)

      : mapped;

    return filterCatalogByPyqPaper(byYear, selectedPaper);

  }, [files, showResults, section, selectedPaper, selectedYear]);



  useGSAP(

    () => {

      if (prefersReducedMotion) return;



      gsap.fromTo(

        ".animate-heading",

        { y: 50, opacity: 0 },

        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },

      );



      gsap.fromTo(

        ".animate-filters",

        { y: 30, opacity: 0 },

        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 },

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

        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },

      );

    },

    { scope: containerRef, dependencies: [prefersReducedMotion, showResults] },

  );



  const handleSearch = () => {

    setHasSearched(true);

    setAppliedFilters({ paperId, yearId });

  };



  return (

    <>

      <Header />

      <main

        ref={containerRef}

        className="bg-[#f7f7f7] font-['Montserrat',sans-serif]"

      >

        <section className="relative h-[320px] w-full overflow-hidden md:h-[400px] lg:h-[470px]">

          <Image

            src="/assets/free-resources/previous-year/previous-year.png"

            alt="Previous Year Banner"

            fill

            priority

            className="object-cover"

          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_15.33%,rgba(0,0,0,0.1)_50.97%)]" />

        </section>



        <section className={`${RESOURCE_SECTION_SHELL} px-6 py-12 lg:px-16 lg:py-14`}>
          <div className={RESOURCE_SECTION_WAVE_OVERLAY} aria-hidden />
          <div className="relative z-10 mx-auto max-w-[1500px]">

            <h1 className="animate-heading mb-10 pl-6 text-left text-[36px] font-extrabold uppercase leading-[0.95] md:pl-10 md:text-[48px] lg:pl-14 lg:text-[56px]">

              <span className={RESOURCE_PAGE_HEADING_GRADIENT}>

                {title}

              </span>

            </h1>



            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">

              <div>

                <div className="animate-filters relative z-[60] mb-10 pl-6 md:pl-10 lg:pl-14">

                  <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-6">

                    <div className="flex w-full flex-col gap-5 sm:flex-row sm:gap-6">

                      <CustomDropdown

                        variant="filter"

                        options={[...PYQ_SELECT_PAPER_OPTIONS]}

                        value={selectedPaper}

                        onChange={setSelectedPaper}

                        placeholder="Select Paper"
                        buttonLabel="Select Paper"

                      />

                      <CustomDropdown

                        variant="filter"

                        options={[...PYQ_YEAR_OPTIONS]}

                        value={selectedYear}

                        onChange={setSelectedYear}

                        placeholder="Year"
                        buttonLabel="Year"

                      />

                    </div>

                    <PremiumSearchButton

                      variant="solid"

                      onClick={handleSearch}

                    />

                  </div>

                </div>



                <div className="animate-cards-container overflow-visible px-1 py-2 pl-6 md:pl-10 lg:pl-14">

                  {showResults && isFetching && (

                    <p className="mb-4 text-center text-[16px] text-[#555]">

                      Loading...

                    </p>

                  )}

                  {showResults && !isFetching && catalogItems.length === 0 && (

                    <p className="mb-4 text-center text-[16px] text-[#555]">

                      No question papers found for the selected filters.

                    </p>

                  )}

                  {showResults && !isFetching && catalogItems.length > 0 && (

                    <PaginatedPdfGrid
                      items={catalogItems}
                      gridClassName={FREE_RESOURCE_CARD_GRID}
                      resetKey={`${section}-${selectedPaper}-${selectedYear}`}
                      getKey={(item) => item.id}
                      renderItem={(item) => (
                        <div className="animate-card min-w-0">
                          <PyqPaperCard item={item} />
                        </div>
                      )}
                    />

                  )}

                </div>

              </div>



              <aside className="animate-sidebar sticky top-[120px] mx-auto w-full max-w-[310px] shrink-0 isolate self-start xl:ml-auto xl:mt-[40px]">

                <PyqExamSidebar />

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

