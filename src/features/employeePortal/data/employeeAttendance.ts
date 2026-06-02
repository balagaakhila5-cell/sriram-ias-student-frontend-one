import { students } from "./students";

export interface StudentAttendanceRow {
  id: string;
  studentId: string;
  name: string;
  image: string;
  checkIn: string;
  checkOut: string;
  reason: string;
}

export const employeeAttendanceOverview = {
  presentToday: 100,
  absentToday: 20,
  yetToCome: 5,
};

export const employeeAttendanceRows: StudentAttendanceRow[] = students.map(
  (student, index) => ({
    id: String(index + 1),
    studentId: student.id,
    name: student.name,
    image: student.image,
    checkIn: index === 11 ? "-" : "10:00 AM",
    checkOut: index === 11 ? "-" : "05:00 PM",
    reason: index === 11 ? "Sick Leave" : "-",
  }),
);

export const attendanceDateFilters = [
  "Today",
  "Yesterday",
  "This Week",
  "This Month",
];

export const attendanceStudentFilters = [
  "All Students",
  "Darshan Kotla",
  "Harshini K",
];
