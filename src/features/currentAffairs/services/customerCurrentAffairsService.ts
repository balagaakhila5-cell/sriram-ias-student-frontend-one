import { http } from "@/lib/http";
import type { ApiEnvelope } from "@/lib/apiResult";
import type {
  CurrentAffairsListItem,
  CurrentAffairsListQuery,
  FilterQuery,
  LabelValueOption,
  PaginatedListMeta,
  PdfDownloadData,
  PdfViewData,
  QuizCheckAnswerItem,
  QuizDetailsData,
  QuizSubmitPayload,
  QuizSubmitResult,
} from "../types/customerCurrentAffairs";

const BASE = "/customer/current-affairs";

type PaginatedEnvelope<T> = ApiEnvelope<T> & PaginatedListMeta;

async function post<T>(path: string, body: object = {}) {
  const { data } = await http.post<ApiEnvelope<T>>(`${BASE}${path}`, body);
  return data.data;
}

async function postList<T>(
  path: string,
  body: object = {},
): Promise<{ items: T[] } & PaginatedListMeta> {
  const { data } = await http.post<PaginatedEnvelope<T>>(`${BASE}${path}`, body);
  return {
    items: (data.data ?? []) as T[],
    count: data.count ?? 0,
    total: data.total ?? 0,
    page: data.page ?? 1,
    limit: data.limit ?? 12,
    totalPages: data.totalPages ?? 0,
    hasNextPage: data.hasNextPage ?? false,
    hasPrevPage: data.hasPrevPage ?? false,
  };
}

export const customerCurrentAffairsService = {
  getCategories: () => post<LabelValueOption[]>("/categories"),

  getMainsCategories: () => post<LabelValueOption[]>("/mains-categories"),

  getYears: (query: FilterQuery) => post<Array<string | number>>("/years", query),

  getMonths: (query: FilterQuery) => post<string[]>("/months", query),

  getDates: (query: FilterQuery) => post<string[]>("/dates", query),

  list: (query: CurrentAffairsListQuery) =>
    postList<CurrentAffairsListItem>("/list", query),

  view: (resourceId: string) =>
    post<PdfViewData>("/view", { resourceId }),

  download: (resourceId: string) =>
    post<PdfDownloadData>("/download", { resourceId }),

  sample: (resourceId: string) =>
    post<PdfViewData>("/sample", { resourceId }),

  getDetails: (currentAffairId: string) =>
    post<QuizDetailsData>("/details", { currentAffairId }),

  submitQuiz: (payload: QuizSubmitPayload) =>
    post<QuizSubmitResult>("/submit", payload),

  checkAnswers: (payload: QuizSubmitPayload) =>
    post<QuizCheckAnswerItem[]>("/check-answers", payload),
};
