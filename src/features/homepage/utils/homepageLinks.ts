import { DEFAULT_DAILY_QUIZ_MOCK_TEST_ID } from "@/features/resources/catalog/demoMockTests";

const normalize = (value: string) =>
  value.toLowerCase().replace(/\s+/g, " ").trim();

export function mockTestAttemptHref(testId: string): string {
  return `/free_resources/free-mocktests/${testId}`;
}

/** Explore targets for Access Free Learning Resources on the home page */
export const FREE_LEARNING_EXPLORE_HREFS = {
  dailyQuiz: mockTestAttemptHref(DEFAULT_DAILY_QUIZ_MOCK_TEST_ID),
  dailyCurrentAffairs: "/current-affairs/daily-current-affairs",
  dailyMainsQuestions: "/current-affairs/daily-practice-questions",
  blogs: "/blogs",
} as const;

export function centerPageHref(centerName: string): string {
  const key = normalize(centerName);

  if (key.includes("hyderabad")) return "/centers/hyderabad";
  if (key.includes("pune")) return "/centers/pune";
  if (key.includes("delhi") || key.includes("new delhi")) return "/centers/delhi";

  return "/centers/delhi";
}

export function freeLearningHref(title: string, id?: string): string {
  const key = normalize(title);
  const idKey = normalize(id ?? "");

  if (
    idKey === "quizzes" ||
    idKey.includes("quiz") ||
    key.includes("daily quiz") ||
    (key.includes("quiz") && !key.includes("practice"))
  ) {
    return FREE_LEARNING_EXPLORE_HREFS.dailyQuiz;
  }

  if (
    idKey.includes("current-affair") ||
    key.includes("daily current affair") ||
    (key.includes("current affair") && !key.includes("practice"))
  ) {
    return FREE_LEARNING_EXPLORE_HREFS.dailyCurrentAffairs;
  }

  if (
    idKey.includes("mains") ||
    key.includes("daily mains") ||
    key.includes("mains question") ||
    key.includes("practice question")
  ) {
    return FREE_LEARNING_EXPLORE_HREFS.dailyMainsQuestions;
  }

  if (idKey.includes("blog") || key.includes("blog")) {
    return FREE_LEARNING_EXPLORE_HREFS.blogs;
  }

  return "/free_resources";
}

export function bookDetailSlug(bookId: string): string {
  const numericId = Number.parseInt(bookId, 10);
  if (Number.isFinite(numericId) && numericId >= 1 && numericId <= 8) {
    return `indian-economy-general-studies-book-${numericId}`;
  }

  return `indian-economy-general-studies-book-1`;
}
