import { httpClient } from "@/lib/httpClient";
import { currentAffairsEndpoints } from "../endpoints";
import type {
  CurrentAffairItem,
  CurrentAffairsListFilters,
  CurrentAffairsListResult,
  CurrentAffairsQuestion,
  CurrentAffairsQuestionsResult,
  CurrentAffairsReviewItem,
  CurrentAffairsSubmitResult,
  SubmitAnswerInput,
} from "../types";

/**
 * The backend wraps every response as `{ success, data: <payload> }`, and the
 * list endpoint nests once more (`data.data` is the array). `unwrap` peels the
 * outer envelope so callers work with the meaningful payload.
 */
const unwrap = (raw: unknown): Record<string, unknown> => {
  const top = (raw ?? {}) as Record<string, unknown>;
  const inner = top.data;
  return (inner && typeof inner === "object" ? inner : top) as Record<
    string,
    unknown
  >;
};

const toNumber = (v: unknown, fallback = 0): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export const currentAffairsService = {
  list: async (
    filters: CurrentAffairsListFilters = {},
  ): Promise<CurrentAffairsListResult> => {
    const params: Record<string, string> = {};
    if (filters.category) params.category = filters.category;
    if (filters.year != null && filters.year !== "")
      params.year = String(filters.year);
    if (filters.month) params.month = filters.month;
    if (filters.mainsCategory) params.mainsCategory = filters.mainsCategory;
    if (filters.date) params.date = filters.date;
    if (filters.page) params.page = String(filters.page);
    if (filters.limit) params.limit = String(filters.limit);

    const { data } = await httpClient.get(currentAffairsEndpoints.list, {
      params,
    });
    const payload = unwrap(data);
    const items = (
      Array.isArray(payload.data) ? payload.data : []
    ) as CurrentAffairItem[];

    return {
      items,
      count: toNumber(payload.count, items.length),
      total: toNumber(payload.total, items.length),
      page: toNumber(payload.page, 1),
      limit: toNumber(payload.limit, items.length),
      totalPages: toNumber(payload.totalPages, 1),
      hasNextPage: Boolean(payload.hasNextPage),
      hasPrevPage: Boolean(payload.hasPrevPage),
    };
  },

  getQuestions: async (
    id: string,
  ): Promise<CurrentAffairsQuestionsResult> => {
    const { data } = await httpClient.get(
      currentAffairsEndpoints.questions(id),
    );
    const payload = unwrap(data);
    const questions = (Array.isArray(payload.questions)
      ? payload.questions
      : []) as CurrentAffairsQuestion[];

    return {
      paper: (payload.paper as CurrentAffairItem | undefined) ?? null,
      count: toNumber(payload.count, questions.length),
      questions,
    };
  },

  submitAnswers: async (
    id: string,
    answers: SubmitAnswerInput[],
  ): Promise<CurrentAffairsSubmitResult> => {
    const { data } = await httpClient.post(
      currentAffairsEndpoints.submit(id),
      { answers },
    );
    const payload = unwrap(data);
    const review = (Array.isArray(payload.review)
      ? payload.review
      : []) as CurrentAffairsReviewItem[];

    return {
      paper: (payload.paper as CurrentAffairItem | undefined) ?? null,
      totalQuestions: toNumber(payload.totalQuestions, review.length),
      attemptedCount: toNumber(payload.attemptedCount),
      correctCount: toNumber(payload.correctCount),
      wrongCount: toNumber(payload.wrongCount),
      skippedCount: toNumber(payload.skippedCount),
      percentage: toNumber(payload.percentage),
      grade: String(payload.grade ?? ""),
      review,
    };
  },
};
