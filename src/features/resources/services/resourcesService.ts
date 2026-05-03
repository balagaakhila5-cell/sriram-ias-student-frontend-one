import apiClient from "@/services/apiClient";

/* ------------------------------------------------------------------ */
/*  Shared / raw shapes                                                */
/* ------------------------------------------------------------------ */

interface CloudinaryAsset {
  url: string;
  public_id?: string;
}

export interface ResourceCategory {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

export interface ResourceSubCategory {
  _id: string;
  name: string;
  category?: string;
}

export interface ResourceFilter {
  _id: string;
  type: "SUBJECT" | "CLASS" | "PAPER" | "YEAR";
  value: string;
  category?: string;
  subCategory?: string;
}

export interface ResourceFile {
  _id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  category?: string | ResourceCategory;
  subCategory?: string | ResourceSubCategory;
  subject?: string | ResourceFilter;
  class?: string | ResourceFilter;
  paper?: string | ResourceFilter;
  year?: string | ResourceFilter;
}

export interface MockTestQuestion {
  _id: string;
  question: string;
  options: string[];
  correctAnswer?: string;
  explanation?: string;
  marks: number;
  negativeMarks?: number;
}

export interface MockTestSummary {
  _id: string;
  title: string;
  description?: string;
  duration: number;
  passingMarks?: number;
  totalQuestions?: number;
  totalMarks?: number;
  category?: string | ResourceCategory;
  subCategory?: string | ResourceSubCategory;
  paper?: string | ResourceFilter;
}

export interface MockTestDetail extends MockTestSummary {
  questions: MockTestQuestion[];
}

export interface MockTestAttemptPayload {
  startedAt: string;
  timeTaken: number;
  answers: Record<string, string>;
}

export interface MockTestResult {
  _id: string;
  test?: string | MockTestSummary;
  score?: number;
  totalMarks?: number;
  correctCount?: number;
  incorrectCount?: number;
  unattemptedCount?: number;
  totalQuestions?: number;
  passed?: boolean;
  percentage?: number;
  timeTaken?: number;
  startedAt?: string;
  submittedAt?: string;
  answers?: Record<string, string>;
  evaluation?: Array<{
    questionId: string;
    question?: string;
    options?: string[];
    selected?: string;
    correctAnswer?: string;
    isCorrect?: boolean;
    marksAwarded?: number;
    explanation?: string;
  }>;
}

/* ------------------------------------------------------------------ */
/*  Raw response envelopes                                             */
/* ------------------------------------------------------------------ */

interface RawCategoryEnvelope {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: CloudinaryAsset | string;
}

interface RawFileEnvelope {
  _id: string;
  title: string;
  description?: string;
  file?: CloudinaryAsset;
  fileUrl?: string;
  url?: string;
  category?: unknown;
  subCategory?: unknown;
  subject?: unknown;
  class?: unknown;
  paper?: unknown;
  year?: unknown;
}

const unwrapList = <T,>(data: unknown, keys: string[]): T[] => {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const k of keys) {
      const v = obj[k];
      if (Array.isArray(v)) return v as T[];
    }
    if (Array.isArray(obj.data)) return obj.data as T[];
  }
  return [];
};

