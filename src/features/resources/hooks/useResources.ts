"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDemoMockTestDetail,
  isDemoMockTestId,
} from "../catalog/demoMockTests";
import {
  resourcesService,
  type FilesQuery,
  type FilterQuery,
  type MockTestAttemptPayload,
  type MockTestsQuery,
} from "../services/resourcesService";

export const resourcesKeys = {
  categories: ["resources", "categories"] as const,
  subcategories: (categoryId?: string) =>
    ["resources", "subcategories", categoryId ?? "all"] as const,
  filters: (query: FilterQuery) => ["resources", "filters", query] as const,
  files: (query: FilesQuery) => ["resources", "files", query] as const,
  file: (id: string) => ["resources", "file", id] as const,
  mockTests: (query: MockTestsQuery) =>
    ["resources", "mockTests", query] as const,
  mockTest: (id: string) => ["resources", "mockTest", id] as const,
  mockTestResults: ["resources", "mockTestResults"] as const,
  mockTestResult: (id: string) =>
    ["resources", "mockTestResult", id] as const,
};

export function useResourceCategories() {
  return useQuery({
    queryKey: resourcesKeys.categories,
    queryFn: resourcesService.listCategories,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useResourceSubCategories(categoryId?: string) {
  return useQuery({
    queryKey: resourcesKeys.subcategories(categoryId),
    queryFn: () => resourcesService.listSubCategories(categoryId),
    enabled: !!categoryId,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useResourceFilters(query: FilterQuery, enabled = true) {
  return useQuery({
    queryKey: resourcesKeys.filters(query),
    queryFn: () => resourcesService.listFilters(query),
    enabled,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useResourceFiles(query: FilesQuery, enabled = true) {
  return useQuery({
    queryKey: resourcesKeys.files(query),
    queryFn: () => resourcesService.listFiles(query),
    enabled: enabled && !!query.categoryId,
    retry: 1,
  });
}

export function useMockTests(query: MockTestsQuery, enabled = true) {
  return useQuery({
    queryKey: resourcesKeys.mockTests(query),
    queryFn: () => resourcesService.listMockTests(query),
    enabled,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMockTest(id: string | undefined) {
  return useQuery({
    queryKey: resourcesKeys.mockTest(id ?? ""),
    queryFn: async () => {
      if (id && isDemoMockTestId(id)) {
        const demo = getDemoMockTestDetail(id);
        if (demo) return demo;
      }
      return resourcesService.getMockTest(id as string);
    },
    enabled: !!id,
    retry: 1,
  });
}

export function useSubmitMockTest(testId: string | undefined) {
  return useMutation({
    mutationFn: async (payload: MockTestAttemptPayload) => {
      if (testId && isDemoMockTestId(testId)) {
        const test = getDemoMockTestDetail(testId);
        if (!test) throw new Error("Demo test not found");
        let correctCount = 0;
        for (const q of test.questions) {
          const answer = payload.answers[q._id];
          if (answer === q.correctAnswer) correctCount += 1;
        }
        const total = test.questions.length;
        const answeredCount = Object.values(payload.answers).filter(
          (answer) =>
            answer !== undefined &&
            answer !== "" &&
            !(Array.isArray(answer) && answer.length === 0),
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
        };
      }
      return resourcesService.submitMockTest(testId as string, payload);
    },
  });
}

export function useMockTestResult(resultId: string | undefined) {
  return useQuery({
    queryKey: resourcesKeys.mockTestResult(resultId ?? ""),
    queryFn: () => resourcesService.getMockTestResult(resultId as string),
    enabled: !!resultId,
  });
}

export function useMockTestHistory() {
  return useQuery({
    queryKey: resourcesKeys.mockTestResults,
    queryFn: resourcesService.listMockTestResults,
  });
}

export const RESOURCE_CATEGORY_NAMES = {
  NCERT: ["ncert", "ncert books", "ncert_books"],
  PYQ: ["pyq", "previous year question papers", "previous year", "previous_year_questions"],
  MOCK_TESTS: ["mock", "free mock tests", "mock tests", "free_mock_test"],
  STUDY_MATERIALS: ["study material", "study materials", "study_material"],
} as const;

export type ResourceCategoryKey = keyof typeof RESOURCE_CATEGORY_NAMES;

export function findCategoryByKey(
  categories: { _id: string; name: string }[] | undefined,
  key: ResourceCategoryKey,
) {
  if (!categories) return undefined;
  const candidates = RESOURCE_CATEGORY_NAMES[key].map((n) => n.toLowerCase());
  return categories.find((c) => {
    const name = c.name.toLowerCase();
    const id = c._id.toLowerCase();
    return candidates.some((cand) => name.includes(cand) || id.includes(cand));
  });
}

export function findSubCategoryByName(
  subs: { _id: string; name: string }[] | undefined,
  name: string,
) {
  if (!subs) return undefined;
  const target = name.toLowerCase();
  return subs.find((s) => s.name.toLowerCase().includes(target));
}
