export const MONTHS = [
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

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type CalendarCell = {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};

export function getTodayParts() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
  };
}

export function buildYearOptions(centerYear?: number, span = 11) {
  const year = centerYear ?? getTodayParts().year;
  const start = year - Math.floor(span / 2);

  return Array.from({ length: span }, (_, index) => String(start + index));
}

export function formatCalendarDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function buildCalendarCells(year: number, month: number): CalendarCell[] {
  const { year: todayYear, month: todayMonth, day: todayDay } = getTodayParts();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let index = firstWeekday - 1; index >= 0; index -= 1) {
    const day = daysInPreviousMonth - index;
    const previousMonth = month === 0 ? 11 : month - 1;
    const previousYear = month === 0 ? year - 1 : year;

    cells.push({
      day,
      month: previousMonth,
      year: previousYear,
      isCurrentMonth: false,
      isToday:
        todayYear === previousYear &&
        todayMonth === previousMonth &&
        todayDay === day,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      month,
      year,
      isCurrentMonth: true,
      isToday: todayYear === year && todayMonth === month && todayDay === day,
    });
  }

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  let nextDay = 1;

  while (cells.length % 7 !== 0) {
    cells.push({
      day: nextDay,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
      isToday:
        todayYear === nextYear &&
        todayMonth === nextMonth &&
        todayDay === nextDay,
    });
    nextDay += 1;
  }

  return cells;
}
