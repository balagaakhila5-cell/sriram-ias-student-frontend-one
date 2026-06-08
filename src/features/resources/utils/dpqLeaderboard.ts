import { useAuthStore } from "@/store/authStore";

export const DPQ_LEADERBOARD_STORAGE_KEY = "dpq-top-performers";
export const DPQ_GUEST_ID_KEY = "dpq-guest-id";
export const DPQ_LEADERBOARD_UPDATED_EVENT = "dpq-leaderboard-updated";

export type DpqLeaderboardEntry = {
  id: string;
  studentId: string;
  studentName: string;
  testSlug: string;
  testTitle: string;
  points: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  submittedAt: string;
};

export type DpqLeaderboardRow = DpqLeaderboardEntry & {
  rank: number;
  displayName: string;
};

type TestReviewPayload = {
  slug: string;
  title: string;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
};

function dispatchLeaderboardUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(DPQ_LEADERBOARD_UPDATED_EVENT));
}

export function getDpqGuestId(): string {
  if (typeof window === "undefined") return "guest";

  let guestId = window.localStorage.getItem(DPQ_GUEST_ID_KEY);
  if (!guestId) {
    guestId = `guest-${Date.now()}`;
    window.localStorage.setItem(DPQ_GUEST_ID_KEY, guestId);
  }

  return guestId;
}

export function getDpqStudentId(): string {
  const user = useAuthStore.getState().user;
  return user?.id ?? getDpqGuestId();
}

export function getDpqStudentName(): string {
  const user = useAuthStore.getState().user;
  return user?.name?.trim() || "You";
}

export function calculateDpqPoints(percentage: number): number {
  return Math.round(percentage * 12);
}

function readEntries(): DpqLeaderboardEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(DPQ_LEADERBOARD_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DpqLeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

function writeEntries(
  entries: DpqLeaderboardEntry[],
  options?: { skipDispatch?: boolean },
) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DPQ_LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
  if (!options?.skipDispatch) {
    dispatchLeaderboardUpdated();
  }
}

export function recordDpqExamResult(payload: TestReviewPayload) {
  if (typeof window === "undefined") return;

  const studentId = getDpqStudentId();
  const studentName = getDpqStudentName();
  const points = calculateDpqPoints(payload.percentage);
  const submittedAt = new Date().toISOString();

  const nextEntry: DpqLeaderboardEntry = {
    id: `${studentId}-${payload.slug}`,
    studentId,
    studentName,
    testSlug: payload.slug,
    testTitle: payload.title,
    points,
    correctCount: payload.correctCount,
    totalQuestions: payload.totalQuestions,
    percentage: payload.percentage,
    submittedAt,
  };

  const entries = readEntries().filter((item) => item.id !== nextEntry.id);
  writeEntries([...entries, nextEntry], { skipDispatch: true });
  syncDpqLeaderboardFromTestReviews({ skipDispatch: true });
  dispatchLeaderboardUpdated();
}

export function syncDpqLeaderboardFromTestReviews(options?: {
  skipDispatch?: boolean;
}) {
  if (typeof window === "undefined") return;

  const entries = readEntries();
  const knownIds = new Set(entries.map((item) => `${item.studentId}-${item.testSlug}`));
  const studentId = getDpqStudentId();
  const studentName = getDpqStudentName();
  const imported: DpqLeaderboardEntry[] = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key?.startsWith("test-review-")) continue;

    const slug = key.replace("test-review-", "");
    const raw = window.localStorage.getItem(key);
    if (!raw) continue;

    try {
      const review = JSON.parse(raw) as TestReviewPayload;
      const dedupeKey = `${studentId}-${review.slug ?? slug}`;
      if (knownIds.has(dedupeKey)) continue;

      imported.push({
        id: dedupeKey,
        studentId,
        studentName,
        testSlug: review.slug ?? slug,
        testTitle: review.title ?? slug,
        points: calculateDpqPoints(review.percentage ?? 0),
        correctCount: review.correctCount ?? 0,
        totalQuestions: review.totalQuestions ?? 0,
        percentage: review.percentage ?? 0,
        submittedAt: new Date().toISOString(),
      });
      knownIds.add(dedupeKey);
    } catch {
      // ignore invalid stored reviews
    }
  }

  if (imported.length === 0) return;

  writeEntries([...entries, ...imported], { skipDispatch: options?.skipDispatch });
}

function getBestEntryPerStudent(entries: DpqLeaderboardEntry[]): DpqLeaderboardEntry[] {
  const bestByStudent = new Map<string, DpqLeaderboardEntry>();

  entries.forEach((entry) => {
    const existing = bestByStudent.get(entry.studentId);
    if (!existing || entry.points > existing.points) {
      bestByStudent.set(entry.studentId, entry);
    }
  });

  return Array.from(bestByStudent.values());
}

export function getDpqLeaderboardRows(limit?: number): DpqLeaderboardRow[] {
  syncDpqLeaderboardFromTestReviews({ skipDispatch: true });

  const currentStudentId = getDpqStudentId();
  const ranked = getBestEntryPerStudent(readEntries())
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return (
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
      displayName:
        entry.studentId === currentStudentId ? "You" : entry.studentName,
    }));

  return typeof limit === "number" ? ranked.slice(0, limit) : ranked;
}

export function hasDpqLeaderboardResults(): boolean {
  return getDpqLeaderboardRows().length > 0;
}
