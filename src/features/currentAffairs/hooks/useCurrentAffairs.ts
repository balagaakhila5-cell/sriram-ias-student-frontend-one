"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  listCurrentAffairsDocuments,
  listPracticeTests,
} from "@/features/resources/catalog/currentAffairs";
import { currentAffairsService } from "../services/currentAffairsService";
import { CATEGORY_TO_SUBTOPIC } from "../mappers";
import type {
  CurrentAffairsCategory,
  SubmitAnswerInput,
} from "../types";

/**
 * Document-list pages (daily current affairs, monthly magazine, infographics,
 * monthly recap). Uses local catalog data only.
 */
export function useCurrentAffairsDocuments(
  category: CurrentAffairsCategory,
  year?: string,
  month?: string,
) {
  const documents = useMemo(() => {
    const subtopic = CATEGORY_TO_SUBTOPIC[category];
    if (!subtopic) return [];
    return listCurrentAffairsDocuments(subtopic, year, month);
  }, [category, year, month]);

  return {
    documents,
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null as Error | null,
  };
}

/**
 * Daily Practice Questions list. The prelims/mains split is filtered locally;
 * `date` (YYYY-MM-DD) is an optional exact-date filter.
 */
export function useDailyPracticeTests(
  examType: "prelims" | "mains",
  year?: string,
  month?: string,
  date?: string,
) {
  const tests = useMemo(
    () =>
      listPracticeTests(year, month, examType, date, {
        filterByDay: Boolean(date),
        limit: 12,
        mainSite: true,
      }),
    [year, month, examType, date],
  );

  return {
    tests,
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null as Error | null,
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
