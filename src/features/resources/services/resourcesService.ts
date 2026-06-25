import {
  getDemoMockTestDetail,
  listDemoMockTestCards,
} from "../catalog/demoMockTests";
import {
  catalogDocumentToResourceFile,
  listFreeResourceDocuments,
} from "../catalog/freeResources";
import type { FreeResourcesSubtopicId } from "../catalog/types";
import {
  mapCategoriesToResourceCategories,
  mapCheckAnswersToEvaluation,
  mapMockTestDetail,
  mapMockTestListToSummaries,
  mapMockTestSubmitResult,
  mapNcertBooksToFiles,
  mapPyqPapersToFiles,
  mapStringsToFilters,
  mapStudyMaterialsToFiles,
} from "../adapters/customerFreeResourcesAdapter";
import { customerFreeResourcesService } from "./customerFreeResourcesService";
import type {
  MockTestListQuery,
  NcertListQuery,
  PaperTypeValue,
  PyqListQuery,
  StudyMaterialCategoryValue,
  StudyMaterialListQuery,
} from "../types/customerFreeResources";

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
  optionKeys?: string[];
  questionType?: "SINGLE" | "MULTIPLE";
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
  answers: Record<string, string | string[]>;
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
  grade?: string;
  timeTaken?: number;
  startedAt?: string;
  submittedAt?: string;
  answers?: Record<string, string | string[]>;
  evaluation?: Array<{
    questionId: string;
    question?: string;
    options?: string[];
    selected?: string;
    selectedAnswers?: string[];
    correctAnswer?: string;
    correctAnswers?: string[];
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
  paperType?: PaperTypeValue;
}

export interface FilesQuery {
  categoryId?: string;
  subCategoryId?: string;
  subjectId?: string;
  classId?: string;
  paperId?: string;
  yearId?: string;
  search?: string;
  subject?: string;
  class?: string;
  paper?: string;
  year?: string;
  paperType?: PaperTypeValue;
  studyCategory?: StudyMaterialCategoryValue;
}

export interface MockTestsQuery {
  categoryId?: string;
  subCategoryId?: string;
  paperId?: string;
  paperType?: PaperTypeValue;
  paper?: string;
}

const SUBTOPIC_BY_CATEGORY: Record<string, FreeResourcesSubtopicId> = {
  NCERT_BOOKS: "ncert-books",
  PREVIOUS_YEAR_QUESTIONS: "previous-year",
  STUDY_MATERIAL: "study-materials",
};

function filesForSubtopic(subtopic: FreeResourcesSubtopicId): ResourceFile[] {
  return listFreeResourceDocuments(subtopic).map(catalogDocumentToResourceFile);
}

function filterIdToValue(id?: string): string | undefined {
  if (!id) return undefined;
  const index = id.indexOf("-");
  return index >= 0 ? id.slice(index + 1) : id;
}

function resolveYearFromId(yearId?: string): number | undefined {
  if (!yearId) return undefined;
  const match = yearId.match(/(\d{4})$/);
  return match ? Number(match[1]) : undefined;
}

function toSubmitAnswers(
  test: MockTestDetail,
  answers: Record<string, string | string[]>,
) {
  return test.questions.map((question) => {
    const raw = answers[question._id];
    const selectedValues = Array.isArray(raw)
      ? raw
      : raw
        ? [raw]
        : [];

    const selectedAnswers =
      question.optionKeys && question.optionKeys.length > 0
        ? selectedValues.map((value) => {
            const index = question.options.indexOf(value);
            if (index >= 0 && question.optionKeys?.[index]) {
              return question.optionKeys[index];
            }
            return value;
          })
        : selectedValues;

    return {
      questionId: question._id,
      selectedAnswers,
    };
  });
}

