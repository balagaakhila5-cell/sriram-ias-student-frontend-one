import type {
  MockTestCheckAnswerItem,
  MockTestDetailData,
  MockTestListItem,
  MockTestSubmitResult,
  NcertBookItem,
  PyqPaperItem,
  StudyMaterialItem,
} from "../types/customerFreeResources";
import type {
  MockTestDetail,
  MockTestQuestion,
  MockTestResult,
  MockTestSummary,
  ResourceCategory,
  ResourceFile,
  ResourceFilter,
} from "../services/resourcesService";

export const CATEGORY_ROUTE_MAP: Record<
  string,
  { href: string; image: string; description: string }
> = {
  NCERT_BOOKS: {
    href: "/free_resources/ncert-page",
    image: "/assets/free-resources/NCERT/NCERT-books.png",
    description: "Access NCERT textbooks by subject and class for UPSC preparation.",
  },
  PREVIOUS_YEAR_QUESTIONS: {
    href: "/free_resources/previous-year",
    image: "/assets/free-resources/NCERT/Previous-year-questionpaper.png",
    description: "Download previous year UPSC prelims and mains question papers.",
  },
  FREE_MOCK_TEST: {
    href: "/free_resources/free-mocktests",
    image: "/assets/free-resources/NCERT/free-mocktest.png",
    description: "Practice with free mock tests for prelims and mains.",
  },
  STUDY_MATERIAL: {
    href: "/free_resources/study-materials",
    image: "/assets/free-resources/NCERT/studymaterials.png",
    description: "Browse study materials for prelims, mains, and interview.",
  },
};

export function mapCategoriesToResourceCategories(
  items: { value: string; label: string }[],
): ResourceCategory[] {
  return items.map((item) => ({
    _id: item.value,
    name: item.label,
    description: CATEGORY_ROUTE_MAP[item.value]?.description,
    thumbnail: CATEGORY_ROUTE_MAP[item.value]?.image,
  }));
}

export function mapStringsToFilters(
  values: string[],
  type: ResourceFilter["type"],
): ResourceFilter[] {
  return values.map((value) => ({
    _id: `${type}-${value}`,
    type,
    value,
  }));
}

export function mapNcertBooksToFiles(items: NcertBookItem[]): ResourceFile[] {
  return items.map((item) => ({
    _id: item._id,
    title: item.resourceName,
    fileUrl: item.downloadUrl,
    subject: item.subject,
    class: item.class,
    description: `${item.subject} · ${item.class}`,
    previewUrl: item.previewUrl,
  }));
}

export function mapPyqPapersToFiles(items: PyqPaperItem[]): ResourceFile[] {
  return items.map((item) => ({
    _id: item._id,
    title: item.resourceName,
    fileUrl: item.downloadUrl,
    paper: item.paper,
    year: { _id: `year-${item.year}`, type: "YEAR" as const, value: String(item.year) },
    description: `${item.paper || item.paperType} · ${item.year}`,
    previewUrl: item.previewUrl,
  }));
}

export function mapStudyMaterialsToFiles(
  items: StudyMaterialItem[],
): ResourceFile[] {
  return items.map((item) => ({
    _id: item._id,
    title: item.studyMaterialName,
    fileUrl: item.downloadUrl,
    previewUrl: item.previewUrl,
  }));
}

export function mapMockTestListToSummaries(
  items: MockTestListItem[],
): MockTestSummary[] {
  return items.map((item) => ({
    _id: item._id,
    title: item.mockTestTitle,
    duration: item.duration,
    totalQuestions: item.questionCount,
    totalMarks: item.totalMarks,
    description: [item.paperType, item.paper].filter(Boolean).join(" · "),
  }));
}

function normalizeQuestionOptions(
  options: MockTestDetailData["questions"][number]["options"],
): string[] {
  return options.map((option) => option.text);
}

export function mapMockTestDetail(data: MockTestDetailData): MockTestDetail {
  const questions: MockTestQuestion[] = data.questions.map((question) => ({
    _id: question._id,
    question: question.question,
    options: normalizeQuestionOptions(question.options),
    optionKeys: question.options.map((option) => option.key),
    questionType: question.questionType,
    marks: question.marks,
  }));

  return {
    _id: data._id,
    title: data.mockTestTitle,
    duration: data.duration,
    totalMarks: data.totalMarks,
    totalQuestions: data.questionCount,
    questions,
    description: data.instructions,
    passingMarks: undefined,
  };
}

export function mapMockTestSubmitResult(
  result: MockTestSubmitResult,
): MockTestResult {
  return {
    _id: `result-${result.mockTestId}-${Date.now()}`,
    score: result.obtainedMarks,
    totalMarks: result.totalMarks,
    correctCount: result.correctAnswers,
    incorrectCount: result.incorrectAnswers,
    unattemptedCount: result.unansweredQuestions,
    totalQuestions: result.totalQuestions,
    passed: result.percentage >= 40,
    percentage: result.percentage,
    grade: result.grade,
    timeTaken: result.timeTaken,
  };
}

export function mapCheckAnswersToEvaluation(
  items: MockTestCheckAnswerItem[],
): MockTestResult["evaluation"] {
  return items.map((item) => ({
    questionId: item.questionId,
    question: item.question,
    options: item.options.map((option) => option.text),
    selected: item.selectedAnswers[0],
    selectedAnswers: item.selectedAnswers,
    correctAnswer: item.correctAnswers[0],
    correctAnswers: item.correctAnswers,
    isCorrect: item.isCorrect,
    explanation: item.explanation,
  }));
}
