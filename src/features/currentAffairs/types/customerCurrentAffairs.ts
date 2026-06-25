import type { CurrentAffairsCategory, MainsCategory } from "../types";

export type LabelValueOption = {
  value: string;
  label: string;
};

export type PaginatedListMeta = {
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type CurrentAffairsListQuery = {
  category: CurrentAffairsCategory;
  mainsCategory?: MainsCategory;
  year?: string | number;
  month?: string;
  date?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export type CurrentAffairsListItem = {
  _id: string;
  title?: string;
  paperName?: string;
  mainsCategory?: MainsCategory;
  year?: number | null;
  month?: string | null;
  date?: string | null;
  questionCount?: number;
  description?: string | null;
  imageUrl?: string | null;
  pdfUrl?: string | null;
};

export type PdfViewData = {
  title: string;
  fileUrl: string;
};

export type PdfDownloadData = {
  downloadUrl: string;
};

export type QuizOption = {
  key: string;
  value: string;
};

export type QuizQuestion = {
  _id: string;
  questionNumber: number;
  question: string;
  options: QuizOption[];
  imageUrl?: string | null;
};

export type QuizDetailsData = {
  _id: string;
  paperName: string;
  mainsCategory: MainsCategory;
  year?: number | null;
  month?: string | null;
  date?: string | null;
  questionCount?: number;
  questions: QuizQuestion[];
};

export type QuizSubmitPayload = {
  currentAffairId: string;
  answers: Array<{
    questionId: string;
    selectedAnswer: string;
  }>;
};

export type QuizSubmitResult = {
  currentAffairId: string;
  paperName: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  percentage: number;
};

export type QuizCheckAnswerItem = {
  questionId: string;
  questionNumber: number;
  question: string;
  options: QuizOption[];
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  isSkipped: boolean;
  explanation?: string | null;
  imageUrl?: string | null;
};

export type FilterQuery = {
  category: CurrentAffairsCategory;
  mainsCategory?: MainsCategory;
  year?: string | number;
  month?: string;
};
