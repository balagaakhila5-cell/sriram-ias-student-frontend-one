import type { RecordingSubject } from "./recordings";

export interface ScheduledTest {
  id: string;
  subject: RecordingSubject;
  title: string;
  dateLabel: string;
}

export const scheduledTests: ScheduledTest[] = [
  { id: "sch-1", subject: "Geography", title: "Geography prelims Test 1", dateLabel: "Thur , 22 March 2026" },
  { id: "sch-2", subject: "Geography", title: "Geography prelims Test 1", dateLabel: "Thur , 22 March 2026" },
  { id: "sch-3", subject: "Geography", title: "Geography prelims Test 1", dateLabel: "Thur , 22 March 2026" },
  { id: "sch-4", subject: "Geography", title: "Geography prelims Test 1", dateLabel: "Thur , 22 March 2026" },
  { id: "sch-5", subject: "Geography", title: "Geography prelims Test 1", dateLabel: "Thur , 22 March 2026" },
  { id: "sch-6", subject: "Geography", title: "Geography prelims Test 1", dateLabel: "Thur , 22 March 2026" },
  { id: "sch-7", subject: "History", title: "History prelims Test 1", dateLabel: "Thur , 22 March 2026" },
];
