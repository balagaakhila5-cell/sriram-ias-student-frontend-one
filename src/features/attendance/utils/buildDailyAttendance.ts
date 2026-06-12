import {
  getHolidayByDate,
  holidaysMaster,
  isWeeklyOff,
  weeklyOffDays,
  type WeekDay,
} from '@/features/attendance/data/holidaysMaster';

export type DailyAttendanceStatus = 'present' | 'absent' | 'holiday' | 'weekoff';

export interface AttendanceSessionRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  reason: string;
}

export interface DailyAttendanceRow extends AttendanceSessionRecord {
  status: DailyAttendanceStatus;
}

const DISPLAY_DATE_RE = /^(\d{2})-(\d{2})-(\d{4})$/;

export function parseAttendanceDisplayDate(value: string) {
  const match = DISPLAY_DATE_RE.exec(value.trim());
  if (!match) return null;

  const [, day, month, year] = match;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed;
}

export function formatAttendanceDisplayDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function toCalendarDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function resolveDateRange(records: AttendanceSessionRecord[]) {
  const parsedDates = records
    .map((record) => parseAttendanceDisplayDate(record.date))
    .filter((date): date is Date => date !== null);

  const holidayDates = holidaysMaster
    .map((holiday) => new Date(`${holiday.calendarDate}T00:00:00`))
    .filter((date) => !Number.isNaN(date.getTime()));

  const allDates = [...parsedDates, ...holidayDates];
  if (allDates.length === 0) return null;

  const start = new Date(Math.min(...allDates.map((date) => date.getTime())));
  const end = new Date(Math.max(...allDates.map((date) => date.getTime())));

  return { start, end };
}

function inferStatus(record: AttendanceSessionRecord): DailyAttendanceStatus {
  const isAbsent =
    record.checkIn === '-' &&
    record.checkOut === '-' &&
    record.reason.trim() !== '' &&
    record.reason.trim() !== '-';

  return isAbsent ? 'absent' : 'present';
}

export function buildDailyAttendanceRows(
  records: AttendanceSessionRecord[],
  configuredWeeklyOffs: WeekDay[] = weeklyOffDays,
): DailyAttendanceRow[] {
  const range = resolveDateRange(records);
  if (!range) return [];

  const recordsByDate = new Map(
    records.map((record) => [record.date, record] as const),
  );

  const rows: DailyAttendanceRow[] = [];

  for (
    let cursor = new Date(range.start);
    cursor.getTime() <= range.end.getTime();
    cursor = addDays(cursor, 1)
  ) {
    const displayDate = formatAttendanceDisplayDate(cursor);
    const calendarDate = toCalendarDate(cursor);
    const holiday = getHolidayByDate(calendarDate);

    if (holiday) {
      rows.push({
        date: displayDate,
        checkIn: '-',
        checkOut: '-',
        reason: holiday.name,
        status: 'holiday',
      });
      continue;
    }

    if (isWeeklyOff(cursor.getDay(), configuredWeeklyOffs)) {
      rows.push({
        date: displayDate,
        checkIn: '-',
        checkOut: '-',
        reason: 'Weekoff',
        status: 'weekoff',
      });
      continue;
    }

    const record = recordsByDate.get(displayDate);
    if (record) {
      rows.push({
        ...record,
        status: inferStatus(record),
      });
      continue;
    }

    rows.push({
      date: displayDate,
      checkIn: '-',
      checkOut: '-',
      reason: '-',
      status: 'present',
    });
  }

  return rows.sort((a, b) => {
    const left = parseAttendanceDisplayDate(a.date)?.getTime() ?? 0;
    const right = parseAttendanceDisplayDate(b.date)?.getTime() ?? 0;
    return right - left;
  });
}
