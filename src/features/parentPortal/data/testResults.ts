import type { TestItem } from "@/features/studentPortal/data/tests";

export interface MainsResultRow {
  paper: string;
  attempted: number;
  unattempted: number;
  score: number;
}

export interface TestResultDetail {
  id: string;
  paper: string;
  correct: number;
  incorrect: number;
  blank: number;
  score: number;
  mainsAttempts: MainsResultRow[];
  currentScore: number;
  previousScore: number;
  maxScore: number;
  mentorReview: string[];
}

export const prelimsResults: TestItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: `prelims-${i + 1}`,
  category: "Weekly Test",
  title: "Geography prelims Test 1",
  attemptSlug: `prelims-${i + 1}`,
}));

export const mainsResults: TestItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: `mains-${i + 1}`,
  category: "Weekly Test",
  title: "Answer writing Mains Test 1",
  attemptSlug: `mains-${i + 1}`,
}));

export const mentorReviews: TestItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: `mentor-${i + 1}`,
  category: "Weekly Test",
  title: "One - on - One Mentor Review",
  attemptSlug: `mentor-${i + 1}`,
}));

export const testResultDetails: Record<string, TestResultDetail> = {
  default: {
    id: "default",
    paper: "Geography Prelims Test 1",
    correct: 55,
    incorrect: 42,
    blank: 3,
    score: 82.28,
    mainsAttempts: [
      {
        paper: "Answer writing Mains Test 1 - (current)",
        attempted: 15,
        unattempted: 5,
        score: 82.28,
      },
      {
        paper: "Answer writing Mains Test 1 - (previous)",
        attempted: 15,
        unattempted: 5,
        score: 82.28,
      },
    ],
    currentScore: 470,
    previousScore: 340,
    maxScore: 720,
    mentorReview: [
      "During the course of the training/internship program, the student demonstrated a sincere attitude toward learning and consistently showed enthusiasm in completing assigned tasks and responsibilities. The student maintained regular participation throughout the program and displayed a positive approach toward both individual and team activities. Their willingness to learn new concepts and adapt to different work requirements was highly appreciable.",
      "The student showed good analytical and problem-solving abilities while working on assigned projects and exercises. They were able to understand instructions clearly and implement feedback effectively, which resulted in noticeable improvement in both technical and practical skills over time. Their dedication toward completing tasks within deadlines reflected a strong sense of responsibility and professionalism.",
      "In addition to technical capabilities, the student exhibited commendable communication and interpersonal skills. They interacted respectfully with mentors and team members, actively participated in discussions, and demonstrated confidence while presenting ideas and solutions. Their ability to collaborate with others contributed positively to the overall working environment.",
      "The student also displayed creativity and attention to detail while handling project work. They approached tasks with curiosity and showed interest in exploring innovative ideas and solutions. Their commitment toward maintaining quality standards in assigned work was evident throughout the training period.",
      "One of the notable strengths observed was the student's ability to accept constructive feedback positively and apply suggested improvements effectively. This learning attitude helped them grow professionally and enhanced their overall performance during the program. They consistently maintained discipline, punctuality, and dedication in all assigned responsibilities.",
    ],
  },
};

export function getTestResult(id: string): TestResultDetail {
  return testResultDetails[id] ?? testResultDetails.default;
}
