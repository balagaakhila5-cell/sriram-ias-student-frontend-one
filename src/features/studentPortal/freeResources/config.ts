import {
  PORTAL_FILTER_MONTHS,
  PORTAL_FILTER_YEARS,
} from "@/features/currentAffairs/data/portalResources";
import type { StudentResourceTab, SubtopicOption } from "./types";

export const RESOURCE_TABS: { id: StudentResourceTab; label: string }[] = [
  { id: "current-affairs", label: "Current Affairs" },
  { id: "free-resources", label: "Free Resources" },
];

export const SUBTOPIC_OPTIONS: SubtopicOption[] = [
  {
    id: "daily-current-affairs",
    label: "Daily Current Affairs",
    tab: "current-affairs",
  },
  {
    id: "daily-practice-questions",
    label: "Daily Practice Questions",
    tab: "current-affairs",
  },
  { id: "infographics", label: "Infographics", tab: "current-affairs" },
  { id: "monthly-magazine", label: "Monthly Magazine", tab: "current-affairs" },
  { id: "monthly-recap", label: "Monthly Recap", tab: "current-affairs" },
  { id: "free-mocktests", label: "Mock Tests", tab: "free-resources" },
  { id: "ncert-books", label: "NCERT Books", tab: "free-resources" },
  { id: "previous-year", label: "Previous Year", tab: "free-resources" },
  { id: "study-materials", label: "Study Materials", tab: "free-resources" },
];

export const FILTER_YEARS = PORTAL_FILTER_YEARS;
export const FILTER_MONTHS = PORTAL_FILTER_MONTHS;

export type StudyMaterialsExamType = "prelims" | "mains" | "interview";
export type FreeResourcesExamType = "prelims" | "mains";

export const DEFAULT_SUBTOPIC_BY_TAB: Record<StudentResourceTab, SubtopicOption["id"]> =
  {
    "current-affairs": "daily-current-affairs",
    "free-resources": "free-mocktests",
  };

export function getSubtopicsForTab(tab: StudentResourceTab) {
  return SUBTOPIC_OPTIONS.filter((option) => option.tab === tab);
}

export function getSubtopicLabel(id: SubtopicOption["id"]) {
  return SUBTOPIC_OPTIONS.find((option) => option.id === id)?.label ?? id;
}

/** Free Resources — study materials uses Prelims/Mains/Interview tabs only */
export function freeResourcesUsesStudyMaterialsTabs(
  subtopic: SubtopicOption["id"],
): subtopic is "study-materials" {
  return subtopic === "study-materials";
}
