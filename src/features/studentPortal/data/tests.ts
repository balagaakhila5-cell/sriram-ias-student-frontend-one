export type TestCategory = "Weekly Test" | "Daily Test" | "Monthly Test";

export interface TestItem {
  id: string;
  category: TestCategory;
  title: string;
  attemptSlug: string;
  bookmarked?: boolean;
}

export const testCategories: TestCategory[] = [
  "Weekly Test",
  "Daily Test",
  "Monthly Test",
];

export const tests: TestItem[] = [
  {
    id: "test-1",
    category: "Weekly Test",
    title: "Geography prelims Test 1",
    attemptSlug: "prelims-test-1",
  },
  {
    id: "test-2",
    category: "Weekly Test",
    title: "Geography prelims Test 1",
    attemptSlug: "prelims-test-1",
    bookmarked: true,
  },
  {
    id: "test-3",
    category: "Weekly Test",
    title: "Geography prelims Test 1",
    attemptSlug: "prelims-test-1",
  },
  {
    id: "test-4",
    category: "Weekly Test",
    title: "Geography prelims Test 1",
    attemptSlug: "prelims-test-1",
  },
  {
    id: "test-5",
    category: "Weekly Test",
    title: "Geography prelims Test 1",
    attemptSlug: "prelims-test-1",
    bookmarked: true,
  },
  {
    id: "test-6",
    category: "Weekly Test",
    title: "Geography prelims Test 1",
    attemptSlug: "prelims-test-1",
  },
];
