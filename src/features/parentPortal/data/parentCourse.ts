export interface ParentCourseInfo {
  id: string;
  title: string;
  purchasedOn: string;
  validUpto: string;
  progressPercent: number;
}

export const parentCourse: ParentCourseInfo = {
  id: "course-1",
  title: "2 Year GS Foundation Course - Batch Name",
  purchasedOn: "22 March 2026",
  validUpto: "22 March 2028",
  progressPercent: 80,
};
