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
import { RESOURCE_CARD_LIMIT } from "../components/cardStyles";
import { matchesYearMonth } from "@/features/currentAffairs/filters";

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

import { RESOURCE_YEAR_OPTIONS } from "@/utils/yearFilterOptions";

export const PORTAL_FILTER_YEARS = RESOURCE_YEAR_OPTIONS;
export const PORTAL_FILTER_MONTHS = [...MONTHS];

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

/** Date dropdown labels — e.g. "1 April 2026" (not bare numbers) */
export function buildDateFilterOptions(month: string, year: string): string[] {
  const count = DAYS_IN_MONTH[month] ?? 30;
  return Array.from({ length: count }, (_, i) => {
    const day = i + 1;
    return `${day} ${month} ${year}`;
  });
}

/** Main site DPQ — day numbers only in the Date dropdown (1, 2, 3, …) */
export function buildDayOnlyDateOptions(month: string, _year?: string): string[] {
  const count = DAYS_IN_MONTH[month] ?? 30;
  return Array.from({ length: count }, (_, i) => String(i + 1));
}

/** DPQ Date filter — "All" plus day numbers; when month is "All", shows 1–31. */
export function buildDpqDateFilterOptions(
  month: string,
  allLabel = "All",
): string[] {
  const count =
    !month || month === allLabel ? 31 : (DAYS_IN_MONTH[month] ?? 31);
  const days = Array.from({ length: count }, (_, i) => String(i + 1));
  return [allLabel, ...days];
}

const DAY_ORDINALS = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
  "Eleventh",
  "Twelfth",
  "Thirteenth",
  "Fourteenth",
  "Fifteenth",
  "Sixteenth",
  "Seventeenth",
  "Eighteenth",
  "Nineteenth",
  "Twentieth",
  "Twenty-First",
  "Twenty-Second",
  "Twenty-Third",
  "Twenty-Fourth",
  "Twenty-Fifth",
  "Twenty-Sixth",
  "Twenty-Seventh",
  "Twenty-Eighth",
  "Twenty-Ninth",
  "Thirtieth",
  "Thirty-First",
] as const;

/** Main site DPQ Date dropdown — text only, e.g. "First April" (no digits) */
export function buildTextDateOptions(month: string): string[] {
  const count = DAYS_IN_MONTH[month] ?? 30;
  return Array.from(
    { length: count },
    (_, i) => `${DAY_ORDINALS[i]} ${month}`,
  );
}

export function dayFromDateLabel(dateLabel: string): string {
  const match = dateLabel.match(/^(\d{1,2})\b/);
  if (match) return match[1];
  const ordinalIndex = DAY_ORDINALS.findIndex((ord) =>
    dateLabel.startsWith(`${ord} `),
  );
  if (ordinalIndex >= 0) return String(ordinalIndex + 1);
  return dateLabel;
}

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

function magazineTitle(month: string, year: string) {
  return `${month} Month Magazine ${year}`;
}

function yearlyCatalogDocs(
  subtopic: CurrentAffairsSubtopicId,
  titleForYearMonth: (year: string, month: string, index: number) => string,
  options?: Omit<NonNullable<Parameters<typeof doc>[3]>, "year" | "month">,
): CatalogDocument[] {
  let index = 0;
  return PORTAL_FILTER_YEARS.flatMap((year) =>
    MONTHS.map((month) =>
      doc(subtopic, index++, titleForYearMonth(year, month, index), {
        ...options,
        year,
        month,
      }),
    ),
  );
}

const currentAffairsDocs: CatalogDocument[] = [
  ...yearlyCatalogDocs(
    "daily-current-affairs",
    (year, month) => `Daily Current Affairs - ${month} ${year}`,
  ),
  ...yearlyCatalogDocs(
    "infographics",
    (year, month, index) => `Infographic summary ${index} - ${month} ${year}`,
  ),
  ...yearlyCatalogDocs(
    "monthly-magazine",
    (year, month) => magazineTitle(month, year),
    {
      image: RESOURCE_ASSETS.PDF_ICON,
      hasSample: true,
    },
  ),
  ...yearlyCatalogDocs(
    "monthly-recap",
    (year, month) => `${month} ${year} - Recap`,
  ),
];

