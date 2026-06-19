/**
 * Shared filter options + helpers for the current-affairs list pages.
 *
 * Records may have null year/month and span several years, so the dropdowns
 * default to "All" (no filter) — this shows data immediately and lets the user
 * narrow down, instead of hiding everything behind a year/month that happens
 * not to match the seeded data.
 */
import { buildCaFilterYears } from '@/utils/yearFilterOptions';

export const ALL_FILTER = "All";

export const CA_FILTER_YEARS: string[] = buildCaFilterYears(ALL_FILTER);

export const CA_FILTER_MONTHS: string[] = [
  ALL_FILTER,
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
];

/** Treat the "All" sentinel as "no filter" (undefined) when calling the API. */
export const toFilterValue = (value: string): string | undefined =>
  value === ALL_FILTER ? undefined : value;

/** Match catalog/API records against optional year and month filters. */
export function matchesYearMonth(
  item: { year?: string | number | null; month?: string | null },
  year?: string,
  month?: string,
): boolean {
  if (year && String(item.year ?? "") !== String(year)) return false;
  if (month && normalizeMonth(item.month) !== normalizeMonth(month)) return false;
  return true;
}

function normalizeMonth(value?: string | null): string {
  if (!value) return "";
  const trimmed = value.trim();
  const lower = trimmed.toLowerCase();
  const fullNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const abbreviations = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const numeric = Number.parseInt(trimmed, 10);
  if (!Number.isNaN(numeric) && numeric >= 1 && numeric <= 12) {
    return fullNames[numeric - 1];
  }
  const abbrevIndex = abbreviations.indexOf(lower.slice(0, 3));
  if (abbrevIndex >= 0) return fullNames[abbrevIndex];
  const fullIndex = fullNames.indexOf(lower);
  if (fullIndex >= 0) return fullNames[fullIndex];
  return lower;
}
