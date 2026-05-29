"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDemoMockTestDetail,
  isDemoMockTestId,
  listDemoMockTestCards,
} from "../catalog/demoMockTests";
import { isResourcesApiConfigured } from "../services/resourcesApiClient";
import {
  resourcesService,
  type FilesQuery,
  type FilterQuery,
  type MockTestAttemptPayload,
  type MockTestSummary,
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
    enabled: isResourcesApiConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 0,
    placeholderData: [],
  });
}

export function useResourceSubCategories(categoryId?: string) {
  return useQuery({
    queryKey: resourcesKeys.subcategories(categoryId),
    queryFn: () => resourcesService.listSubCategories(categoryId),
    enabled: isResourcesApiConfigured() && !!categoryId,
    staleTime: 10 * 60 * 1000,
    retry: 0,
    placeholderData: [],
  });
}

export function useResourceFilters(
  query: FilterQuery,
  enabled = true,
) {
  return useQuery({
    queryKey: resourcesKeys.filters(query),
    queryFn: () => resourcesService.listFilters(query),
    enabled: isResourcesApiConfigured() && enabled && !!query.categoryId,
    staleTime: 10 * 60 * 1000,
    retry: 0,
    placeholderData: [],
  });
}

export function useResourceFiles(query: FilesQuery, enabled = true) {
  return useQuery({
    queryKey: resourcesKeys.files(query),
    queryFn: () => resourcesService.listFiles(query),
    enabled: isResourcesApiConfigured() && enabled && !!query.categoryId,
    retry: 0,
    placeholderData: [],
  });
}

function demoMockSummaries(examType: "prelims" | "mains"): MockTestSummary[] {
  return listDemoMockTestCards(examType).map((card) => ({
    _id: card._id,
    title: `${card.title} — ${card.subtitle}`,
    duration: card.duration,
    totalQuestions: card.totalQuestions,
  }));
}

export function useMockTests(
  query: MockTestsQuery,
  enabled = true,
  examType: "prelims" | "mains" = "prelims",
) {
  return useQuery({
    queryKey: [...resourcesKeys.mockTests(query), examType],
    queryFn: async (): Promise<MockTestSummary[]> => {
      if (!isResourcesApiConfigured() || !query.categoryId) {
        return demoMockSummaries(examType);
      }
      try {
        const apiTests = await resourcesService.listMockTests(query);
        if (apiTests.length >= 6) return apiTests.slice(0, 6);
        const merged = [...apiTests];
        for (const card of listDemoMockTestCards(examType)) {
          if (merged.length >= 6) break;
          if (!merged.some((t) => t._id === card._id)) {
            merged.push({
              _id: card._id,
              title: `${card.title} — ${card.subtitle}`,
              duration: card.duration,
              totalQuestions: card.totalQuestions,
            });
          }
        }
        return merged.slice(0, 6);
      } catch {
        return demoMockSummaries(examType);
      }
    },
    enabled,
    retry: 0,
    placeholderData: demoMockSummaries(examType),
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
          if (payload.answers[q._id] === q.correctAnswer) correctCount += 1;
        }
        const total = test.questions.length;
        return {
          _id: `demo-result-${testId}-${Date.now()}`,
          score: correctCount * 2,
          totalMarks: total * 2,
          correctCount,
          incorrectCount: total - correctCount,
          unattemptedCount: 0,
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

/* ------------------------------------------------------------------ */
/*  Helpers to resolve well-known categories by name                   */
/* ------------------------------------------------------------------ */

export const RESOURCE_CATEGORY_NAMES = {
  NCERT: ["ncert", "ncert books"],
  PYQ: ["pyq", "previous year question papers", "previous year"],
  MOCK_TESTS: ["mock", "free mock tests", "mock tests"],
  STUDY_MATERIALS: ["study material", "study materials"],
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
    return candidates.some((cand) => name.includes(cand));
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
