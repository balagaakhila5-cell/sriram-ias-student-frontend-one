"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { currentAffairsService } from "../services/currentAffairsService";
import { toCatalogDocument, toPracticeTestCard } from "../mappers";
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
 * monthly recap). Returns items already mapped to the card shape.
 */
export function useCurrentAffairsDocuments(
  category: CurrentAffairsCategory,
  year?: string,
  month?: string,
) {
  const query = useCurrentAffairsList({ category, year, month, limit: 24 });
  const documents = useMemo(
    () => (query.data?.items ?? []).map(toCatalogDocument),
    [query.data],
  );
  return { ...query, documents };
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
  const tests = useMemo(
    () => (query.data?.items ?? []).map(toPracticeTestCard),
    [query.data],
  );
  return { ...query, tests };
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
