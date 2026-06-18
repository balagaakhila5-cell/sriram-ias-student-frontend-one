import {
  getCurrentAffairsQuestions,
  listCurrentAffairs,
  submitCurrentAffairsAnswers,
} from "@/lib/allApi";
import type {
  CurrentAffairsListFilters,
  CurrentAffairsListResult,
  CurrentAffairsQuestionsResult,
  CurrentAffairsSubmitResult,
  SubmitAnswerInput,
} from "../types";

export const currentAffairsService = {
  list: (filters: CurrentAffairsListFilters = {}): Promise<CurrentAffairsListResult> =>
    listCurrentAffairs(filters),

  getQuestions: (id: string): Promise<CurrentAffairsQuestionsResult> =>
    getCurrentAffairsQuestions(id),

  submitAnswers: (
    id: string,
    answers: SubmitAnswerInput[],
  ): Promise<CurrentAffairsSubmitResult> =>
    submitCurrentAffairsAnswers(id, answers),
};
