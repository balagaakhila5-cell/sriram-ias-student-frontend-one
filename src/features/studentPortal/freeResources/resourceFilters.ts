import type { FilterField } from "@/features/studentPortal/components/FilterBar";
import {
  buildDateFilterOptions,
} from "@/features/resources/catalog/currentAffairs";
import type { StudentResourceTab, StudentSubtopicId } from "./types";
import { getSubtopicsForTab } from "./config";

export const CA_FILTER_YEARS = ["2026", "2025", "2024"] as const;

/** Daily Practice — single date dropdown options (student portal) */
export const PORTAL_DPQ_DATE_OPTIONS = buildDateFilterOptions("April", "2026");
export const CA_FILTER_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const PYQ_PAPER_OPTIONS = ["CSAT", "General Studies"] as const;
export const PYQ_YEAR_OPTIONS = ["2026", "2025", "2024"] as const;

export const MOCK_EXAM_OPTIONS = ["Prelims", "Mains"] as const;

export const NCERT_CLASS_OPTIONS = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
] as const;

export type PyqPaperFilter = (typeof PYQ_PAPER_OPTIONS)[number];
export type MockExamFilter = (typeof MOCK_EXAM_OPTIONS)[number];

interface FilterState {
  year: string;
  month: string;
  date: string;
  paper: PyqPaperFilter;
  pyqYear: string;
  mockExam: MockExamFilter;
  ncertClass: string;
}

interface FilterHandlers {
  setYear: (v: string) => void;
  setMonth: (v: string) => void;
  setDate: (v: string) => void;
  setPaper: (v: PyqPaperFilter) => void;
  setPyqYear: (v: string) => void;
  setMockExam: (v: MockExamFilter) => void;
  setNcertClass: (v: string) => void;
  setSubtopic: (id: StudentSubtopicId) => void;
}

export function currentAffairsUsesExamTabs(subtopic: StudentSubtopicId): boolean {
  return subtopic === "daily-practice-questions";
}

function createSubtopicField(
  tab: StudentResourceTab,
  subtopic: StudentSubtopicId,
  handlers: FilterHandlers,
): FilterField {
  const subtopicOptions = getSubtopicsForTab(tab);
  return {
    id: "subtopic",
    value:
      subtopicOptions.find((option) => option.id === subtopic)?.label ??
      subtopicOptions[0]?.label ??
      "",
    onChange: (label: string) => {
      const match = subtopicOptions.find((option) => option.label === label);
      if (match) handlers.setSubtopic(match.id);
    },
    options: subtopicOptions.map((option) => option.label),
  };
}

export function buildResourceFilters(
  tab: StudentResourceTab,
  subtopic: StudentSubtopicId,
  state: FilterState,
  handlers: FilterHandlers,
): FilterField[] {
  const subtopicField = createSubtopicField(tab, subtopic, handlers);

  if (tab === "current-affairs") {
    switch (subtopic) {
      case "daily-practice-questions":
        return [
          {
            id: "date",
            value: state.date,
            onChange: handlers.setDate,
            options: [...PORTAL_DPQ_DATE_OPTIONS],
          },
          subtopicField,
        ];
      case "daily-current-affairs":
      case "monthly-magazine":
      case "monthly-recap":
      case "infographics":
        return [
          {
            id: "year",
            value: state.year,
            onChange: handlers.setYear,
            options: [...CA_FILTER_YEARS],
          },
          {
            id: "month",
            value: state.month,
            onChange: handlers.setMonth,
            options: [...CA_FILTER_MONTHS],
          },
          subtopicField,
        ];
      default:
        return [subtopicField];
    }
  }

  switch (subtopic) {
    case "study-materials":
      return [subtopicField];
    case "previous-year":
      return [
        {
          id: "paper",
          value: state.paper,
          onChange: (v) => handlers.setPaper(v as PyqPaperFilter),
          options: [...PYQ_PAPER_OPTIONS],
        },
        {
          id: "year",
          value: state.pyqYear,
          onChange: handlers.setPyqYear,
          options: [...PYQ_YEAR_OPTIONS],
        },
        subtopicField,
      ];
    case "free-mocktests":
      return [
        {
          id: "exam",
          value: state.mockExam,
          onChange: (v) => handlers.setMockExam(v as MockExamFilter),
          options: [...MOCK_EXAM_OPTIONS],
        },
        subtopicField,
      ];
    case "ncert-books":
      return [
        {
          id: "class",
          value: state.ncertClass,
          onChange: handlers.setNcertClass,
          options: [...NCERT_CLASS_OPTIONS],
        },
        subtopicField,
      ];
    default:
      return [subtopicField];
  }
}
