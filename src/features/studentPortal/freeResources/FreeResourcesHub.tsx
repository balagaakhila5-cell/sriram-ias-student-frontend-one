"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "@/lib/appRouter";
import StudyMaterialsExamTabs from "@/components/common/StudyMaterialsExamTabs";
import DpqExamTabs from "@/features/studentPortal/components/DpqExamTabs";
import FilterBar from "@/features/studentPortal/components/FilterBar";
import SubNavToggle from "@/features/studentPortal/components/SubNavToggle";
import {
  isStudentResourceTab,
  resolvePortalSubtopic,
} from "@/features/resources/catalog/routes";
import type { CurrentAffairsSubtopicId } from "@/features/currentAffairs/data/portalResources";
import CurrentAffairsResourceGrid from "./components/CurrentAffairsResourceGrid";
import FreeResourcesSubtopicPanel from "./components/FreeResourcesSubtopicPanel";
import {
  DEFAULT_SUBTOPIC_BY_TAB,
  RESOURCE_TABS,
  freeResourcesUsesStudyMaterialsTabs,
  getSubtopicsForTab,
  type StudyMaterialsExamType,
} from "./config";
import {
  buildDayOnlyOptions,
  buildResourceFilters,
  CA_FILTER_YEARS,
  currentAffairsUsesExamTabs,
  NCERT_CLASS_OPTIONS,
  PORTAL_DPQ_DEFAULT_DAY,
  previousYearUsesExamTabs,
  mockTestsUsesExamTabs,
  PYQ_SELECT_PAPER_OPTIONS,
  PYQ_YEAR_OPTIONS,
} from "./resourceFilters";
import type {
  FreeResourcesSubtopicId,
  StudentResourceTab,
  StudentSubtopicId,
} from "./types";

interface FreeResourcesHubProps {
  /** Route default: free-resources page opens on Free Resources tab */
  initialTab?: StudentResourceTab;
}

