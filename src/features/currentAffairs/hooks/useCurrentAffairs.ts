"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  listCurrentAffairsDocuments,
  listPracticeTests,
} from "@/features/resources/catalog/currentAffairs";
import { currentAffairsService } from "../services/currentAffairsService";
import {
  CATEGORY_TO_SUBTOPIC,
  toCatalogDocument,
  toPracticeTestCard,
} from "../mappers";
import { matchesYearMonth } from "../filters";
import type {
  CurrentAffairsCategory,
  CurrentAffairsListFilters,
  SubmitAnswerInput,
} from "../types";

/** Raw paginated list query. */
export function useCurrentAffairsList(filters: CurrentAffairsListFilters = {}) {
  return useQuery({
    queryKey: ["current-affairs", "list", filters],
    queryFn: () => currentAffairsService.list(filters),
  });
}

/**
 * Document-list pages (daily current affairs, monthly magazine, infographics,
 * monthly recap). Uses API data when available; falls back to catalog seed data.
 */
export function useCurrentAffairsDocuments(
  category: CurrentAffairsCategory,
  year?: string,
  month?: string,
) {
  const query = useCurrentAffairsList({ category, year, month, limit: 24 });

  const fallbackDocuments = useMemo(() => {
    const subtopic = CATEGORY_TO_SUBTOPIC[category];
    if (!subtopic) return [];
    return listCurrentAffairsDocuments(subtopic, year, month);
  }, [category, year, month]);

  const documents = useMemo(() => {
    const apiItems = (query.data?.items ?? [])
      .map(toCatalogDocument)
      .filter((doc) => matchesYearMonth(doc, year, month));
    if (apiItems.length > 0) return apiItems;
    if (query.isLoading) return [];
    return fallbackDocuments;
  }, [query.data, query.isLoading, fallbackDocuments, year, month]);

  return {
    ...query,
    documents,
    isError: query.isError && documents.length === 0,
  };
}

/**
 * Daily Practice Questions list. The prelims/mains split is filtered server-side
 * via the `mainsCategory` param; `date` (YYYY-MM-DD) is an optional exact-date
 * filter.
 */
export function useDailyPracticeTests(
  examType: "prelims" | "mains",
  year?: string,
  month?: string,
  date?: string,
) {
  const query = useCurrentAffairsList({
    category: "DAILY_PRACTICE_QUESTIONS",
    mainsCategory: examType === "mains" ? "MAINS" : "PRELIMS",
    year,
    month,
    date,
    limit: 12,
  });

  const fallbackTests = useMemo(
    () =>
      listPracticeTests(year, month, examType, date, {
        filterByDay: Boolean(date),
        limit: 12,
        mainSite: true,
      }),
    [year, month, examType, date],
  );

  const tests = useMemo(() => {
    const apiItems = (query.data?.items ?? [])
      .map(toPracticeTestCard)
      .filter((test) => matchesYearMonth(test, year, month));
    if (apiItems.length > 0) return apiItems;
    if (query.isLoading) return [];
    return fallbackTests;
  }, [query.data, query.isLoading, fallbackTests, year, month]);

  return {
    ...query,
    tests,
    isError: query.isError && tests.length === 0,
  };
}

/** Questions for a single current-affairs paper (by id). */
export function useCurrentAffairsQuestions(id: string | undefined) {
  return useQuery({
    queryKey: ["current-affairs", "questions", id],
    queryFn: () => currentAffairsService.getQuestions(id as string),
    enabled: Boolean(id),
  });
}

/** Submit answers for a paper and receive the evaluated review. */
export function useSubmitCurrentAffairsAnswers(id: string | undefined) {
  return useMutation({
    mutationFn: (answers: SubmitAnswerInput[]) =>
      currentAffairsService.submitAnswers(id as string, answers),
  });
}
