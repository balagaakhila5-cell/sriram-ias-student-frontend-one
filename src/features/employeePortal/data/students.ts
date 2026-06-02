import {
  getEmployeeStudentImage,
  getEmployeeStudentName,
} from "./employeeStudentImages";

export interface Student {
  id: string;
  name: string;
  batch: string;
  grade: number;
  image: string;
  avatarBg: string;
  initials: string;
}

const avatarBackgrounds = ["#BFE4E1", "#F3D9BD", "#C7B7E3"];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export const students: Student[] = Array.from({ length: 12 }, (_, index) => {
  const name = getEmployeeStudentName(index);

  return {
    id: `student-${index + 1}`,
    name,
    batch: "Batch 1",
    grade: 3.6,
    image: getEmployeeStudentImage(index),
    avatarBg: avatarBackgrounds[index % avatarBackgrounds.length],
    initials: getInitials(name),
  };
});

export const studentOverview = {
  totalStudents: 120,
  activeToday: 100,
  inactiveToday: 20,
};

export const gradeFilters = ["All Grades", "4.5 >", "4.5 > and  < 3.5"];

export function getStudentById(id: string): Student | undefined {
  return students.find((s) => s.id === id);
}

export function getStudentImageById(id: string): string | undefined {
  return getStudentById(id)?.image;
}
