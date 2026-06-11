import type { DailyAttendanceRow } from '@/features/attendance/utils/buildDailyAttendance';

export interface AttendanceTermTotals {
  totalClasses: number;
  classesAttended: number;
  classesMissed: number;
}

export interface AttendanceSummary extends AttendanceTermTotals {
  classesPending: number;
  presentCount: number;
  absentCount: number;
  percent: number;
  monthlyPercent: number;
  monthlyLabel: string;
}

function countDailyAttendance(rows: DailyAttendanceRow[]) {
  return rows.reduce(
    (counts, row) => {
      if (row.status === 'present') counts.present += 1;
      if (row.status === 'absent') counts.absent += 1;
      return counts;
    },
    { present: 0, absent: 0 },
  );
}

function toPercent(numerator: number, denominator: number) {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 100);
}

export function computeAttendanceSummary(
  dailyRows: DailyAttendanceRow[],
  termTotals: AttendanceTermTotals,
  monthlyLabel = 'April Percentage',
): AttendanceSummary {
  const { totalClasses, classesAttended, classesMissed } = termTotals;
  const countedClasses = classesAttended + classesMissed;

  const classesPending = Math.max(
    totalClasses - classesAttended - classesMissed,
    0,
  );

  const percent = toPercent(classesAttended, countedClasses);

  const { present: monthlyPresent, absent: monthlyAbsent } =
    countDailyAttendance(dailyRows);
  const monthlyCounted = monthlyPresent + monthlyAbsent;
  const monthlyPercent = toPercent(monthlyPresent, monthlyCounted);

  return {
    totalClasses,
    classesAttended,
    classesMissed,
    classesPending,
    presentCount: classesAttended,
    absentCount: classesMissed,
    percent,
    monthlyPercent,
    monthlyLabel,
  };
}
