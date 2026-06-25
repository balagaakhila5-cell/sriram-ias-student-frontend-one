"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { currentAffairsService } from "../services/currentAffairsService";
import {
  mapCategoriesToHubCards,
  examTypeToMainsCategory,
} from "../adapters/customerCurrentAffairsAdapter";
import { toCatalogDocument, toPracticeTestCard } from "../mappers";
import type {
  CurrentAffairsCategory,
  SubmitAnswerInput,
} from "../types";
import { ALL_FILTER } from "../filters";

export const currentAffairsKeys = {
  all: ["current-affairs"] as const,
  categories: () => [...currentAffairsKeys.all, "categories"] as const,
  mainsCategories: () =>
    [...currentAffairsKeys.all, "mains-categories"] as const,
  list: (
    category: CurrentAffairsCategory,
    filters: Record<string, string | number | undefined>,
  ) => [...currentAffairsKeys.all, "list", category, filters] as const,
  years: (filters: Record<string, string | number | undefined>) =>
    [...currentAffairsKeys.all, "years", filters] as const,
  months: (filters: Record<string, string | number | undefined>) =>
    [...currentAffairsKeys.all, "months", filters] as const,
  dates: (filters: Record<string, string | number | undefined>) =>
    [...currentAffairsKeys.all, "dates", filters] as const,
  questions: (id: string) =>
    [...currentAffairsKeys.all, "questions", id] as const,
  view: (id: string) => [...currentAffairsKeys.all, "view", id] as const,
};

export function useCurrentAffairsCategories() {
  return useQuery({
    queryKey: currentAffairsKeys.categories(),
    queryFn: () => currentAffairsService.getCategories(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCurrentAffairsHubCards() {
  const query = useCurrentAffairsCategories();
  const cards = useMemo(
    () => mapCategoriesToHubCards(query.data ?? []),
    [query.data],
  );
  return { ...query, cards };
}

export function useCurrentAffairsFilterYears(
  category: CurrentAffairsCategory,
  mainsCategory?: "PRELIMS" | "MAINS",
) {
  return useQuery({
    queryKey: currentAffairsKeys.years({ category, mainsCategory }),
    queryFn: async () => {
      const years = await currentAffairsService.getYears({
        category,
        mainsCategory,
      });
      return [ALL_FILTER, ...years.map(String)];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCurrentAffairsFilterMonths(
  category: CurrentAffairsCategory,
  year?: string,
  mainsCategory?: "PRELIMS" | "MAINS",
) {
  return useQuery({
    queryKey: currentAffairsKeys.months({ category, year, mainsCategory }),
    queryFn: async () => {
      const months = await currentAffairsService.getMonths({
        category,
        year: year && year !== ALL_FILTER ? year : undefined,
        mainsCategory,
      });
      return [ALL_FILTER, ...months];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCurrentAffairsFilterDates(
  category: CurrentAffairsCategory,
  year?: string,
  month?: string,
  mainsCategory?: "PRELIMS" | "MAINS",
) {
  return useQuery({
    queryKey: currentAffairsKeys.dates({ category, year, month, mainsCategory }),
    queryFn: async () => {
      const dates = await currentAffairsService.getDates({
        category,
        year: year && year !== ALL_FILTER ? year : undefined,
        month: month && month !== ALL_FILTER ? month : undefined,
        mainsCategory,
      });
      return dates;
    },
    enabled: category === "DAILY_PRACTICE_QUESTIONS",
    staleTime: 5 * 60 * 1000,
  });
}

export function useCurrentAffairsDocuments(
  category: CurrentAffairsCategory,
  options: {
    year?: string;
    month?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {},
) {
  const { year, month, search, page = 1, limit = 12 } = options;
  const filters = { year, month, search, page, limit };

  const query = useQuery({
    queryKey: currentAffairsKeys.list(category, filters),
    queryFn: () =>
      currentAffairsService.list({
        category,
        year,
        month,
        search,
        page,
        limit,
      }),
    staleTime: 60 * 1000,
  });

  const documents = useMemo(
    () => (query.data?.items ?? []).map(toCatalogDocument),
    [query.data?.items],
  );

  return {
    documents,
    pagination: {
      page: query.data?.page ?? page,
      limit: query.data?.limit ?? limit,
      total: query.data?.total ?? 0,
      totalPages: query.data?.totalPages ?? 0,
      hasNextPage: query.data?.hasNextPage ?? false,
      hasPrevPage: query.data?.hasPrevPage ?? false,
    },
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}

export function useDailyPracticeTests(
  examType: "prelims" | "mains",
  options: {
    year?: string;
    month?: string;
    date?: string;
    page?: number;
    limit?: number;
  } = {},
) {
  const { year, month, date, page = 1, limit = 12 } = options;
  const mainsCategory = examTypeToMainsCategory(examType);
  const filters = { year, month, date, page, limit, mainsCategory };

  const query = useQuery({
    queryKey: currentAffairsKeys.list("DAILY_PRACTICE_QUESTIONS", filters),
    queryFn: () =>
      currentAffairsService.list({
        category: "DAILY_PRACTICE_QUESTIONS",
        mainsCategory,
        year,
        month,
        date,
        page,
        limit,
      }),
    staleTime: 60 * 1000,
  });

  const tests = useMemo(
    () => (query.data?.items ?? []).map(toPracticeTestCard),
    [query.data?.items],
  );

  return {
    tests,
    pagination: {
      page: query.data?.page ?? page,
      limit: query.data?.limit ?? limit,
      total: query.data?.total ?? 0,
      totalPages: query.data?.totalPages ?? 0,
      hasNextPage: query.data?.hasNextPage ?? false,
      hasPrevPage: query.data?.hasPrevPage ?? false,
    },
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}

export function useCurrentAffairsQuestions(id: string | undefined) {
  return useQuery({
    queryKey: currentAffairsKeys.questions(id ?? ""),
    queryFn: () => currentAffairsService.getQuestions(id as string),
    enabled: Boolean(id),
  });
}

export function useCurrentAffairsView(id: string | undefined) {
  return useQuery({
    queryKey: currentAffairsKeys.view(id ?? ""),
    queryFn: () => currentAffairsService.viewResource(id as string),
    enabled: Boolean(id),
  });
}

export function useSubmitCurrentAffairsAnswers(id: string | undefined) {
  return useMutation({
    mutationFn: (answers: SubmitAnswerInput[]) =>
      currentAffairsService.submitAnswers(id as string, answers),
  });
}
