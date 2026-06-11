/**
 * Types for the public Current Affairs portal API.
 *
 * Endpoints (proxied same-origin via next.config.ts rewrites):
 *   GET  /api/portal/current-affairs
 *   GET  /api/portal/current-affairs/:id/questions
 *   POST /api/portal/current-affairs/:id/submit
 */

export type CurrentAffairsCategory =
  | "CURRENT_AFFAIRS"
  | "DAILY_PRACTICE_QUESTIONS"
  | "INFOGRAPHICS"
  | "MONTHLY_MAGAZINE"
  | "MONTHLY_RECAP";

export type MainsCategory = "PRELIMS" | "MAINS";

/** A single current-affairs record as returned by the list / questions endpoints. */
export interface CurrentAffairItem {
  _id: string;
  category: CurrentAffairsCategory;
  categoryLabel: string;
  title: string;
  year: number | null;
  month: string | null;
  mainsCategory: MainsCategory | null;
  mainsCategoryLabel: string | null;
  date: string | null;
  pdfUrl: string | null;
  imageUrl: string | null;
  description: string;
  sectionFrom: number | null;
  sectionTo: number | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentAffairsListFilters {
  category?: CurrentAffairsCategory;
  year?: string | number;
  month?: string;
  /** DAILY_PRACTICE_QUESTIONS only — splits prelims vs mains. */
  mainsCategory?: MainsCategory;
  /** Optional exact-date filter, format YYYY-MM-DD. */
  date?: string;
  page?: number;
  limit?: number;
}

export interface CurrentAffairsListResult {
  items: CurrentAffairItem[];
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** A/B/C/D option pair. */
export interface CurrentAffairsOption {
  key: string;
  value: string;
}

export interface CurrentAffairsQuestion {
  _id: string;
  currentAffairId: string;
  questionNumber: number;
  question: string;
  options: CurrentAffairsOption[];
  imageUrl: string | null;
  explanation: string;
}

export interface CurrentAffairsQuestionsResult {
  paper: CurrentAffairItem | null;
  count: number;
  questions: CurrentAffairsQuestion[];
}

/** One answer in a submit request — `selectedAnswer` is the option key (e.g. "B"). */
export interface SubmitAnswerInput {
  questionId: string;
  selectedAnswer: string;
}

export interface CurrentAffairsReviewItem {
  _id: string;
  questionNumber: number;
  question: string;
  options: CurrentAffairsOption[];
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  isSkipped: boolean;
  explanation: string;
  imageUrl: string | null;
}

export interface CurrentAffairsSubmitResult {
  paper: CurrentAffairItem | null;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  percentage: number;
  grade: string;
  review: CurrentAffairsReviewItem[];
}
