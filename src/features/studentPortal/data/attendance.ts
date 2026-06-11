import type { AttendanceSessionRecord } from '@/features/attendance/utils/buildDailyAttendance';

export type AttendanceRow = AttendanceSessionRecord;

function parseTimeToMinutes(time: string): number | null {
  if (time === "-") return null;

  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

export function getWorkHours(checkIn: string, checkOut: string): string {
  const checkInMinutes = parseTimeToMinutes(checkIn);
  const checkOutMinutes = parseTimeToMinutes(checkOut);

  if (checkInMinutes === null || checkOutMinutes === null || checkOutMinutes <= checkInMinutes) {
    return "-";
  }

  const totalMinutes = checkOutMinutes - checkInMinutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

/** Term-level class totals (attended + missed + pending = totalClasses). */
export const attendanceTermTotals = {
  totalClasses: 600,
  classesAttended: 180,
  classesMissed: 60,
};

export const attendanceMonthlyLabel = "April Percentage";

export const attendanceRows: AttendanceRow[] = [
  { date: "26-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "27-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "28-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "29-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "30-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "02-05-2026", checkIn: "-", checkOut: "-", reason: "Sick Leave" },
  { date: "03-05-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "04-05-2026", checkIn: "10:15 AM", checkOut: "05:10 PM", reason: "-" },
  { date: "05-05-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "01-06-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "02-06-2026", checkIn: "10:05 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "03-06-2026", checkIn: "10:00 AM", checkOut: "04:45 PM", reason: "-" },
  { date: "04-06-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "05-06-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
];
