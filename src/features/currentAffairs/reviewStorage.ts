import type { CurrentAffairsSubmitResult } from "./types";

/**
 * Bridges the backend's evaluated submit response into the localStorage shape
 * that the results / check-answers pages already consume. Centralizing it here
 * keeps that storage contract in one place and lets those pages stay unchanged.
 */
export interface StoredTestReview {
  slug: string;
  title: string;
  questions: { id: number; question: string; options: string[] }[];
  correctAnswers: Record<number, number>;
  selectedAnswers: Record<number, number>;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  grade: string;
  time: string;
  rank: string;
}

const STORAGE_PREFIX = "test-review-";

export const testReviewKey = (slug: string) => `${STORAGE_PREFIX}${slug}`;

const optionIndexOf = (
  options: { key: string }[],
  key: string | null,
): number => (key == null ? -1 : options.findIndex((o) => o.key === key));

/** Approximate rank purely from score (no live leaderboard yet). */
function rankFromCorrect(correct: number, total: number): string {
  if (total <= 0) return "100";
  const ratio = correct / total;
  if (ratio >= 1) return "1";
  if (ratio >= 0.9) return "8";
  if (ratio >= 0.75) return "18";
  if (ratio >= 0.6) return "32";
  if (ratio >= 0.45) return "55";
  if (ratio >= 0.3) return "75";
  return "100";
}

export function buildStoredTestReview(
  slug: string,
  result: CurrentAffairsSubmitResult,
): StoredTestReview {
  const questions = result.review.map((r) => ({
    id: r.questionNumber,
    question: r.question,
    options: r.options.map((o) => o.value),
  }));

  const correctAnswers: Record<number, number> = {};
  const selectedAnswers: Record<number, number> = {};

  result.review.forEach((r) => {
    correctAnswers[r.questionNumber] = optionIndexOf(r.options, r.correctAnswer);
    if (!r.isSkipped && r.selectedAnswer != null) {
      selectedAnswers[r.questionNumber] = optionIndexOf(
        r.options,
        r.selectedAnswer,
      );
    }
  });

  return {
    slug,
    title: result.paper?.title ?? "",
    questions,
    correctAnswers,
    selectedAnswers,
    totalQuestions: result.totalQuestions,
    answeredCount: result.attemptedCount,
    unansweredCount: result.skippedCount,
    correctCount: result.correctCount,
    incorrectCount: result.wrongCount,
    percentage: result.percentage,
    grade: result.grade,
    time: "—",
    rank: rankFromCorrect(result.correctCount, result.totalQuestions),
  };
}

/** Persist the evaluated review so the results / check-answers pages can read it. */
export function saveTestReview(
  slug: string,
  result: CurrentAffairsSubmitResult,
): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    testReviewKey(slug),
    JSON.stringify(buildStoredTestReview(slug, result)),
  );
}
