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
  const paper = index + 1;
  return {
    _id: `demo-mock-${examType}-${paper}`,
    title: `${examType === "prelims" ? "Prelims" : "Mains"} Exam Paper-${paper % 2 === 0 ? 2 : 1}`,
    subtitle: `Test ${paper}`,
    examType,
    duration: 60,
    totalQuestions: DEMO_QUESTIONS.length,
    image: RESOURCE_ASSETS.MOCK_TEST_CARD,
  };
}

export const DEMO_MOCK_TEST_CARDS: DemoMockTestCard[] = [
  ...Array.from({ length: 6 }, (_, i) => buildDemoTest("prelims", i)),
  ...Array.from({ length: 6 }, (_, i) => buildDemoTest("mains", i)),
];

export function listDemoMockTestCards(examType: "prelims" | "mains") {
  return DEMO_MOCK_TEST_CARDS.filter((t) => t.examType === examType).slice(0, 6);
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
