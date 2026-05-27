export interface SubmissionItem {
  id: string;
  title: string;
  subject: string;
}

export const submissionSubjects = ["Subject", "Geography", "History", "Polity", "Economy"];

export const studentSubmissions: SubmissionItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `mains-${i + 1}`,
  title: "Geography Mains Test 1",
  subject: "Geography",
}));
