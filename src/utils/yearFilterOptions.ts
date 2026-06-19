/** Shared year lists for CA / Free Resources filter dropdowns */

export const YEAR_FILTER_START = 2020;

export function getPresentYear(): number {
  return new Date().getFullYear();
}

/** Descending years from present year through start year (e.g. 2026 … 2020). */
export function buildYearOptions(
  startYear: number = YEAR_FILTER_START,
  endYear: number = getPresentYear(),
): string[] {
  const years: string[] = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(String(year));
  }
  return years;
}

/** PYQ and resource year dropdowns (no "All" option). */
export const RESOURCE_YEAR_OPTIONS = buildYearOptions();

/** Current Affairs list pages — optional "All" + years. */
export function buildCaFilterYears(allLabel: string): string[] {
  return [allLabel, ...buildYearOptions()];
}
