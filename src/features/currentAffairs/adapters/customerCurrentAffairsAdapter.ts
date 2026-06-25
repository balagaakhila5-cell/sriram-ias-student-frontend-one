import type { CatalogDocument } from "@/features/resources/catalog/types";
import type { LabelValueOption } from "../types/customerCurrentAffairs";
import type {
  CurrentAffairItem,
  CurrentAffairsCategory,
  CurrentAffairsListFilters,
  CurrentAffairsListResult,
  CurrentAffairsQuestionsResult,
  CurrentAffairsReviewItem,
  CurrentAffairsSubmitResult,
  MainsCategory,
} from "../types";
import {
  CATEGORY_TO_SUBTOPIC,
  toCatalogDocument,
} from "../mappers";
import type {
  CurrentAffairsListItem,
  QuizCheckAnswerItem,
  QuizDetailsData,
  QuizSubmitResult,
} from "../types/customerCurrentAffairs";

export const CATEGORY_HUB_ROUTES: Record<
  string,
  { href: string; image: string }
> = {
  CURRENT_AFFAIRS: {
    href: "/current-affairs/daily-current-affairs",
    image: "/assets/current-affairs/daily-current-affairs.png",
  },
  MONTHLY_MAGAZINE: {
    href: "/current-affairs/monthly-magazine",
    image: "/assets/current-affairs/monthly-magazine.png",
  },
  DAILY_PRACTICE_QUESTIONS: {
    href: "/current-affairs/daily-practice-questions",
    image: "/assets/current-affairs/daily-practice-questions.png",
  },
  INFOGRAPHICS: {
    href: "/current-affairs/infographics",
    image: "/assets/current-affairs/infographics.png",
  },
  MONTHLY_RECAP: {
    href: "/current-affairs/monthly-recap",
    image: "/assets/current-affairs/monthly-recap.png",
  },
};

export function mapCategoriesToHubCards(categories: LabelValueOption[]) {
  return categories.map((category) => ({
    title: category.label,
    href: CATEGORY_HUB_ROUTES[category.value]?.href ?? "/current-affairs",
    image:
      CATEGORY_HUB_ROUTES[category.value]?.image ??
      "/assets/current-affairs/daily-current-affairs.png",
    value: category.value,
  }));
}

function resolveTitle(item: CurrentAffairsListItem): string {
  return item.title?.trim() || item.paperName?.trim() || "Untitled";
}

export function mapListItemToCurrentAffair(
  item: CurrentAffairsListItem,
  category: CurrentAffairsCategory,
): CurrentAffairItem {
  return {
    _id: item._id,
    category,
    categoryLabel: category,
    title: resolveTitle(item),
    year: item.year ?? null,
    month: item.month ?? null,
    mainsCategory: item.mainsCategory ?? null,
    mainsCategoryLabel: item.mainsCategory ?? null,
    date: item.date ?? null,
    pdfUrl: item.pdfUrl ?? null,
    imageUrl: item.imageUrl ?? null,
    description: item.description ?? "",
    sectionFrom: null,
    sectionTo: null,
    status: true,
    createdAt: "",
    updatedAt: "",
  };
}

export function mapListItemsToDocuments(
  items: CurrentAffairsListItem[],
  category: CurrentAffairsCategory,
): CatalogDocument[] {
  return items.map((item) =>
    toCatalogDocument(mapListItemToCurrentAffair(item, category)),
  );
}

export function mapPaginatedListToResult(
  items: CurrentAffairsListItem[],
  category: CurrentAffairsCategory,
  meta: Omit<CurrentAffairsListResult, "items">,
): CurrentAffairsListResult {
  return {
    items: items.map((item) => mapListItemToCurrentAffair(item, category)),
    ...meta,
  };
}

export function mapQuizDetailsToQuestions(
  data: QuizDetailsData,
): CurrentAffairsQuestionsResult {
  const paper = mapListItemToCurrentAffair(
    {
      _id: data._id,
      paperName: data.paperName,
      mainsCategory: data.mainsCategory,
      year: data.year,
      month: data.month,
      date: data.date,
      questionCount: data.questionCount,
    },
    "DAILY_PRACTICE_QUESTIONS",
  );

  return {
    paper,
    count: data.questions?.length ?? 0,
    questions: (data.questions ?? []).map((question) => ({
      _id: question._id,
      currentAffairId: data._id,
      questionNumber: question.questionNumber,
      question: question.question,
      options: question.options,
      imageUrl: question.imageUrl ?? null,
      explanation: "",
    })),
  };
}

function gradeFromPercentage(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 75) return "A";
  if (percentage >= 60) return "B";
  if (percentage >= 45) return "C";
  if (percentage >= 30) return "D";
  return "F";
}

export function mapQuizResultsToSubmitResult(
  submit: QuizSubmitResult,
  reviewItems: QuizCheckAnswerItem[],
  paper: CurrentAffairItem | null,
): CurrentAffairsSubmitResult {
  const review: CurrentAffairsReviewItem[] = reviewItems.map((item) => ({
    _id: item.questionId,
    questionNumber: item.questionNumber,
    question: item.question,
    options: item.options,
    selectedAnswer: item.selectedAnswer,
    correctAnswer: item.correctAnswer,
    isCorrect: item.isCorrect,
    isSkipped: item.isSkipped,
    explanation: item.explanation ?? "",
    imageUrl: item.imageUrl ?? null,
  }));

  return {
    paper,
    totalQuestions: submit.totalQuestions,
    attemptedCount:
      submit.totalQuestions - submit.unansweredQuestions,
    correctCount: submit.correctAnswers,
    wrongCount: submit.incorrectAnswers,
    skippedCount: submit.unansweredQuestions,
    percentage: submit.percentage,
    grade: gradeFromPercentage(submit.percentage),
    review,
  };
}

export function buildListQuery(
  filters: CurrentAffairsListFilters,
): Parameters<typeof import("../services/customerCurrentAffairsService").customerCurrentAffairsService.list>[0] {
  return {
    category: filters.category as CurrentAffairsCategory,
    mainsCategory: filters.mainsCategory,
    year: filters.year,
    month: filters.month,
    date: filters.date,
    search: filters.search,
    page: filters.page ?? 1,
    limit: filters.limit ?? 12,
  };
}

export function categoryToSubtopic(category: CurrentAffairsCategory): string {
  return CATEGORY_TO_SUBTOPIC[category] ?? "daily-current-affairs";
}

export function examTypeToMainsCategory(
  examType: "prelims" | "mains",
): MainsCategory {
  return examType === "mains" ? "MAINS" : "PRELIMS";
}
