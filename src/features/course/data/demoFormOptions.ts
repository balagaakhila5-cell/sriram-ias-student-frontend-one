import type { Category, Center, CourseSummary } from "../services/coursesService";

export const fallbackCenters: Center[] = [
  { _id: "new-delhi", name: "New Delhi" },
  { _id: "hyderabad", name: "Hyderabad" },
  { _id: "pune", name: "Pune" },
  { _id: "bengaluru", name: "Bengaluru" },
];

export const fallbackCategories: Category[] = [
  { _id: "gs-foundation", name: "GS Foundation" },
  { _id: "mentorship", name: "Mentorship" },
  { _id: "optional-foundation", name: "Optional Foundation" },
  { _id: "test-series", name: "Test Series" },
  { _id: "csat", name: "CSAT" },
  { _id: "enrichment-course", name: "Enrichment Course" },
];

const fallbackCoursesByCategory: Record<string, CourseSummary[]> = {
  "GS Foundation": [
    { _id: "gs-2yr-delhi", title: "2 Years GS Foundation Course" },
    { _id: "gs-1yr-delhi", title: "1 Year GS Foundation Course" },
    { _id: "gs-weekend", title: "Weekend GS Foundation Course" },
  ],
  Mentorship: [
    { _id: "stride-mentorship", title: "STRIDE Mentorship Program" },
    { _id: "mentorship-program", title: "Mentorship Program" },
  ],
  "Optional Foundation": [
    { _id: "optional-history", title: "Optional Foundation - History" },
    { _id: "optional-geography", title: "Optional Foundation - Geography" },
    { _id: "optional-anthropology", title: "Optional Foundation - Anthropology" },
  ],
  "Test Series": [
    { _id: "prelims-test-series", title: "Prelims Test Series" },
    { _id: "mains-test-series", title: "Mains Test Series" },
    {
      _id: "prelims-test-series-mentorship",
      title: "Prelims Test Series + Mentorship",
    },
    {
      _id: "mains-test-series-mentorship",
      title: "Mains Test Series + Mentorship",
    },
  ],
  CSAT: [{ _id: "csat-foundation", title: "CSAT Foundation Course" }],
  "Enrichment Course": [
    { _id: "essay-enrichment", title: "Essay Enrichment Course" },
    { _id: "answer-writing", title: "Answer Writing Enrichment Course" },
  ],
};

export function getFallbackCourses(categoryName: string): CourseSummary[] {
  return fallbackCoursesByCategory[categoryName] ?? [
    { _id: "general-course", title: "General Studies Course" },
  ];
}
