import type { FilterField } from "@/features/studentPortal/components/FilterBar";
import { buildPyqCardTitle } from "@/features/resources/utils/pyqCardTitle";
import type { StudentResourceTab, StudentSubtopicId } from "./types";
import { getSubtopicsForTab } from "./config";

const DAYS_IN_MONTH: Record<string, number> = {
  January: 31,
  February: 29,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

/** Daily practice — day numbers only (no month/year in the dropdown) */
export function buildDayOnlyOptions(month: string, _year: string): string[] {
  const count = DAYS_IN_MONTH[month] ?? 30;
  return Array.from({ length: count }, (_, i) => String(i + 1));
}

export const CA_FILTER_YEARS = ["2026", "2025", "2024"] as const;

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

export const PORTAL_DPQ_DEFAULT_DAY = "1";

import {
  PYQ_SELECT_PAPER_OPTIONS,
  PYQ_YEAR_OPTIONS,
} from "@/features/resources/constants/pyqFilters";

export { PYQ_SELECT_PAPER_OPTIONS, PYQ_YEAR_OPTIONS };

export const PYQ_SUBJECT_OPTIONS = ["CSAT", "General Studies"] as const;

/** NCERT — class labels without Arabic numerals */
export const NCERT_CLASS_OPTIONS = [
  "Class VI",
  "Class VII",
  "Class VIII",
  "Class IX",
  "Class X",
  "Class XI",
  "Class XII",
] as const;

export type PyqSubjectFilter = (typeof PYQ_SUBJECT_OPTIONS)[number];

/** @deprecated Use PyqSubjectFilter */
export type PyqPaperFilter = PyqSubjectFilter;

interface FilterState {
  year: string;
  month: string;
  date: string;
  pyqYear: string;
  pyqSelectPaper: string;
  ncertClass: string;
}

interface FilterHandlers {
  setYear: (v: string) => void;
  setMonth: (v: string) => void;
  setDate: (v: string) => void;
  setPyqYear: (v: string) => void;
  setPyqSelectPaper: (v: string) => void;
  setNcertClass: (v: string) => void;
  setSubtopic: (id: StudentSubtopicId) => void;
}

export function currentAffairsUsesExamTabs(subtopic: StudentSubtopicId): boolean {
  return subtopic === "daily-practice-questions";
}

export function previousYearUsesExamTabs(subtopic: StudentSubtopicId): boolean {
  return subtopic === "previous-year";
}

export function mockTestsUsesExamTabs(subtopic: StudentSubtopicId): boolean {
  return subtopic === "free-mocktests";
}

/** Portal PYQ card title — same labels as public Previous Year pages */
export function buildPyqPortalCardTitle(
  examType: "prelims" | "mains",
  paperNumber: number,
): string {
  return buildPyqCardTitle(examType, paperNumber);
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

/** Subtopic dropdown is always last (right) */
function filtersWithSubtopicLast(
  rest: FilterField[],
  subtopicField: FilterField,
): FilterField[] {
  return [...rest, subtopicField];
}

const yearField = (state: FilterState, handlers: FilterHandlers): FilterField => ({
  id: "year",
  value: state.year,
  onChange: handlers.setYear,
  options: [...CA_FILTER_YEARS],
});

const monthField = (state: FilterState, handlers: FilterHandlers): FilterField => ({
  id: "month",
  value: state.month,
  onChange: handlers.setMonth,
  options: [...CA_FILTER_MONTHS],
});

const dateField = (state: FilterState, handlers: FilterHandlers): FilterField => ({
  id: "date",
  value: state.date,
  onChange: handlers.setDate,
  options: buildDayOnlyOptions(state.month, state.year),
  buttonLabel: "Date",
});

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
        return filtersWithSubtopicLast(
          [
            yearField(state, handlers),
            monthField(state, handlers),
            dateField(state, handlers),
          ],
          subtopicField,
        );
      case "daily-current-affairs":
      case "monthly-magazine":
      case "monthly-recap":
      case "infographics":
        return filtersWithSubtopicLast(
          [yearField(state, handlers), monthField(state, handlers)],
          subtopicField,
        );
      default:
        return [subtopicField];
    }
  }

  switch (subtopic) {
    case "study-materials":
      return [subtopicField];
    case "previous-year":
      return filtersWithSubtopicLast(
        [
          {
            id: "select-paper",
            value: state.pyqSelectPaper,
            onChange: handlers.setPyqSelectPaper,
            options: [...PYQ_SELECT_PAPER_OPTIONS],
            buttonLabel: "Select Paper",
          },
          {
            id: "pyq-year",
            value: state.pyqYear,
            onChange: handlers.setPyqYear,
            options: [...PYQ_YEAR_OPTIONS],
            buttonLabel: "Year",
          },
        ],
        subtopicField,
      );
    case "free-mocktests":
      return [subtopicField];
    case "ncert-books":
      return filtersWithSubtopicLast(
        [
          {
            id: "class",
            value: state.ncertClass,
            onChange: handlers.setNcertClass,
            options: [...NCERT_CLASS_OPTIONS],
            buttonLabel: "Class",
          },
        ],
        subtopicField,
      );
    default:
      return [subtopicField];
  }
}
