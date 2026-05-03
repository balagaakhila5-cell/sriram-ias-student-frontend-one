"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
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
  });
}

export function useResourceSubCategories(categoryId?: string) {
  return useQuery({
    queryKey: resourcesKeys.subcategories(categoryId),
    queryFn: () => resourcesService.listSubCategories(categoryId),
    enabled: !!categoryId,
    staleTime: 10 * 60 * 1000,
  });
}

export function useResourceFilters(
  query: FilterQuery,
  enabled = true,
) {
  return useQuery({
    queryKey: resourcesKeys.filters(query),
    queryFn: () => resourcesService.listFilters(query),
    enabled: enabled && !!query.categoryId,
    staleTime: 10 * 60 * 1000,
  });
}

export function useResourceFiles(query: FilesQuery, enabled = true) {
  return useQuery({
    queryKey: resourcesKeys.files(query),
    queryFn: () => resourcesService.listFiles(query),
    enabled: enabled && !!query.categoryId,
  });
}

export function useMockTests(query: MockTestsQuery, enabled = true) {
  return useQuery({
    queryKey: resourcesKeys.mockTests(query),
    queryFn: () => resourcesService.listMockTests(query),
    enabled: enabled && !!query.categoryId,
  });
}

export function useMockTest(id: string | undefined) {
  return useQuery({
    queryKey: resourcesKeys.mockTest(id ?? ""),
    queryFn: () => resourcesService.getMockTest(id as string),
    enabled: !!id,
  });
}

export function useSubmitMockTest(testId: string | undefined) {
  return useMutation({
    mutationFn: (payload: MockTestAttemptPayload) =>
      resourcesService.submitMockTest(testId as string, payload),
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
