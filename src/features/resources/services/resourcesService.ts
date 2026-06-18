import {
  getDemoMockTestDetail,
  listDemoMockTestCards,
} from "../catalog/demoMockTests";
import {
  catalogDocumentToResourceFile,
  listFreeResourceDocuments,
} from "../catalog/freeResources";
import type { FreeResourcesSubtopicId } from "../catalog/types";

/* ------------------------------------------------------------------ */
/*  Shared / raw shapes                                                */
/* ------------------------------------------------------------------ */

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

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_CATEGORIES: ResourceCategory[] = [
  { _id: "mock-ncert", name: "NCERT Books" },
  { _id: "mock-pyq", name: "Previous Year Question Papers" },
  { _id: "mock-mock-tests", name: "Free Mock Tests" },
  { _id: "mock-study-materials", name: "Study Materials" },
];

const MOCK_SUBCATEGORIES: ResourceSubCategory[] = [
  { _id: "mock-prelims", name: "prelims", category: "mock-mock-tests" },
  { _id: "mock-mains", name: "mains", category: "mock-mock-tests" },
];

const SUBTOPIC_BY_CATEGORY: Record<string, FreeResourcesSubtopicId> = {
  "mock-ncert": "ncert-books",
  "mock-pyq": "previous-year",
  "mock-study-materials": "study-materials",
};

function filesForSubtopic(subtopic: FreeResourcesSubtopicId): ResourceFile[] {
  return listFreeResourceDocuments(subtopic).map(catalogDocumentToResourceFile);
}

function evaluateDemoAttempt(
  testId: string,
  payload: MockTestAttemptPayload,
): MockTestResult {
  const test = getDemoMockTestDetail(testId);
  if (!test) throw new Error("Mock test not found");

  let correctCount = 0;
  for (const question of test.questions) {
    if (payload.answers[question._id] === question.correctAnswer) {
      correctCount += 1;
    }
  }

  const total = test.questions.length;
  const answeredCount = Object.values(payload.answers).filter(
    (answer) => answer !== undefined && answer !== "",
  ).length;
  const incorrectCount = Math.max(answeredCount - correctCount, 0);
  const unattemptedCount = Math.max(total - answeredCount, 0);

  return {
    _id: `demo-result-${testId}-${Date.now()}`,
    score: correctCount * 2,
    totalMarks: total * 2,
    correctCount,
    incorrectCount,
    unattemptedCount,
    totalQuestions: total,
    passed: correctCount >= Math.ceil(total * 0.4),
    percentage: Math.round((correctCount / total) * 100),
    timeTaken: payload.timeTaken,
    startedAt: payload.startedAt,
    submittedAt: new Date().toISOString(),
    answers: payload.answers,
  };
}

export const resourcesService = {
  listCategories: async (): Promise<ResourceCategory[]> => {
    await delay();
    return MOCK_CATEGORIES;
  },

  listSubCategories: async (
    categoryId?: string,
  ): Promise<ResourceSubCategory[]> => {
    await delay();
    if (!categoryId) return [];
    return MOCK_SUBCATEGORIES.filter((item) => item.category === categoryId);
  },

  listFilters: async (query: FilterQuery): Promise<ResourceFilter[]> => {
    await delay();
    if (query.type === "SUBJECT") {
      return [
        { _id: "filter-history", type: "SUBJECT", value: "History" },
        { _id: "filter-geography", type: "SUBJECT", value: "Geography" },
        { _id: "filter-polity", type: "SUBJECT", value: "Polity" },
      ];
    }
    if (query.type === "CLASS") {
      return [
        { _id: "filter-class-6", type: "CLASS", value: "Class 6" },
        { _id: "filter-class-7", type: "CLASS", value: "Class 7" },
        { _id: "filter-class-8", type: "CLASS", value: "Class 8" },
      ];
    }
    if (query.type === "PAPER") {
      return [
        {
          _id: "filter-prelims-gs",
          type: "PAPER",
          value: "General Studies",
          subCategory: "mock-prelims",
        },
        {
          _id: "filter-prelims-csat",
          type: "PAPER",
          value: "CSAT",
          subCategory: "mock-prelims",
        },
        {
          _id: "filter-mains-gs1",
          type: "PAPER",
          value: "GS I",
          subCategory: "mock-mains",
        },
        {
          _id: "filter-mains-gs2",
          type: "PAPER",
          value: "GS II",
          subCategory: "mock-mains",
        },
        {
          _id: "filter-mains-gs3",
          type: "PAPER",
          value: "GS III",
          subCategory: "mock-mains",
        },
        {
          _id: "filter-mains-gs4",
          type: "PAPER",
          value: "GS IV",
          subCategory: "mock-mains",
        },
      ];
    }
    return [
      { _id: "filter-year-2026", type: "YEAR", value: "2026" },
      { _id: "filter-year-2025", type: "YEAR", value: "2025" },
      { _id: "filter-year-2024", type: "YEAR", value: "2024" },
    ];
  },

  listFiles: async (query: FilesQuery = {}): Promise<ResourceFile[]> => {
    await delay();
    const subtopic = query.categoryId
      ? SUBTOPIC_BY_CATEGORY[query.categoryId]
      : undefined;
    return subtopic ? filesForSubtopic(subtopic) : [];
  },

  getFile: async (id: string): Promise<ResourceFile | null> => {
    await delay();
    const allFiles = [
      ...filesForSubtopic("ncert-books"),
      ...filesForSubtopic("previous-year"),
      ...filesForSubtopic("study-materials"),
    ];
    return allFiles.find((file) => file._id === id) ?? null;
  },

  listMockTests: async (
    query: MockTestsQuery = {},
  ): Promise<MockTestSummary[]> => {
    await delay();
    const examType = query.subCategoryId?.includes("mains")
      ? "mains"
      : "prelims";
    return listDemoMockTestCards(examType).map((card) => ({
      _id: card._id,
      title: `${card.title} — ${card.subtitle}`,
      duration: card.duration,
      totalQuestions: card.totalQuestions,
    }));
  },

  getMockTest: async (id: string): Promise<MockTestDetail | null> => {
    await delay();
    return getDemoMockTestDetail(id);
  },

  submitMockTest: async (
    id: string,
    payload: MockTestAttemptPayload,
  ): Promise<MockTestResult> => {
    await delay();
    return evaluateDemoAttempt(id, payload);
  },

  getMockTestResult: async (resultId: string): Promise<MockTestResult | null> => {
    await delay();
    const match = resultId.match(/^demo-result-(demo-mock-(?:prelims|mains)-\d+)-/);
    if (!match) return null;

    const testId = match[1];
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(`test-review-${testId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as {
            result?: MockTestResult;
          };
          if (parsed.result) {
            return parsed.result;
          }
        } catch {
          /* ignore invalid stored payload */
        }
      }
    }

    return null;
  },

  listMockTestResults: async (): Promise<MockTestResult[]> => {
    await delay();
    return [];
  },
};
