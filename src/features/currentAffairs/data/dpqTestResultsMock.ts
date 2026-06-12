export type DpqExamType = "prelims" | "mains";

export type DpqTestLeaderboardEntry = {
  rank: number;
  studentName: string;
  score: number;
  percentage: number;
  attemptDate: string;
};

export type DpqTestResultSummary = {
  id: string;
  testName: string;
  examType: DpqExamType;
  testDate: string;
  totalAttempts: number;
  highestScore: number;
  averageScore: number;
};

export type DpqLatestTestLeaderboard = {
  testId: string;
  testName: string;
  examType: DpqExamType;
  entries: DpqTestLeaderboardEntry[];
};

const MOCK_DELAY_MS = 350;
const LATEST_TEST_NUMBER = 4;

const PRELIMS_LATEST_TOP_FIVE: DpqTestLeaderboardEntry[] = [
  { rank: 1, studentName: "John Doe", score: 490, percentage: 98, attemptDate: "04-Apr-2026" },
  { rank: 2, studentName: "Rahul Kumar", score: 485, percentage: 97, attemptDate: "04-Apr-2026" },
  { rank: 3, studentName: "Priya Singh", score: 480, percentage: 96, attemptDate: "04-Apr-2026" },
  { rank: 4, studentName: "Anjali Rao", score: 475, percentage: 95, attemptDate: "04-Apr-2026" },
  { rank: 5, studentName: "Akash Reddy", score: 470, percentage: 94, attemptDate: "04-Apr-2026" },
];

const MAINS_LATEST_TOP_FIVE: DpqTestLeaderboardEntry[] = [
  { rank: 1, studentName: "Aarav Gupta", score: 488, percentage: 98, attemptDate: "04-Apr-2026" },
  { rank: 2, studentName: "Isha Verma", score: 482, percentage: 96, attemptDate: "04-Apr-2026" },
  { rank: 3, studentName: "Rohan Desai", score: 476, percentage: 95, attemptDate: "04-Apr-2026" },
  { rank: 4, studentName: "Neha Kapoor", score: 471, percentage: 94, attemptDate: "04-Apr-2026" },
  { rank: 5, studentName: "Karthik Menon", score: 466, percentage: 93, attemptDate: "04-Apr-2026" },
];

const PRELIMS_STUDENTS = [
  "John Doe",
  "Rahul Kumar",
  "Priya Singh",
  "Anjali Rao",
  "Akash Reddy",
  "Sneha Patel",
  "Vikram Mehta",
  "Kavya Nair",
  "Arjun Sharma",
  "Meera Iyer",
];

const MAINS_STUDENTS = [
  "Aarav Gupta",
  "Isha Verma",
  "Rohan Desai",
  "Neha Kapoor",
  "Karthik Menon",
  "Divya Joshi",
  "Sanjay Pillai",
  "Pooja Bhat",
  "Nikhil Rao",
  "Lakshmi Reddy",
];

function buildLeaderboardEntries(
  students: string[],
  baseScore: number,
  testDate: string,
  count = 10,
): DpqTestLeaderboardEntry[] {
  return Array.from({ length: count }, (_, index) => {
    const score = baseScore - index * 5;
    return {
      rank: index + 1,
      studentName: students[index % students.length],
      score,
      percentage: Math.round((score / 500) * 100),
      attemptDate: testDate,
    };
  });
}

function buildTestSummaries(examType: DpqExamType): DpqTestResultSummary[] {
  const label = examType === "prelims" ? "Prelims" : "Mains";
  const baseAttempts = examType === "prelims" ? 128 : 96;

  return Array.from({ length: 10 }, (_, index) => {
    const testNumber = index + 1;
    const highestScore = 490 - index * 8;
    const averageScore = 412 - index * 6;

    return {
      id: `dpq-${examType}-${testNumber}`,
      testName: `${label} Practice Test ${testNumber}`,
      examType,
      testDate: `${String(testNumber).padStart(2, "0")}-Apr-2026`,
      totalAttempts: baseAttempts - index * 7,
      highestScore,
      averageScore,
    };
  });
}

const PRELIMS_SUMMARIES = buildTestSummaries("prelims");
const MAINS_SUMMARIES = buildTestSummaries("mains");

const PRELIMS_LEADERBOARDS: Record<string, DpqTestLeaderboardEntry[]> = {};
const MAINS_LEADERBOARDS: Record<string, DpqTestLeaderboardEntry[]> = {};

