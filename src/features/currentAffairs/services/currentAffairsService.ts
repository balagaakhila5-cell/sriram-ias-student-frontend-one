import type {
  CurrentAffairsListFilters,
  CurrentAffairsListResult,
  CurrentAffairsOption,
  CurrentAffairsQuestion,
  CurrentAffairsQuestionsResult,
  CurrentAffairsReviewItem,
  CurrentAffairsSubmitResult,
  SubmitAnswerInput,
} from '../types';

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

const LOCAL_QUESTION_BANK: Array<{
  question: string;
  options: string[];
  correctKey: string;
  explanation: string;
}> = [
  {
    question:
      'Which article of the Indian Constitution deals with Fundamental Rights?',
    options: ['Article 12-35', 'Article 36-51', 'Article 52-78', 'Article 79-122'],
    correctKey: 'A',
    explanation: 'Fundamental Rights are covered under Articles 12 to 35.',
  },
  {
    question: 'The Tropic of Cancer passes through how many Indian states?',
    options: ['6', '7', '8', '9'],
    correctKey: 'C',
    explanation: 'Eight Indian states lie on the Tropic of Cancer.',
  },
  {
    question: 'Who was the first President of India?',
    options: [
      'Dr. Rajendra Prasad',
      'Dr. B.R. Ambedkar',
      'Jawaharlal Nehru',
      'Sardar Patel',
    ],
    correctKey: 'A',
    explanation: 'Dr. Rajendra Prasad served as the first President of India.',
  },
  {
    question: 'Which river is known as the Dakshin Ganga?',
    options: ['Krishna', 'Godavari', 'Kaveri', 'Mahanadi'],
    correctKey: 'B',
    explanation: 'The Godavari is often called the Dakshin Ganga.',
  },
  {
    question:
      'The Panchayati Raj system was constitutionalized by which amendment?',
    options: ['42nd', '44th', '73rd', '74th'],
    correctKey: 'C',
    explanation: 'The 73rd Constitutional Amendment institutionalized Panchayati Raj.',
  },
];

const OPTION_KEYS = ['A', 'B', 'C', 'D'] as const;

function toOptions(values: string[]): CurrentAffairsOption[] {
  return values.map((value, index) => ({
    key: OPTION_KEYS[index] ?? String(index + 1),
    value,
  }));
}

function buildQuestions(testId: string): CurrentAffairsQuestion[] {
  return LOCAL_QUESTION_BANK.map((item, index) => ({
    _id: `${testId}-q${index + 1}`,
    currentAffairId: testId,
    questionNumber: index + 1,
    question: item.question,
    options: toOptions(item.options),
    imageUrl: null,
    explanation: item.explanation,
  }));
}

function gradeFromPercentage(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 75) return 'A';
  if (percentage >= 60) return 'B';
  if (percentage >= 45) return 'C';
  if (percentage >= 30) return 'D';
  return 'F';
}

function evaluateAnswers(
  testId: string,
  answers: SubmitAnswerInput[],
): CurrentAffairsSubmitResult {
  const questions = buildQuestions(testId);
  const answerMap = new Map(
    answers.map((answer) => [answer.questionId, answer.selectedAnswer]),
  );

  const review: CurrentAffairsReviewItem[] = questions.map((question, index) => {
    const bankItem = LOCAL_QUESTION_BANK[index];
    const selectedAnswer = answerMap.get(question._id) ?? null;
    const correctAnswer = bankItem.correctKey;
    const isSkipped = selectedAnswer == null || selectedAnswer === '';
    const isCorrect = !isSkipped && selectedAnswer === correctAnswer;

    return {
      _id: question._id,
      questionNumber: question.questionNumber,
      question: question.question,
      options: question.options,
      selectedAnswer,
      correctAnswer,
      isCorrect,
      isSkipped,
      explanation: question.explanation,
      imageUrl: null,
    };
  });

  const totalQuestions = review.length;
  const attemptedCount = review.filter((item) => !item.isSkipped).length;
  const correctCount = review.filter((item) => item.isCorrect).length;
  const wrongCount = attemptedCount - correctCount;
  const skippedCount = totalQuestions - attemptedCount;
  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return {
    paper: null,
    totalQuestions,
    attemptedCount,
    correctCount,
    wrongCount,
    skippedCount,
    percentage,
    grade: gradeFromPercentage(percentage),
    review,
  };
}

function emptyListResult(filters: CurrentAffairsListFilters): CurrentAffairsListResult {
  const limit = filters.limit ?? 24;
  return {
    items: [],
    count: 0,
    total: 0,
    page: filters.page ?? 1,
    limit,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };
}

export const currentAffairsService = {
  list: async (
    filters: CurrentAffairsListFilters = {},
  ): Promise<CurrentAffairsListResult> => {
    await delay();
    return emptyListResult(filters);
  },

  getQuestions: async (id: string): Promise<CurrentAffairsQuestionsResult> => {
    await delay();
    const questions = buildQuestions(id);
    return {
      paper: null,
      count: questions.length,
      questions,
    };
  },

  submitAnswers: async (
    id: string,
    answers: SubmitAnswerInput[],
  ): Promise<CurrentAffairsSubmitResult> => {
    await delay(250);
    return evaluateAnswers(id, answers);
  },
};