registerDocuments(currentAffairsDocs);

export const dailyPracticeItems: CatalogPracticeTest[] = [
  ...PORTAL_FILTER_YEARS.flatMap((year) =>
    MONTHS.flatMap((month, monthIndex) => ({
      id: `dpq-prelims-${year}-${month}`,
      subtopic: "daily-practice-questions" as const,
      year,
      month,
      day: "1",
      examType: "prelims" as const,
      title: `Prelims practice test - ${month} ${year}`,
      image: RESOURCE_ASSETS.PRACTICE_TEST,
      attemptPath: `/current-affairs/daily-practice-questions/prelims-${year}-${monthIndex + 1}`,
    })),
  ),
  ...PORTAL_FILTER_YEARS.flatMap((year) =>
    MONTHS.flatMap((month, monthIndex) => ({
      id: `dpq-mains-${year}-${month}`,
      subtopic: "daily-practice-questions" as const,
      year,
      month,
      day: "1",
      examType: "mains" as const,
      title: `Mains practice test - ${month} ${year}`,
      image: RESOURCE_ASSETS.PRACTICE_TEST,
      attemptPath: `/current-affairs/daily-practice-questions/mains-${year}-${monthIndex + 1}`,
    })),
  ),
];

export function listCurrentAffairsDocuments(
  subtopic: CurrentAffairsSubtopicId,
  year?: string,
  month?: string,
): CatalogDocument[] {
  return currentAffairsDocs
    .filter(
      (item) =>
        item.subtopic === subtopic && matchesYearMonth(item, year, month),
    )
    .slice(0, RESOURCE_CARD_LIMIT);
}

export function listPracticeTests(
  year?: string,
  month?: string,
  examType?: "prelims" | "mains",
  dateLabel?: string,
  options?: { filterByDay?: boolean; limit?: number; mainSite?: boolean },
): CatalogPracticeTest[] {
  const limit = options?.limit ?? RESOURCE_CARD_LIMIT;
  const filterByDay = options?.filterByDay ?? false;
  const mainSite = options?.mainSite ?? false;
  const day =
    filterByDay && dateLabel ? dayFromDateLabel(dateLabel) : undefined;
  const displayYear = year ?? PORTAL_FILTER_YEARS[0];
  const displayMonth = month ?? "April";
  const dayOnly =
    dateLabel && /^\d{1,2}$/.test(dateLabel.trim()) ? dateLabel.trim() : undefined;
  const displayDate = mainSite
    ? `${displayMonth} ${displayYear}`
    : dayOnly
      ? `${dayOnly} ${displayMonth} ${displayYear}`
      : dateLabel ?? `${day ?? "1"} ${displayMonth} ${displayYear}`;

  return dailyPracticeItems
    .filter(
      (item) =>
        (!examType || item.examType === examType) &&
        matchesYearMonth(item, year, month) &&
        (!filterByDay || !day || item.day === day),
    )
    .slice(0, limit)
    .map((item, index) => {
      const label = item.examType === "prelims" ? "Prelims" : "Mains";
      const testNum = index + 1;
      return {
        ...item,
        year: displayYear,
        month: displayMonth,
        title: `${label} practice test ${testNum} - ${displayDate}`,
      };
    });
}

/** Student portal: up to 10 practice cards per exam type */
export function listPortalPracticeTests(
  examType: "prelims" | "mains",
  year?: string,
  month?: string,
  dateLabel?: string,
): CatalogPracticeTest[] {
  return listPracticeTests(year, month, examType, dateLabel, { limit: 10 });
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
