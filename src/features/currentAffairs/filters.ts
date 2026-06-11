/**
 * Shared filter options + helpers for the current-affairs list pages.
 *
 * Records may have null year/month and span several years, so the dropdowns
 * default to "All" (no filter) — this shows data immediately and lets the user
 * narrow down, instead of hiding everything behind a year/month that happens
 * not to match the seeded data.
 */
export const ALL_FILTER = "All";

export const CA_FILTER_YEARS: string[] = [
  ALL_FILTER,
  "2030",
  "2029",
  "2028",
  "2027",
  "2026",
  "2025",
  "2024",
];

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
