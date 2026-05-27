export interface StudentAttendanceRow {
  id: string;
  studentId: string;
  name: string;
  checkIn: string;
  checkOut: string;
  reason: string;
}

export const employeeAttendanceOverview = {
  presentToday: 100,
  absentToday: 20,
  yetToCome: 5,
};

export const employeeAttendanceRows: StudentAttendanceRow[] = [
  { id: "1", studentId: "darshan-1", name: "Darshan Kotla", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { id: "2", studentId: "darshan-2", name: "Darshan Kotla", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { id: "3", studentId: "varun-1", name: "Varun Kota", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { id: "4", studentId: "varun-2", name: "Varun Kota", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { id: "5", studentId: "varun-3", name: "Varun Kota", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { id: "6", studentId: "varun-4", name: "Varun Kota", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { id: "7", studentId: "varun-5", name: "Varun Kota", checkIn: "10:00 AM", checkOut: "05:00 PM", reason: "-" },
  { id: "8", studentId: "varun-6", name: "Varun Kota", checkIn: "-", checkOut: "-", reason: "Sick Leave" },
];

export const attendanceDateFilters = ["Today", "Yesterday", "This Week", "This Month"];
export const attendanceStudentFilters = ["All Students", "Darshan Kotla", "Varun Kota"];
