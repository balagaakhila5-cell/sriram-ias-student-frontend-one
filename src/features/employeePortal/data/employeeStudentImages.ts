export const EMPLOYEE_STUDENT_IMAGES = [
  "/assets/employee/Darshan kotla1.png",
  "/assets/employee/Darshan kotla2.png",
  "/assets/employee/Harshini k.png",
] as const;

export const EMPLOYEE_STUDENT_NAMES = [
  "Darshan Kotla",
  "Darshan Kotla",
  "Harshini K",
] as const;

export function getEmployeeStudentImage(index: number): string {
  return EMPLOYEE_STUDENT_IMAGES[index % EMPLOYEE_STUDENT_IMAGES.length];
}

export function getEmployeeStudentName(index: number): string {
  return EMPLOYEE_STUDENT_NAMES[index % EMPLOYEE_STUDENT_NAMES.length];
}
