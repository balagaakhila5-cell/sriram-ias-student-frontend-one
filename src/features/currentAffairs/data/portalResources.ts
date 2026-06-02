/** Re-exports from shared resources catalog for student portal compatibility */
export type {
  CurrentAffairsSubtopicId,
  CatalogDocument as PortalDocumentItem,
  CatalogPracticeTest as PortalPracticeItem,
} from "@/features/resources/catalog/types";

export {
  PORTAL_FILTER_MONTHS,
  PORTAL_FILTER_YEARS,
  dailyPracticeItems,
  listCurrentAffairsDocuments,
  listPracticeTests,
  buildTextDateOptions,
  toPortalDocument,
} from "@/features/resources/catalog/currentAffairs";

import { listCurrentAffairsDocuments } from "@/features/resources/catalog/currentAffairs";

export const dailyCurrentAffairsItems = listCurrentAffairsDocuments(
  "daily-current-affairs",
);
export const infographicsItems = listCurrentAffairsDocuments("infographics");
export const monthlyMagazineItems = listCurrentAffairsDocuments("monthly-magazine");
export const monthlyRecapItems = listCurrentAffairsDocuments("monthly-recap");

export const allCurrentAffairsDocuments = [
  ...dailyCurrentAffairsItems,
  ...infographicsItems,
  ...monthlyMagazineItems,
  ...monthlyRecapItems,
];
