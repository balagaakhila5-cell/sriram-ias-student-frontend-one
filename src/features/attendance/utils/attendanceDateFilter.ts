import {
  parseAttendanceDisplayDate,
  type DailyAttendanceRow,
} from '@/features/attendance/utils/buildDailyAttendance';

export const ATTENDANCE_DATE_FILTER_OPTIONS = [
  'Last 7 Days',
  'This Month',
  'Custom Dates',
] as const;

export type AttendanceDateFilterOption =
  (typeof ATTENDANCE_DATE_FILTER_OPTIONS)[number];

export interface AttendanceDateRange {
  start: Date;
  end: Date;
}

function startOfDay(date: Date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function endOfDay(date: Date) {
  const normalized = new Date(date);
  normalized.setHours(23, 59, 59, 999);
  return normalized;
}

export function getAttendanceDateRange(
  filter: AttendanceDateFilterOption,
  customStart?: string,
  customEnd?: string,
  referenceDate: Date = new Date(),
): AttendanceDateRange | null {
  const today = startOfDay(referenceDate);

  if (filter === 'Last 7 Days') {
    const start = new Date(today);
    start.setDate(start.getDate() - 6);
    return { start, end: endOfDay(today) };
  }

  if (filter === 'This Month') {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { start: startOfDay(start), end: endOfDay(end) };
  }

  if (filter === 'Custom Dates') {
    if (!customStart || !customEnd) return null;

    const start = startOfDay(new Date(`${customStart}T00:00:00`));
    const end = endOfDay(new Date(`${customEnd}T00:00:00`));
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
    if (start.getTime() > end.getTime()) return null;

    return { start, end };
  }

  return null;
}

export function isDateWithinAttendanceRange(
  date: Date,
  range: AttendanceDateRange,
) {
  const time = startOfDay(date).getTime();
  return time >= range.start.getTime() && time <= range.end.getTime();
}

export function filterDailyAttendanceRows(
  rows: DailyAttendanceRow[],
  range: AttendanceDateRange | null,
) {
  if (!range) return rows;

  return rows.filter((row) => {
    const parsed = parseAttendanceDisplayDate(row.date);
    if (!parsed) return false;
    return isDateWithinAttendanceRange(parsed, range);
  });
}

export function formatAttendanceFilterRangeLabel(range: AttendanceDateRange) {
  const formatter = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return `${formatter.format(range.start)} – ${formatter.format(range.end)}`;
}
