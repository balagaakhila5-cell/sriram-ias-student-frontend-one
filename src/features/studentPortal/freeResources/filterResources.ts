export function matchesYearMonth(
  item: { year: string; month: string },
  year: string,
  month: string,
) {
  return item.year === year && item.month === month;
}
