import type { MockTestDetail } from "../services/resourcesService";
import { RESOURCE_ASSETS } from "./assets";

export interface DemoMockTestCard {
  _id: string;
  title: string;
  subtitle: string;
  examType: "prelims" | "mains";
  duration: number;
  totalQuestions: number;
  image: string;
}

const DEMO_QUESTIONS = [
  {
    _id: "q1",
    question: "Which article of the Indian Constitution deals with Fundamental Rights?",
    options: ["Article 12-35", "Article 36-51", "Article 52-78", "Article 79-122"],
    correctAnswer: "Article 12-35",
    marks: 2,
    negativeMarks: 0.66,
  },
  {
    _id: "q2",
    question: "The Tropic of Cancer passes through how many Indian states?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
    marks: 2,
    negativeMarks: 0.66,
  },
  {
    _id: "q3",
    question: "Who was the first President of India?",
    options: [
      "Dr. Rajendra Prasad",
      "Dr. B.R. Ambedkar",
      "Jawaharlal Nehru",
      "Sardar Patel",
    ],
    correctAnswer: "Dr. Rajendra Prasad",
    marks: 2,
    negativeMarks: 0.66,
  },
  {
    _id: "q4",
    question: "Which river is known as the Dakshin Ganga?",
    options: ["Krishna", "Godavari", "Kaveri", "Mahanadi"],
    correctAnswer: "Godavari",
    marks: 2,
    negativeMarks: 0.66,
  },
  {
    _id: "q5",
    question: "The Panchayati Raj system was constitutionalized by which amendment?",
    options: ["42nd", "44th", "73rd", "74th"],
    correctAnswer: "73rd",
    marks: 2,
    negativeMarks: 0.66,
  },
];

function buildDemoTest(
  examType: "prelims" | "mains",
  index: number,
): DemoMockTestCard {
  const testNumber = index + 1;
  const lines = buildMockTestCardLines(examType, testNumber);
  return {
    _id: `demo-mock-${examType}-${testNumber}`,
    title: lines.title,
    subtitle: lines.subtitle,
    examType,
    duration: 60,
    totalQuestions: DEMO_QUESTIONS.length,
    image: RESOURCE_ASSETS.MOCK_TEST_CARD,
  };
}

/** Portal / public card lines — e.g. "Prelims Exam Paper-2" + "Test-1" */
export function buildMockTestCardLines(
  examType: "prelims" | "mains",
  testNumber: number,
  paperNumber = 2,
): { title: string; subtitle: string } {
  const examLabel = examType === "prelims" ? "Prelims" : "Mains";
  return {
    title: `${examLabel} Exam Paper-${paperNumber}`,
    subtitle: `Test-${testNumber}`,
  };
}

export function getMockTestCardDisplay(
  test: { title: string; subtitle?: string },
  examType?: "prelims" | "mains",
  index?: number,
): { title: string; subtitle: string } {
  if (test.subtitle) {
    return { title: test.title, subtitle: test.subtitle };
  }

  const parts = test.title.split(" — ");
  if (parts.length === 2) {
    return { title: parts[0].trim(), subtitle: parts[1].trim() };
  }

  if (examType != null && index != null) {
    return buildMockTestCardLines(examType, index + 1);
  }

  return { title: test.title, subtitle: "" };
}

export const DEMO_MOCK_TEST_CARDS: DemoMockTestCard[] = [
  ...Array.from({ length: 10 }, (_, i) => buildDemoTest("prelims", i)),
  ...Array.from({ length: 10 }, (_, i) => buildDemoTest("mains", i)),
];

export function listDemoMockTestCards(examType: "prelims" | "mains") {
  return DEMO_MOCK_TEST_CARDS.filter((t) => t.examType === examType).slice(0, 10);
}

export function getDemoMockTestDetail(id: string): MockTestDetail | null {
  const card = DEMO_MOCK_TEST_CARDS.find((t) => t._id === id);
  if (!card) return null;

  return {
    _id: card._id,
    title: `${card.title} — ${card.subtitle}`,
    duration: card.duration,
    totalQuestions: card.totalQuestions,
    totalMarks: card.totalQuestions * 2,
    questions: DEMO_QUESTIONS,
  };
}

export function isDemoMockTestId(id: string) {
  return id.startsWith("demo-mock-");
}
