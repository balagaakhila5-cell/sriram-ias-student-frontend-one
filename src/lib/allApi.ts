import { httpClient } from "@/lib/httpClient";
import type { ApiQueryParams, ApiRequestBody } from "@/types/api";
import type {
  CurrentAffairItem,
  CurrentAffairsListFilters,
  CurrentAffairsListResult,
  CurrentAffairsQuestion,
  CurrentAffairsQuestionsResult,
  CurrentAffairsReviewItem,
  CurrentAffairsSubmitResult,
  SubmitAnswerInput,
} from "@/features/currentAffairs/types";

/* ================================================================== */
/*  ENDPOINT REGISTRY — single source of truth for all API paths       */
/* ================================================================== */

const API = {
  auth: {
    login: "/api/auth/login",
    studentSignup: "/api/auth/student-signup",
    verifyStudentSignup: "/api/auth/verify-student-signup",
    verifyOtp: "/api/auth/verify-otp",
  },
  enquiry: {
    submit: "/api/enquiries",
    centers: "/api/centers",
    courses: "/api/courses/enquiry",
    courseCenters: "/api/public/course-centers",
  },
  currentAffairs: {
    list: "/api/portal/current-affairs",
    questions: (id: string) =>
      `/api/portal/current-affairs/${encodeURIComponent(id)}/questions`,
    submit: (id: string) =>
      `/api/portal/current-affairs/${encodeURIComponent(id)}/submit`,
  },
} as const;

/* ================================================================== */
/*  REQUEST HELPERS                                                    */
/* ================================================================== */

export async function apiRequestGet<T = unknown>(
  endpoint: string,
  params?: ApiQueryParams,
): Promise<T> {
  const { data } = await httpClient.get<T>(endpoint, { params });
  return data;
}

export async function apiRequestWithoutToken<T = unknown>(
  endpoint: string,
  body: ApiRequestBody = {},
): Promise<T> {
  const { data } = await httpClient.post<T>(endpoint, body, { skipAuth: true });
  return data;
}

export async function apiRequestWithToken<T = unknown>(
  endpoint: string,
  body: ApiRequestBody,
  token?: string,
): Promise<T> {
  const { data } = await httpClient.post<T>(endpoint, body, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
}

/* ================================================================== */
/*  PRIVATE RESPONSE HELPERS                                           */
/* ================================================================== */

const unwrap = (raw: unknown): Record<string, unknown> => {
  const top = (raw ?? {}) as Record<string, unknown>;
  const inner = top.data;
  return (inner && typeof inner === "object" ? inner : top) as Record<
    string,
    unknown
  >;
};

const toNumber = (value: unknown, fallback = 0): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const mapRecordList = <T>(
  list: unknown,
  mapper: (item: Record<string, unknown>) => T | null,
): T[] =>
  (Array.isArray(list) ? list : [])
    .map((item) => mapper(item as Record<string, unknown>))
    .filter((item): item is T => item !== null);

/* ================================================================== */
/*  AUTH                                                               */
/* ================================================================== */

export const authStudentSignup = (postData: ApiRequestBody) =>
  apiRequestWithoutToken(API.auth.studentSignup, postData);

export const authVerifyStudentSignup = (postData: ApiRequestBody) =>
  apiRequestWithoutToken(API.auth.verifyStudentSignup, postData);

export const authLogin = (postData: ApiRequestBody) =>
  apiRequestWithoutToken(API.auth.login, postData);

export const authVerifyOtp = (postData: ApiRequestBody) =>
  apiRequestWithoutToken(API.auth.verifyOtp, postData);

/* ================================================================== */
/*  ENQUIRY                                                            */
/* ================================================================== */

export interface EnquiryCenter {
  _id: string;
  name: string;
}

export interface EnquiryCourse {
  _id: string;
  title: string;
}

export interface PublicCourseCenter {
  _id: string;
  centerName: string;
  city: string;
  centerCode: string;
}

export const submitEnquiry = (postData: ApiRequestBody) =>
  apiRequestWithoutToken<{ message?: string }>(API.enquiry.submit, postData);

export const getEnquiryCenters = async (): Promise<EnquiryCenter[]> => {
  const data = await apiRequestGet<Record<string, unknown>>(API.enquiry.centers);
  const list = Array.isArray(data?.centers)
    ? data.centers
    : Array.isArray(data?.data)
      ? data.data
      : [];

  return mapRecordList(list, (item) => {
    const _id = String(item._id ?? item.id ?? "");
    const name = String(item.name ?? item.centerName ?? "");
    return _id && name ? { _id, name } : null;
  });
};

export const getEnquiryCourses = async (
  centerName?: string,
): Promise<EnquiryCourse[]> => {
  const params: ApiQueryParams = {};
  if (centerName) params.centerName = centerName;

  const data = await apiRequestGet<Record<string, unknown>>(
    API.enquiry.courses,
    params,
  );
  const list = Array.isArray(data?.courses)
    ? data.courses
    : Array.isArray(data?.data)
      ? data.data
      : [];

  return mapRecordList(list, (item) => {
    const _id = String(item._id ?? item.id ?? "");
    const title = String(item.title ?? item.courseName ?? item.name ?? "");
    return _id && title ? { _id, title } : null;
  });
};

export const listCourseCenters = async (): Promise<PublicCourseCenter[]> => {
  const data = await apiRequestWithoutToken<{ data?: unknown }>(
    API.enquiry.courseCenters,
    {},
  );
  const list = Array.isArray(data?.data) ? data.data : [];

  return mapRecordList(list, (item) => {
    const _id = String(item._id ?? item.id ?? "");
    const centerName = String(item.centerName ?? item.name ?? "");
    if (!_id || !centerName) return null;

    return {
      _id,
      centerName,
      city: String(item.city ?? ""),
      centerCode: String(item.centerCode ?? item.code ?? ""),
    };
  });
};

/* ================================================================== */
/*  CURRENT AFFAIRS                                                    */
/* ================================================================== */

export const listCurrentAffairs = async (
  filters: CurrentAffairsListFilters = {},
): Promise<CurrentAffairsListResult> => {
  const params: ApiQueryParams = {};
  if (filters.category) params.category = filters.category;
  if (filters.year != null && filters.year !== "")
    params.year = String(filters.year);
  if (filters.month) params.month = filters.month;
  if (filters.mainsCategory) params.mainsCategory = filters.mainsCategory;
  if (filters.date) params.date = filters.date;
  if (filters.page) params.page = String(filters.page);
  if (filters.limit) params.limit = String(filters.limit);

  const data = await apiRequestGet(API.currentAffairs.list, params);
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
};

export const getCurrentAffairsQuestions = async (
  id: string,
): Promise<CurrentAffairsQuestionsResult> => {
  const data = await apiRequestGet(API.currentAffairs.questions(id));
  const payload = unwrap(data);
  const questions = (Array.isArray(payload.questions)
    ? payload.questions
    : []) as CurrentAffairsQuestion[];

  return {
    paper: (payload.paper as CurrentAffairItem | undefined) ?? null,
    count: toNumber(payload.count, questions.length),
    questions,
  };
};

export const submitCurrentAffairsAnswers = async (
  id: string,
  answers: SubmitAnswerInput[],
): Promise<CurrentAffairsSubmitResult> => {
  const data = await apiRequestWithToken(API.currentAffairs.submit(id), {
    answers,
  });
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
};

/* Re-export endpoint registry for debugging / reference. */
export { API as API_ENDPOINTS };
