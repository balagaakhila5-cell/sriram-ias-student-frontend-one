export type FreeResourceCategoryValue =
  | "NCERT_BOOKS"
  | "PREVIOUS_YEAR_QUESTIONS"
  | "FREE_MOCK_TEST"
  | "STUDY_MATERIAL";

export type PaperTypeValue = "PRELIMS" | "MAINS";

export type StudyMaterialCategoryValue = "PRELIMS" | "MAINS" | "INTERVIEW";

export interface LabelValueOption<T extends string = string> {
  value: T;
  label: string;
}

export interface NcertBookItem {
  _id: string;
  resourceName: string;
  subject: string;
  class: string;
  previewUrl: string;
  downloadUrl: string;
}

export interface PyqPaperItem {
  _id: string;
  resourceName: string;
  paperType: PaperTypeValue;
  paper: string;
  year: number;
  previewUrl: string;
  downloadUrl: string;
}

export interface MockTestListItem {
  _id: string;
  mockTestTitle: string;
  paperType: PaperTypeValue;
  paper: string | null;
  duration: number;
  totalMarks: number;
  questionCount: number;
}

export interface MockTestOption {
  key: string;
  text: string;
}

export interface MockTestQuestion {
  _id: string;
  questionNo: number;
  questionType: "SINGLE" | "MULTIPLE";
  question: string;
  marks: number;
  options: MockTestOption[];
}

export interface MockTestDetailData {
  _id: string;
  mockTestTitle: string;
  paperType: PaperTypeValue;
  paper: string | null;
  duration: number;
  totalMarks: number;
  negativeMarking: number;
  instructions: string;
  questionCount: number;
  questions: MockTestQuestion[];
}

export interface MockTestSubmitAnswer {
  questionId: string;
  selectedAnswers: string[];
}

export interface MockTestSubmitPayload {
  mockTestId: string;
  timeTaken: number;
  answers: MockTestSubmitAnswer[];
}

export interface MockTestSubmitResult {
  mockTestId: string;
  mockTestTitle: string;
  totalQuestions: number;
  answeredQuestions: number;
  unansweredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  timeTaken: number;
}

export interface MockTestCheckAnswerOption extends MockTestOption {
  isCorrect: boolean;
}

export interface MockTestCheckAnswerItem {
  questionId: string;
  question: string;
  options: MockTestCheckAnswerOption[];
  selectedAnswers: string[];
  correctAnswers: string[];
  isCorrect: boolean;
  explanation: string;
}

export interface StudyMaterialItem {
  _id: string;
  studyMaterialName: string;
  studyMaterialCategory?: StudyMaterialCategoryValue | null;
  previewUrl: string;
  downloadUrl: string;
}

export interface PdfViewData {
  resourceName?: string;
  studyMaterialName?: string;
  fileUrl: string;
}

export interface PdfDownloadData {
  downloadUrl: string;
}

export interface NcertListQuery {
  subject?: string;
  class?: string;
  search?: string;
}

export interface PyqListQuery {
  paperType?: PaperTypeValue;
  paper?: string;
  year?: number;
  search?: string;
}

export interface MockTestListQuery {
  paperType?: PaperTypeValue;
  paper?: string;
}

export interface StudyMaterialListQuery {
  category?: StudyMaterialCategoryValue;
  search?: string;
}
