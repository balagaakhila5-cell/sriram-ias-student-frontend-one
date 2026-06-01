"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import ExamTypeTabs from "@/components/common/ExamTypeTabs";
import StudyMaterialsExamTabs from "@/components/common/StudyMaterialsExamTabs";
import { buildDateFilterOptions } from "@/features/resources/catalog/currentAffairs";
import { PORTAL_DPQ_DATE_OPTIONS } from "./resourceFilters";
import FilterBar from "@/features/studentPortal/components/FilterBar";
import SubNavToggle from "@/features/studentPortal/components/SubNavToggle";
import type { CurrentAffairsSubtopicId } from "@/features/currentAffairs/data/portalResources";
import ResourcesGridSkeleton from "./components/ResourcesGridSkeleton";
import {
  DEFAULT_SUBTOPIC_BY_TAB,
  RESOURCE_TABS,
  freeResourcesUsesStudyMaterialsTabs,
  getSubtopicsForTab,
  type StudyMaterialsExamType,
} from "./config";
import {
  buildResourceFilters,
  CA_FILTER_YEARS,
  currentAffairsUsesExamTabs,
  MOCK_EXAM_OPTIONS,
  NCERT_CLASS_OPTIONS,
  PYQ_PAPER_OPTIONS,
  PYQ_YEAR_OPTIONS,
  type MockExamFilter,
  type PyqPaperFilter,
} from "./resourceFilters";
import type {
  FreeResourcesSubtopicId,
  StudentResourceTab,
  StudentSubtopicId,
} from "./types";

const CurrentAffairsResourceGrid = dynamic(
  () => import("./components/CurrentAffairsResourceGrid"),
  { loading: () => <ResourcesGridSkeleton /> },
);

const FreeResourcesSubtopicPanel = dynamic(
  () => import("./components/FreeResourcesSubtopicPanel"),
  { loading: () => <ResourcesGridSkeleton /> },
);

export default function FreeResourcesHub() {
  const [tab, setTab] = useState<StudentResourceTab>("current-affairs");
  const [year, setYear] = useState<string>(CA_FILTER_YEARS[0]);
  const [month, setMonth] = useState<string>("April");
  const [date, setDate] = useState<string>(PORTAL_DPQ_DATE_OPTIONS[0]);
  const [paper, setPaper] = useState<PyqPaperFilter>(PYQ_PAPER_OPTIONS[0]);
  const [pyqYear, setPyqYear] = useState<string>(PYQ_YEAR_OPTIONS[0]);
  const [mockExam, setMockExam] = useState<MockExamFilter>(MOCK_EXAM_OPTIONS[0]);
  const [ncertClass, setNcertClass] = useState<string>(NCERT_CLASS_OPTIONS[0]);
  const [dpqExamType, setDpqExamType] = useState<"prelims" | "mains">("prelims");
  const [studyExamType, setStudyExamType] =
    useState<StudyMaterialsExamType>("prelims");
  const [subtopic, setSubtopic] = useState<StudentSubtopicId>(
    DEFAULT_SUBTOPIC_BY_TAB["current-affairs"],
  );

  const subtopicOptions = useMemo(() => getSubtopicsForTab(tab), [tab]);

  useEffect(() => {
    const isValid = subtopicOptions.some((option) => option.id === subtopic);
    if (!isValid) {
      setSubtopic(DEFAULT_SUBTOPIC_BY_TAB[tab]);
    }
  }, [tab, subtopic, subtopicOptions]);

  useEffect(() => {
    if (subtopic === "daily-practice-questions") return;
    const options = buildDateFilterOptions(month, year);
    setDate((current) =>
      options.includes(current) ? current : options[0] ?? current,
    );
  }, [month, year, subtopic]);

  const handleTabChange = (nextTab: StudentResourceTab) => {
    setTab(nextTab);
    setSubtopic(DEFAULT_SUBTOPIC_BY_TAB[nextTab]);
  };

  const filters = useMemo(
    () =>
      buildResourceFilters(
        tab,
        subtopic,
        {
          year,
          month,
          date,
          paper,
          pyqYear,
          mockExam,
          ncertClass,
        },
        {
          setYear,
          setMonth,
          setDate,
          setPaper,
          setPyqYear,
          setMockExam,
          setNcertClass,
          setSubtopic,
        },
      ),
    [tab, subtopic, year, month, date, paper, pyqYear, mockExam, ncertClass],
  );

  const showDpqExamTabs = currentAffairsUsesExamTabs(subtopic);
  const showStudyMaterialsTabs =
    tab === "free-resources" && freeResourcesUsesStudyMaterialsTabs(subtopic);

  const mockExamType =
    mockExam.toLowerCase() as "prelims" | "mains";

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <SubNavToggle
          options={RESOURCE_TABS}
          active={tab}
          onChange={handleTabChange}
        />
      </div>

      <div className="flex justify-center">
        <FilterBar filters={filters} />
      </div>

      {showDpqExamTabs ? (
        <ExamTypeTabs
          activeTab={dpqExamType}
          onChange={setDpqExamType}
          className="mx-auto w-full max-w-[720px]"
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
          subtopic={subtopic as CurrentAffairsSubtopicId}
          year={year}
          month={month}
          date={date}
          examType={dpqExamType}
        />
      ) : (
        <FreeResourcesSubtopicPanel
          subtopic={subtopic as FreeResourcesSubtopicId}
          studyExamType={studyExamType}
          mockExamType={mockExamType}
          paper={paper}
          pyqYear={pyqYear}
          ncertClass={ncertClass}
        />
      )}
    </div>
  );
}