const unwrapOne = <T,>(data: unknown, keys: string[]): T | null => {
  if (!data) return null;
  if (typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;
  for (const k of keys) {
    if (obj[k] && typeof obj[k] === "object") return obj[k] as T;
  }
  if (obj.data && typeof obj.data === "object") return obj.data as T;
  return data as T;
};

const normaliseCategory = (raw: RawCategoryEnvelope): ResourceCategory => ({
  _id: raw._id,
  name: raw.name,
  description: raw.description,
  thumbnail:
    typeof raw.thumbnail === "string"
      ? raw.thumbnail
      : raw.thumbnail?.url,
});

const normaliseFile = (raw: RawFileEnvelope): ResourceFile => ({
  _id: raw._id,
  title: raw.title,
  description: raw.description,
  fileUrl: raw.file?.url ?? raw.fileUrl ?? raw.url,
  category: raw.category as ResourceFile["category"],
  subCategory: raw.subCategory as ResourceFile["subCategory"],
  subject: raw.subject as ResourceFile["subject"],
  class: raw.class as ResourceFile["class"],
  paper: raw.paper as ResourceFile["paper"],
  year: raw.year as ResourceFile["year"],
});

/* ------------------------------------------------------------------ */
/*  Service                                                            */
/* ------------------------------------------------------------------ */

export interface FilterQuery {
  type: "SUBJECT" | "CLASS" | "PAPER" | "YEAR";
  categoryId?: string;
  subCategoryId?: string;
  moduleType?: "NCERT" | "PYQ";
}

export interface FilesQuery {
  categoryId?: string;
  subCategoryId?: string;
  subjectId?: string;
  classId?: string;
  paperId?: string;
  yearId?: string;
}

export interface MockTestsQuery {
  categoryId?: string;
  subCategoryId?: string;
  paperId?: string;
}

export const resourcesService = {
  listCategories: async (): Promise<ResourceCategory[]> => {
    const { data } = await apiClient.get("/api/resources/categories");
    return unwrapList<RawCategoryEnvelope>(data, ["categories"]).map(
      normaliseCategory,
    );
  },

  listSubCategories: async (
    categoryId?: string,
  ): Promise<ResourceSubCategory[]> => {
    const { data } = await apiClient.get("/api/resources/subcategories", {
      params: categoryId ? { categoryId } : {},
    });
    return unwrapList<ResourceSubCategory>(data, ["subcategories", "subCategories"]);
  },

  listFilters: async (query: FilterQuery): Promise<ResourceFilter[]> => {
    const { data } = await apiClient.get("/api/resources/filters", {
      params: query,
    });
    return unwrapList<ResourceFilter>(data, ["filters"]);
  },

  listFiles: async (query: FilesQuery = {}): Promise<ResourceFile[]> => {
    const { data } = await apiClient.get("/api/resources/files", {
      params: query,
    });
    return unwrapList<RawFileEnvelope>(data, ["files", "resources"]).map(
      normaliseFile,
    );
  },

  getFile: async (id: string): Promise<ResourceFile | null> => {
    const { data } = await apiClient.get(`/api/resources/files/${id}`);
    const raw = unwrapOne<RawFileEnvelope>(data, ["file", "resource"]);
    return raw ? normaliseFile(raw) : null;
  },

  /* ------------- Mock tests ------------- */

  listMockTests: async (
    query: MockTestsQuery = {},
  ): Promise<MockTestSummary[]> => {
    const { data } = await apiClient.get("/api/resources/mock-tests", {
      params: query,
    });
    return unwrapList<MockTestSummary>(data, ["mockTests", "tests"]);
  },

  getMockTest: async (id: string): Promise<MockTestDetail | null> => {
    const { data } = await apiClient.get(`/api/resources/mock-tests/${id}`);
    return unwrapOne<MockTestDetail>(data, ["mockTest", "test"]);
  },

  submitMockTest: async (
    id: string,
    payload: MockTestAttemptPayload,
  ): Promise<MockTestResult> => {
    const { data } = await apiClient.post(
      `/api/resources/mock-tests/${id}/attempt`,
      payload,
    );
    const result = unwrapOne<MockTestResult>(data, ["result", "attempt"]);
    return result ?? (data as MockTestResult);
  },

  getMockTestResult: async (resultId: string): Promise<MockTestResult | null> => {
    const { data } = await apiClient.get(
      `/api/resources/mock-tests/results/${resultId}`,
    );
    return unwrapOne<MockTestResult>(data, ["result", "attempt"]);
  },

  listMockTestResults: async (): Promise<MockTestResult[]> => {
    const { data } = await apiClient.get("/api/resources/mock-tests/results");
    return unwrapList<MockTestResult>(data, ["results", "attempts"]);
  },
};
