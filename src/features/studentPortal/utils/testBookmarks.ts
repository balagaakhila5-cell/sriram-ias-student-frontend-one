import type { TestItem } from "@/features/studentPortal/data/tests";

export const BOOKMARKED_TESTS_STORAGE_KEY = "bookmarkedTests";
export const TEST_BOOKMARKS_UPDATED_EVENT = "test-bookmarks-updated";

function dispatchTestBookmarksUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(TEST_BOOKMARKS_UPDATED_EVENT));
}

export function getBookmarkedTests(): TestItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(BOOKMARKED_TESTS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TestItem[]) : [];
  } catch {
    return [];
  }
}

export function isTestBookmarked(testId: string): boolean {
  return getBookmarkedTests().some((item) => item.id === testId);
}

export function toggleTestBookmark(test: TestItem): boolean {
  const existing = getBookmarkedTests();
  const alreadySaved = existing.some((item) => item.id === test.id);

  const updated = alreadySaved
    ? existing.filter((item) => item.id !== test.id)
    : [...existing, test];

  window.localStorage.setItem(
    BOOKMARKED_TESTS_STORAGE_KEY,
    JSON.stringify(updated),
  );
  dispatchTestBookmarksUpdated();

  return !alreadySaved;
}

export function removeTestBookmark(testId: string) {
  const updated = getBookmarkedTests().filter((item) => item.id !== testId);
  window.localStorage.setItem(
    BOOKMARKED_TESTS_STORAGE_KEY,
    JSON.stringify(updated),
  );
  dispatchTestBookmarksUpdated();
}
