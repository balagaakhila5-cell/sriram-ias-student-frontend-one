"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Courses from "@/components/common/Courses";
import CustomDropdown from "@/components/common/CustomDropdown";
import FloatingActions from "@/components/common/FloatingActions";
import { PremiumSearchButton } from "@/components/common/ResourceFilterButtons";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import { listFreeResourceDocuments } from "@/features/resources/catalog/freeResources";
import { mapApiFilesToCatalog } from "@/features/resources/utils/mapApiToCatalog";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import { FREE_RESOURCE_CARD_GRID } from "@/features/resources/components/cardStyles";
import {
  findCategoryByKey,
  findSubCategoryByName,
  useResourceCategories,
  useResourceFiles,
  useResourceFilters,
  useResourceSubCategories,
} from "@/features/resources/hooks/useResources";

type ExamSection = "prelims" | "mains";

interface PyqQuestionPapersPageProps {
  section: ExamSection;
}

export default function PyqQuestionPapersPage({ section }: PyqQuestionPapersPageProps) {
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
    () => papers.find((p) => p.value === selectedPaper)?._id,
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
      undefined,
      undefined,
      section,
    );
    return mapApiFilesToCatalog(files, "previous-year", fallback, 10).map(
      (item) => ({
        ...item,
        image: RESOURCE_ASSETS.PDF_ICON,
      }),
    );
  }, [files, showResults, section]);

  const handleSearch = () => {
    setHasSearched(true);
    setAppliedFilters({ paperId, yearId });
  };

  return (
    <>
      <Header />
      <main className="bg-[#f7f7f7] font-['Montserrat',sans-serif]">
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

        <section className="relative bg-[#f7f7f7] bg-[url('/assets/bg-wave.png')] bg-cover bg-center bg-no-repeat px-6 py-12 lg:px-16 lg:py-14">
          <div className="mx-auto max-w-[1500px]">
            <h1 className="mb-10 text-center text-[36px] font-extrabold uppercase leading-[0.95] md:text-[48px] lg:text-[56px]">
              <span className="bg-[linear-gradient(90deg,#3E9CDB_0%,#9A8FB6_45%,#D57E89_75%,#E53935_100%)] bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div>
                <div className="relative z-[60] mb-10">
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
                  <PremiumSearchButton onClick={handleSearch} className="mt-8" />
                </div>

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
                  <ResourceCardGrid className={FREE_RESOURCE_CARD_GRID}>
                    {catalogItems.map((item) => (
                      <ResourceDocumentCard
                        key={item.id}
                        item={item}
                        singleRowActions
                      />
                    ))}
                  </ResourceCardGrid>
                )}
              </div>

              <aside className="mx-auto w-full max-w-[380px] space-y-8 xl:ml-auto xl:mt-[40px]">
                <Courses />
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
