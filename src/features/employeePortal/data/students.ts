export interface Student {
  id: string;
  name: string;
  batch: string;
  grade: number;
  avatarBg: string;
  initials: string;
}

export const students: Student[] = [
  { id: "darshan-1", name: "Darshan Kotla", batch: "Batch 1", grade: 3.6, avatarBg: "#BFE4E1", initials: "DK" },
  { id: "darshan-2", name: "Darshan Kotla", batch: "Batch 1", grade: 3.6, avatarBg: "#F3D9BD", initials: "DK" },
  { id: "harshini-1", name: "Harshini K", batch: "Batch 1", grade: 3.6, avatarBg: "#C7B7E3", initials: "HK" },
  { id: "darshan-3", name: "Darshan Kotla", batch: "Batch 1", grade: 3.6, avatarBg: "#BFE4E1", initials: "DK" },
  { id: "darshan-4", name: "Darshan Kotla", batch: "Batch 1", grade: 3.6, avatarBg: "#BFE4E1", initials: "DK" },
  { id: "darshan-5", name: "Darshan Kotla", batch: "Batch 1", grade: 3.6, avatarBg: "#F3D9BD", initials: "DK" },
  { id: "harshini-2", name: "Harshini K", batch: "Batch 1", grade: 3.6, avatarBg: "#C7B7E3", initials: "HK" },
  { id: "darshan-6", name: "Darshan Kotla", batch: "Batch 1", grade: 3.6, avatarBg: "#BFE4E1", initials: "DK" },
];

export const studentOverview = {
  totalStudents: 120,
  activeToday: 100,
  inactiveToday: 20,
};

export const gradeFilters = ["All Grades", "4.5 >", "4.5 > and  < 3.5"];

export function getStudentById(id: string): Student | undefined {
  return students.find((s) => s.id === id);
}
