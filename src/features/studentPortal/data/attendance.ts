export interface AttendanceRow {
  date: string;
  checkIn: string;
  checkOut: string;
  reason: string;
}

export const overallAttendance = {
  percent: 86,
  presentCount: 100,
  absentCount: 30,
  classesAttended: 180,
  classesMissed: 60,
  monthlyPercent: 80,
  monthlyLabel: "April Percentage",
  totalClasses: 600,
};

export const attendanceRows: AttendanceRow[] = [
  { date: "26-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "27-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "28-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "29-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "30-04-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "01-05-2026", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { date: "02-05-2026", checkIn: "-", checkOut: "-", reason: "Sick Leave" },
];