export const resourcesService = {
  listCategories: async (): Promise<ResourceCategory[]> => {
    const categories = await customerFreeResourcesService.getCategories();
    return mapCategoriesToResourceCategories(categories);
  },

  listSubCategories: async (
    categoryId?: string,
  ): Promise<ResourceSubCategory[]> => {
    if (!categoryId) return [];

    if (categoryId === "FREE_MOCK_TEST") {
      const paperTypes = await customerFreeResourcesService.getMockTestPaperTypes();
      return paperTypes.map((item) => ({
        _id: item.value.toLowerCase(),
        name: item.label.toLowerCase(),
        category: categoryId,
      }));
    }

    if (categoryId === "STUDY_MATERIAL") {
      const categories =
        await customerFreeResourcesService.getStudyMaterialCategories();
      return categories.map((item) => ({
        _id: item.value.toLowerCase(),
        name: item.label.toLowerCase(),
        category: categoryId,
      }));
    }

    if (categoryId === "PREVIOUS_YEAR_QUESTIONS") {
      const paperTypes = await customerFreeResourcesService.getPyqPaperTypes();
      return paperTypes.map((item) => ({
        _id: item.value.toLowerCase(),
        name: item.label.toLowerCase(),
        category: categoryId,
      }));
    }

    return [];
  },

  listFilters: async (query: FilterQuery): Promise<ResourceFilter[]> => {
    if (query.type === "SUBJECT" && query.moduleType === "NCERT") {
      const subjects = await customerFreeResourcesService.getNcertSubjects();
      return mapStringsToFilters(subjects, "SUBJECT");
    }

    if (query.type === "CLASS" && query.moduleType === "NCERT") {
      const classes = await customerFreeResourcesService.getNcertClasses();
      return mapStringsToFilters(classes, "CLASS");
    }

    if (query.type === "PAPER") {
      const paperType =
        query.paperType ||
        (query.subCategoryId?.toUpperCase() as PaperTypeValue | undefined);

      if (!paperType) return [];

      if (query.moduleType === "PYQ" || query.categoryId === "PREVIOUS_YEAR_QUESTIONS") {
        const papers = await customerFreeResourcesService.getPyqPapers(paperType);
        return mapStringsToFilters(papers, "PAPER").map((item) => ({
          ...item,
          subCategory: query.subCategoryId,
        }));
      }

      const papers = await customerFreeResourcesService.getMockTestPapers(paperType);
      return mapStringsToFilters(papers, "PAPER").map((item) => ({
        ...item,
        subCategory: query.subCategoryId,
      }));
    }

    if (query.type === "YEAR") {
      const years = await customerFreeResourcesService.getPyqYears();
      return years.map((year) => ({
        _id: `filter-year-${year}`,
        type: "YEAR" as const,
        value: String(year),
      }));
    }

    return [];
  },

  listFiles: async (query: FilesQuery = {}): Promise<ResourceFile[]> => {
    const categoryId = query.categoryId;

    if (categoryId === "NCERT_BOOKS") {
      const payload: NcertListQuery = {
        search: query.search,
        subject: query.subject ?? filterIdToValue(query.subjectId),
        class: query.class ?? filterIdToValue(query.classId),
      };
      const books = await customerFreeResourcesService.listNcertBooks(payload);
      return mapNcertBooksToFiles(books);
    }

    if (categoryId === "PREVIOUS_YEAR_QUESTIONS") {
      const payload: PyqListQuery = {
        search: query.search,
        paperType:
          query.paperType ||
          (query.subCategoryId?.toUpperCase() as PaperTypeValue | undefined),
        paper: query.paper ?? filterIdToValue(query.paperId),
        year: query.year
          ? Number(query.year)
          : resolveYearFromId(query.yearId),
      };
      const papers = await customerFreeResourcesService.listPyqPapers(payload);
      return mapPyqPapersToFiles(papers);
    }

    if (categoryId === "STUDY_MATERIAL") {
      const payload: StudyMaterialListQuery = {
        search: query.search,
        category:
          query.studyCategory ||
          (query.subCategoryId?.toUpperCase() as StudyMaterialCategoryValue | undefined),
      };
      const materials =
        await customerFreeResourcesService.listStudyMaterials(payload);
      return mapStudyMaterialsToFiles(materials);
    }

    const subtopic = categoryId ? SUBTOPIC_BY_CATEGORY[categoryId] : undefined;
    return subtopic ? filesForSubtopic(subtopic) : [];
  },

  getFile: async (id: string): Promise<ResourceFile | null> => {
    try {
      const [ncert, pyq, study] = await Promise.allSettled([
        customerFreeResourcesService.viewNcertBook(id),
        customerFreeResourcesService.viewPyqPaper(id),
        customerFreeResourcesService.viewStudyMaterial(id),
      ]);

      const resolved =
        ncert.status === "fulfilled"
          ? ncert.value
          : pyq.status === "fulfilled"
            ? pyq.value
            : study.status === "fulfilled"
              ? study.value
              : null;

      if (!resolved) return null;

      return {
        _id: id,
        title: resolved.resourceName || resolved.studyMaterialName || "Resource",
        fileUrl: resolved.fileUrl,
      };
    } catch {
      const allFiles = [
        ...filesForSubtopic("ncert-books"),
        ...filesForSubtopic("previous-year"),
        ...filesForSubtopic("study-materials"),
      ];
      return allFiles.find((file) => file._id === id) ?? null;
    }
  },

  listMockTests: async (
    query: MockTestsQuery = {},
  ): Promise<MockTestSummary[]> => {
    const payload: MockTestListQuery = {
      paperType:
        query.paperType ||
        (query.subCategoryId?.toUpperCase() as PaperTypeValue | undefined),
      paper: query.paper ?? filterIdToValue(query.paperId),
    };
    const tests = await customerFreeResourcesService.listMockTests(payload);
    return mapMockTestListToSummaries(tests);
  },

  getMockTest: async (id: string): Promise<MockTestDetail | null> => {
    const demo = getDemoMockTestDetail(id);
    if (demo) return demo;

    const data = await customerFreeResourcesService.getMockTestDetails(id);
    return mapMockTestDetail(data);
  },

  submitMockTest: async (
    id: string,
    payload: MockTestAttemptPayload,
  ): Promise<MockTestResult> => {
    const test = await resourcesService.getMockTest(id);
    if (!test) throw new Error("Mock test not found");

    const submitPayload = {
      mockTestId: id,
      timeTaken: payload.timeTaken,
      answers: toSubmitAnswers(test, payload.answers),
    };

    const [submitResult, checkAnswers] = await Promise.all([
      customerFreeResourcesService.submitMockTest(submitPayload),
      customerFreeResourcesService.checkMockTestAnswers(submitPayload),
    ]);

    const result = mapMockTestSubmitResult(submitResult);
    return {
      ...result,
      startedAt: payload.startedAt,
      submittedAt: new Date().toISOString(),
      answers: payload.answers,
      evaluation: mapCheckAnswersToEvaluation(checkAnswers),
    };
  },

  getMockTestResult: async (resultId: string): Promise<MockTestResult | null> => {
    if (typeof window !== "undefined") {
      const match = resultId.match(/^result-(.+)-\d+$/);
      const testId = match?.[1];
      if (testId) {
        const saved = window.localStorage.getItem(`test-review-${testId}`);
        if (saved) {
          try {
            const parsed = JSON.parse(saved) as { result?: MockTestResult };
            if (parsed.result) return parsed.result;
          } catch {
            /* ignore invalid stored payload */
          }
        }
      }
    }

    return null;
  },

  listMockTestResults: async (): Promise<MockTestResult[]> => [],
};