PRELIMS_SUMMARIES.forEach((summary, index) => {
  PRELIMS_LEADERBOARDS[summary.id] = buildLeaderboardEntries(
    PRELIMS_STUDENTS,
    summary.highestScore,
    summary.testDate,
    10,
  );
});

MAINS_SUMMARIES.forEach((summary, index) => {
  MAINS_LEADERBOARDS[summary.id] = buildLeaderboardEntries(
    MAINS_STUDENTS,
    summary.highestScore,
    summary.testDate,
    10,
  );
});

const latestPrelimsId = `dpq-prelims-${LATEST_TEST_NUMBER}`;
const latestMainsId = `dpq-mains-${LATEST_TEST_NUMBER}`;

PRELIMS_SUMMARIES[LATEST_TEST_NUMBER - 1] = {
  ...PRELIMS_SUMMARIES[LATEST_TEST_NUMBER - 1],
  highestScore: 490,
  averageScore: 445,
  testDate: "04-Apr-2026",
  totalAttempts: 142,
};

MAINS_SUMMARIES[LATEST_TEST_NUMBER - 1] = {
  ...MAINS_SUMMARIES[LATEST_TEST_NUMBER - 1],
  highestScore: 488,
  averageScore: 438,
  testDate: "04-Apr-2026",
  totalAttempts: 118,
};

PRELIMS_LEADERBOARDS[latestPrelimsId] = [
  ...PRELIMS_LATEST_TOP_FIVE,
  ...buildLeaderboardEntries(
    PRELIMS_STUDENTS.slice(5),
    465,
    "04-Apr-2026",
    5,
  ).map((entry, index) => ({ ...entry, rank: index + 6 })),
];

MAINS_LEADERBOARDS[latestMainsId] = [
  ...MAINS_LATEST_TOP_FIVE,
  ...buildLeaderboardEntries(
    MAINS_STUDENTS.slice(5),
    461,
    "04-Apr-2026",
    5,
  ).map((entry, index) => ({ ...entry, rank: index + 6 })),
];

function summariesFor(examType: DpqExamType): DpqTestResultSummary[] {
  return examType === "prelims" ? PRELIMS_SUMMARIES : MAINS_SUMMARIES;
}

function leaderboardsFor(
  examType: DpqExamType,
): Record<string, DpqTestLeaderboardEntry[]> {
  return examType === "prelims" ? PRELIMS_LEADERBOARDS : MAINS_LEADERBOARDS;
}

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), MOCK_DELAY_MS);
  });
}

/** Latest test in the mock set — Practice Test 4. */
export function getLatestTestSummary(
  examType: DpqExamType,
): DpqTestResultSummary {
  const summaries = summariesFor(examType);
  return summaries[LATEST_TEST_NUMBER - 1] ?? summaries[0];
}

export async function fetchLatestTestLeaderboard(
  examType: DpqExamType,
): Promise<DpqLatestTestLeaderboard> {
  const latest = getLatestTestSummary(examType);
  const entries =
    examType === "prelims" ? PRELIMS_LATEST_TOP_FIVE : MAINS_LATEST_TOP_FIVE;

  return delay({
    testId: latest.id,
    testName: latest.testName,
    examType,
    entries,
  });
}

export async function fetchTestResultSummaries(
  examType: DpqExamType,
): Promise<DpqTestResultSummary[]> {
  return delay([...summariesFor(examType)]);
}

export async function fetchTestLeaderboard(
  testId: string,
  examType: DpqExamType,
): Promise<{
  summary: DpqTestResultSummary | null;
  entries: DpqTestLeaderboardEntry[];
}> {
  const summary =
    summariesFor(examType).find((item) => item.id === testId) ?? null;
  const entries = leaderboardsFor(examType)[testId] ?? [];

  return delay({ summary, entries });
}

export function buildTestResultsHref(examType: DpqExamType): string {
  return `/current-affairs/daily-practice-questions/test-results?examType=${examType}`;
}

export function buildTestLeaderboardHref(
  testId: string,
  examType: DpqExamType,
): string {
  return `/current-affairs/daily-practice-questions/test-results/${testId}?examType=${examType}`;
}

export function parseDpqExamType(value: string | null): DpqExamType {
  return value === "mains" ? "mains" : "prelims";
}