export default function FreeResourcesHub({
  initialTab = "current-affairs",
}: FreeResourcesHubProps) {
  const searchParams = useSearchParams();
  const urlTab = searchParams.get("tab");
  const urlSubtopic = searchParams.get("subtopic");

  const resolvedInitialTab = isStudentResourceTab(urlTab) ? urlTab : initialTab;
  const resolvedInitialSubtopic = resolvePortalSubtopic(
    resolvedInitialTab,
    urlSubtopic,
  ) as StudentSubtopicId;

  const [tab, setTab] = useState<StudentResourceTab>(resolvedInitialTab);
  const [year, setYear] = useState<string>(CA_FILTER_YEARS[0]);
  const [month, setMonth] = useState<string>("April");
  const [date, setDate] = useState<string>(PORTAL_DPQ_DEFAULT_DAY);
  const [pyqYear, setPyqYear] = useState<string>(PYQ_YEAR_OPTIONS[0]);
  const [pyqSelectPaper, setPyqSelectPaper] = useState<string>(
    PYQ_SELECT_PAPER_OPTIONS[0],
  );
  const [ncertClass, setNcertClass] = useState<string>(NCERT_CLASS_OPTIONS[0]);
  const [dpqExamType, setDpqExamType] = useState<"prelims" | "mains">("prelims");
  const [pyqExamType, setPyqExamType] = useState<"prelims" | "mains">("prelims");
  const [mockExamType, setMockExamType] = useState<"prelims" | "mains">("prelims");
  const [studyExamType, setStudyExamType] =
    useState<StudyMaterialsExamType>("prelims");
  const [subtopic, setSubtopic] = useState<StudentSubtopicId>(
    resolvedInitialSubtopic,
  );

  useEffect(() => {
    if (!isStudentResourceTab(urlTab)) return;
    setTab(urlTab);
    setSubtopic(resolvePortalSubtopic(urlTab, urlSubtopic) as StudentSubtopicId);
  }, [urlTab, urlSubtopic]);

  const subtopicOptions = useMemo(() => getSubtopicsForTab(tab), [tab]);

  const handleSubtopicChange = useCallback((id: StudentSubtopicId) => {
    setSubtopic(id);
  }, []);

  useEffect(() => {
    const isValid = subtopicOptions.some((option) => option.id === subtopic);
    if (!isValid) {
      setSubtopic(DEFAULT_SUBTOPIC_BY_TAB[tab]);
    }
  }, [tab, subtopic, subtopicOptions]);

  useEffect(() => {
    if (subtopic !== "daily-practice-questions") return;
    const options = buildDayOnlyOptions(month, year);
    setDate((current) =>
      options.includes(current) ? current : options[0] ?? PORTAL_DPQ_DEFAULT_DAY,
    );
  }, [month, year, subtopic]);

  const handleTabChange = (nextTab: StudentResourceTab) => {
    setTab(nextTab);
    setSubtopic(DEFAULT_SUBTOPIC_BY_TAB[nextTab]);
  };

  const filters = buildResourceFilters(
    tab,
    subtopic,
    {
      year,
      month,
      date,
      pyqYear,
      pyqSelectPaper,
      ncertClass,
    },
    {
      setYear,
      setMonth,
      setDate,
      setPyqYear,
      setPyqSelectPaper,
      setNcertClass,
      setSubtopic: handleSubtopicChange,
    },
  );

  const showDpqExamTabs = currentAffairsUsesExamTabs(subtopic);
  const showPyqExamTabs =
    tab === "free-resources" && previousYearUsesExamTabs(subtopic);
  const showMockExamTabs =
    tab === "free-resources" && mockTestsUsesExamTabs(subtopic);
  const showStudyMaterialsTabs =
    tab === "free-resources" && freeResourcesUsesStudyMaterialsTabs(subtopic);

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <SubNavToggle
          options={RESOURCE_TABS}
          active={tab}
          onChange={handleTabChange}
        />
      </div>

      <div className="mx-auto w-full max-w-[1200px] overflow-visible px-2 sm:px-4">
        <FilterBar
          filters={filters}
          layout={
            showDpqExamTabs
              ? "dpq"
              : subtopic === "ncert-books"
                ? "centered"
                : "default"
          }
        />
      </div>

      {showDpqExamTabs ? (
        <DpqExamTabs
          activeTab={dpqExamType}
          onChange={setDpqExamType}
          className="mx-auto w-full max-w-[900px]"
        />
      ) : null}

      {showPyqExamTabs ? (
        <DpqExamTabs
          activeTab={pyqExamType}
          onChange={setPyqExamType}
          className="mx-auto w-full max-w-[900px]"
        />
      ) : null}

      {showMockExamTabs ? (
        <DpqExamTabs
          activeTab={mockExamType}
          onChange={setMockExamType}
          className="mx-auto w-full max-w-[900px]"
        />
      ) : null}

      {showStudyMaterialsTabs ? (
        <StudyMaterialsExamTabs
          activeTab={studyExamType}
          onChange={setStudyExamType}
          className="mx-auto w-full max-w-[900px]"
        />
      ) : null}

      {tab === "current-affairs" ? (
        <CurrentAffairsResourceGrid
          key={`ca-${subtopic}-${dpqExamType}`}
          subtopic={subtopic as CurrentAffairsSubtopicId}
          year={year}
          month={month}
          date={date}
          examType={dpqExamType}
        />
      ) : (
        <FreeResourcesSubtopicPanel
          key={`fr-${subtopic}-${subtopic === "previous-year" ? pyqExamType : subtopic === "free-mocktests" ? mockExamType : subtopic === "study-materials" ? studyExamType : ""}`}
          subtopic={subtopic as FreeResourcesSubtopicId}
          studyExamType={studyExamType}
          mockExamType={mockExamType}
          pyqYear={pyqYear}
          pyqSelectPaper={pyqSelectPaper}
          pyqExamType={pyqExamType}
          ncertClass={ncertClass}
        />
      )}
    </div>
  );
}
