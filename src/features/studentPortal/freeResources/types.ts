import type { CurrentAffairsSubtopicId } from "@/features/currentAffairs/data/portalResources";

export type StudentResourceTab = "current-affairs" | "free-resources";

export type FreeResourcesSubtopicId =
  | "free-mocktests"
  | "ncert-books"
  | "previous-year"
  | "study-materials";

export type StudentSubtopicId = CurrentAffairsSubtopicId | FreeResourcesSubtopicId;

export interface SubtopicOption {
  id: StudentSubtopicId;
  label: string;
  tab: StudentResourceTab;
}
