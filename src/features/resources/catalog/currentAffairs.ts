import { RESOURCE_ASSETS } from "./assets";
import { registerDocuments } from "./registry";
import {
  resourceDownloadPath,
  resourceSamplePath,
  resourceViewPath,
} from "./routes";
import type {
  CatalogDocument,
  CatalogPracticeTest,
  CurrentAffairsSubtopicId,
} from "./types";

const MONTHS = [
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

export const PORTAL_FILTER_YEARS = ["2026", "2025", "2024", "2023"] as const;
export const PORTAL_FILTER_MONTHS = [...MONTHS];

const PDF_ICON_SUBTOPICS = new Set<CurrentAffairsSubtopicId>([
  "daily-current-affairs",
  "infographics",
  "monthly-recap",
]);

function doc(
  subtopic: CurrentAffairsSubtopicId,
  index: number,
  title: string,
  options?: { image?: string; hasSample?: boolean; year?: string; month?: string },
): CatalogDocument {
  const year = options?.year ?? PORTAL_FILTER_YEARS[index % PORTAL_FILTER_YEARS.length];
  const month = options?.month ?? MONTHS[index % MONTHS.length];
  const defaultImage = PDF_ICON_SUBTOPICS.has(subtopic)
    ? RESOURCE_ASSETS.PDF_ICON
    : RESOURCE_ASSETS.PDF_FALLBACK;

  return {
    id: `${subtopic}-${index + 1}`,
    module: "current-affairs",
    subtopic,
    year,
    month,
    title,
    image: options?.image ?? defaultImage,
    pdfUrl: RESOURCE_ASSETS.DEFAULT_PDF,
    hasSample: options?.hasSample,
  };
}

const currentAffairsDocs: CatalogDocument[] = [
  ...Array.from({ length: 10 }, (_, i) =>
    doc("daily-current-affairs", i, "Apr 10 News today from Jammu Kashmir", {
      year: "2026",
      month: "April",
    }),
  ),
  ...Array.from({ length: 10 }, (_, i) =>
    doc("infographics", i, `Infographic summary ${i + 1}`, {
      year: "2026",
      month: "April",
    }),
  ),
  ...Array.from({ length: 10 }, (_, i) =>
    doc("monthly-magazine", i, "April Month Magazine 2026", {
      image: RESOURCE_ASSETS.MAGAZINE,
      hasSample: true,
      year: "2026",
      month: "April",
    }),
  ),
  ...Array.from({ length: 10 }, (_, i) =>
    doc("monthly-recap", i, "April Month - Recap", {
      year: "2026",
      month: "April",
    }),
  ),
];

registerDocuments(currentAffairsDocs);

export const dailyPracticeItems: CatalogPracticeTest[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `dpq-prelims-${i + 1}`,
    subtopic: "daily-practice-questions" as const,
    year: "2026",
    month: "April",
    examType: "prelims" as const,
    title: `Prelims practice test ${i + 1} - April 2026`,
    image: RESOURCE_ASSETS.PRACTICE_TEST,
    attemptPath: `/current-affairs/daily-practice-questions/prelims-test-${i + 1}`,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `dpq-mains-${i + 1}`,
    subtopic: "daily-practice-questions" as const,
    year: "2026",
    month: "April",
    examType: "mains" as const,
    title: `Mains practice test ${i + 1} - April 2026`,
    image: RESOURCE_ASSETS.PRACTICE_TEST,
    attemptPath: `/current-affairs/daily-practice-questions/mains-test-${i + 1}`,
  })),
];

export function listCurrentAffairsDocuments(
  subtopic: CurrentAffairsSubtopicId,
  year?: string,
  month?: string,
): CatalogDocument[] {
  return currentAffairsDocs.filter(
    (item) =>
      item.subtopic === subtopic &&
      (!year || item.year === year) &&
      (!month || item.month === month),
  );
}

export function listPracticeTests(
  year?: string,
  month?: string,
  examType?: "prelims" | "mains",
): CatalogPracticeTest[] {
  return dailyPracticeItems.filter(
    (item) =>
      (!year || item.year === year) &&
      (!month || item.month === month) &&
      (!examType || item.examType === examType),
  );
}

/** @deprecated Use listCurrentAffairsDocuments — kept for student portal types */
export type PortalDocumentItem = CatalogDocument & {
  viewLink: string;
  downloadLink: string;
  sampleLink?: string;
};

export function toPortalDocument(item: CatalogDocument): PortalDocumentItem {
  return {
    ...item,
    viewLink: resourceViewPath(item),
    downloadLink: resourceDownloadPath(item),
    ...(item.hasSample ? { sampleLink: resourceSamplePath(item) } : {}),
  };
}
