import type { AttendanceSessionRecord } from "@/features/attendance/utils/buildDailyAttendance";

export function attendanceStorageKey(userId: string) {
  return `student-attendance-sessions-${userId}`;
}

export function loadAttendanceSessions(userId: string): AttendanceSessionRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(attendanceStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AttendanceSessionRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAttendanceSessions(
  userId: string,
  sessions: AttendanceSessionRecord[],
) {
  localStorage.setItem(attendanceStorageKey(userId), JSON.stringify(sessions));
}

export function mergeAttendanceRecords(
  base: AttendanceSessionRecord[],
  overrides: AttendanceSessionRecord[],
): AttendanceSessionRecord[] {
  const map = new Map(base.map((record) => [record.date, record]));

  for (const record of overrides) {
    map.set(record.date, record);
  }

  return Array.from(map.values());
}
