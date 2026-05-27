export interface Lecture {
  id: string;
  title: string;
  duration: string;
  startedAt: string;
}

export const lectures: Lecture[] = Array.from({ length: 9 }, (_, i) => ({
  id: `lec-${i + 1}`,
  title: i === 0 ? "Introduction to Geography" : `Geography Lecture ${i + 1}`,
  duration: "08:23",
  startedAt: "05:42",
}));
