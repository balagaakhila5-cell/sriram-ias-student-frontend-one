import { customerCurrentAffairsService } from "./customerCurrentAffairsService";
import {
  buildListQuery,
  mapPaginatedListToResult,
  mapQuizDetailsToQuestions,
  mapQuizResultsToSubmitResult,
} from "../adapters/customerCurrentAffairsAdapter";
import type {
  CurrentAffairsCategory,
  CurrentAffairsListFilters,
  CurrentAffairsListResult,
  CurrentAffairsQuestionsResult,
  CurrentAffairsSubmitResult,
  MainsCategory,
  SubmitAnswerInput,
} from "../types";
import type { FilterQuery } from "../types/customerCurrentAffairs";

export const currentAffairsService = {
  getCategories: () => customerCurrentAffairsService.getCategories(),

  getMainsCategories: () => customerCurrentAffairsService.getMainsCategories(),

  getYears: (query: FilterQuery) => customerCurrentAffairsService.getYears(query),

  getMonths: (query: FilterQuery) =>
    customerCurrentAffairsService.getMonths(query),

  getDates: (query: FilterQuery) => customerCurrentAffairsService.getDates(query),

  list: async (
    filters: CurrentAffairsListFilters = {},
  ): Promise<CurrentAffairsListResult> => {
    const category = filters.category ?? "CURRENT_AFFAIRS";
    const result = await customerCurrentAffairsService.list(
      buildListQuery({ ...filters, category }),
    );

    return mapPaginatedListToResult(result.items, category, {
      count: result.count,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    });
  },

  getDailyCurrentAffairs: (filters: Omit<CurrentAffairsListFilters, "category"> = {}) =>
    currentAffairsService.list({ ...filters, category: "CURRENT_AFFAIRS" }),

  getMonthlyMagazines: (filters: Omit<CurrentAffairsListFilters, "category"> = {}) =>
    currentAffairsService.list({ ...filters, category: "MONTHLY_MAGAZINE" }),

  getInfographics: (filters: Omit<CurrentAffairsListFilters, "category"> = {}) =>
    currentAffairsService.list({ ...filters, category: "INFOGRAPHICS" }),

  getMonthlyRecaps: (filters: Omit<CurrentAffairsListFilters, "category"> = {}) =>
    currentAffairsService.list({ ...filters, category: "MONTHLY_RECAP" }),

  getPrelimsQuizzes: (
    filters: Omit<CurrentAffairsListFilters, "category" | "mainsCategory"> = {},
  ) =>
    currentAffairsService.list({
      ...filters,
      category: "DAILY_PRACTICE_QUESTIONS",
      mainsCategory: "PRELIMS",
    }),

  getMainsQuizzes: (
    filters: Omit<CurrentAffairsListFilters, "category" | "mainsCategory"> = {},
  ) =>
    currentAffairsService.list({
      ...filters,
      category: "DAILY_PRACTICE_QUESTIONS",
      mainsCategory: "MAINS",
    }),

  viewResource: (resourceId: string) =>
    customerCurrentAffairsService.view(resourceId),

  downloadResource: (resourceId: string) =>
    customerCurrentAffairsService.download(resourceId),

  sampleResource: (resourceId: string) =>
    customerCurrentAffairsService.sample(resourceId),

  getQuestions: async (id: string): Promise<CurrentAffairsQuestionsResult> => {
    const data = await customerCurrentAffairsService.getDetails(id);
    return mapQuizDetailsToQuestions(data);
  },

  getDailyCurrentAffairById: (id: string) =>
    customerCurrentAffairsService.view(id),

  getMonthlyMagazineById: (id: string) =>
    customerCurrentAffairsService.view(id),

  getInfographicById: (id: string) =>
    customerCurrentAffairsService.view(id),

  getMonthlyRecapById: (id: string) =>
    customerCurrentAffairsService.view(id),

  submitAnswers: async (
    id: string,
    answers: SubmitAnswerInput[],
  ): Promise<CurrentAffairsSubmitResult> => {
    const payload = {
      currentAffairId: id,
      answers: answers.map((answer) => ({
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
      })),
    };

    const [submitResult, reviewItems, details] = await Promise.all([
      customerCurrentAffairsService.submitQuiz(payload),
      customerCurrentAffairsService.checkAnswers(payload),
      customerCurrentAffairsService.getDetails(id).catch(() => null),
    ]);

    const paper = details
      ? mapQuizDetailsToQuestions(details).paper
      : null;

    return mapQuizResultsToSubmitResult(submitResult, reviewItems, paper);
  },
};

export type { CurrentAffairsCategory, MainsCategory };
