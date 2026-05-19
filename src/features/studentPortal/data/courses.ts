export interface EnrolledCourse {
  id: string;
  title: string;
  validUpto: string;
  progressPercent: number;
  status: "Active" | "Expired";
}

export const enrolledCourses: EnrolledCourse[] = [
  {
    id: "course-1",
    title: "2 Year GS Foundation Course - Batch Name",
    validUpto: "22 March 2028",
    progressPercent: 80,
    status: "Active",
  },
];

export function getCourse(id: string): EnrolledCourse | undefined {
  return enrolledCourses.find((c) => c.id === id);
}
