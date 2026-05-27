import type { TestItem } from "./tests";

export const mainsTests: TestItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: `mains-${i + 1}`,
  category: "Weekly Test",
  title: "Geography prelims Test 1",
  attemptSlug: "prelims-test-1",
  bookmarked: i % 3 === 1,
}));
