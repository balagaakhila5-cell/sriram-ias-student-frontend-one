export type RecordingSubject =
  | "Geography"
  | "History"
  | "Polity"
  | "Science"
  | "General Studies";

export interface Recording {
  id: string;
  subject: RecordingSubject;
  title: string;
  bookmarked?: boolean;
}

export const recordingSubjects: RecordingSubject[] = [
  "Geography",
  "History",
  "Polity",
  "Science",
  "General Studies",
];

export const recordings: Recording[] = [
  { id: "rec-1", subject: "Geography", title: "Geography Recording Lecture 1" },
  { id: "rec-2", subject: "Geography", title: "Geography Recording Lecture 1", bookmarked: true },
  { id: "rec-3", subject: "Geography", title: "Geography Recording Lecture 1" },
  { id: "rec-4", subject: "Geography", title: "Geography Recording Lecture 1" },
  { id: "rec-5", subject: "Geography", title: "Geography Recording Lecture 1", bookmarked: true },
  { id: "rec-6", subject: "Geography", title: "Geography Recording Lecture 1" },
  { id: "rec-7", subject: "History", title: "History Recording Lecture 1" },
  { id: "rec-8", subject: "Polity", title: "Polity Recording Lecture 1" },
];

export function getRecording(id: string): Recording | undefined {
  return recordings.find((r) => r.id === id);
}
