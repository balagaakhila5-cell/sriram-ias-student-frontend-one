export const TOPPER_YEAR_MIN = 2020;
export const TOPPER_YEAR_MAX = 2030;

export const TOPPER_YEARS = Array.from(
  { length: TOPPER_YEAR_MAX - TOPPER_YEAR_MIN + 1 },
  (_, index) => TOPPER_YEAR_MAX - index,
);

export type YearWiseTopperItem = {
  id: string;
  title: string;
  pdfUrl: string;
  downloadFileName: string;
};

export const getTopperYearPdfUrl = (year: number) =>
  `/assets/our-toppers-gallery/year-wise/toppers-${year}.pdf`;

export function isValidTopperYear(value: string | number): value is number {
  const year = typeof value === 'string' ? Number.parseInt(value, 10) : value;
  return Number.isInteger(year) && year >= TOPPER_YEAR_MIN && year <= TOPPER_YEAR_MAX;
}

export type YearWiseRouteParam = number | 'all';

export function parseYearWiseRouteParam(param: string): YearWiseRouteParam | null {
  if (param === 'all') return 'all';

  const year = Number.parseInt(param, 10);
  if (isValidTopperYear(year)) return year;

  return null;
}

export function getYearWiseTopperItem(year: number): YearWiseTopperItem {
  return {
    id: `${year}-toppers-list`,
    title: `${year} Toppers List`,
    pdfUrl: getTopperYearPdfUrl(year),
    downloadFileName: `toppers-${year}.pdf`,
  };
}

export function getYearWiseTopperItems(year: number): YearWiseTopperItem[] {
  return [getYearWiseTopperItem(year)];
}

export function getAllYearsTopperItems(): YearWiseTopperItem[] {
  return TOPPER_YEARS.map((year) => getYearWiseTopperItem(year));
}

export function getYearWisePageTitle(_year?: YearWiseRouteParam) {
  return 'Toppers List';
}
