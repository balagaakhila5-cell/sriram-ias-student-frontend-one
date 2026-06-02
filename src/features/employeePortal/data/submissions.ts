export interface SubmissionItem {
  id: string;
  title: string;
  subtitle: string;
  subject: string;
  downloadUrl: string;
  downloadName: string;
}

export const submissionSubjects = [
  "Subject",
  "Geography",
  "History",
  "Polity",
  "Economy",
];

export const studentSubmissions: SubmissionItem[] = [
  {
    id: "geo-mains-1",
    title: "Geography Mains",
    subtitle: "Test 1",
    subject: "Geography",
    downloadUrl: "/assets/samples/sriram-sample.pdf",
    downloadName: "Geography-Mains-Test-1.pdf",
  },
  {
    id: "geo-mains-2",
    title: "Geography Mains",
    subtitle: "Test 2",
    subject: "Geography",
    downloadUrl: "/assets/samples/sriram-sample.pdf",
    downloadName: "Geography-Mains-Test-2.pdf",
  },
  {
    id: "hist-mains-1",
    title: "History Mains",
    subtitle: "Test 1",
    subject: "History",
    downloadUrl: "/assets/samples/sriram-sample.pdf",
    downloadName: "History-Mains-Test-1.pdf",
  },
  {
    id: "hist-mains-2",
    title: "History Mains",
    subtitle: "Test 2",
    subject: "History",
    downloadUrl: "/assets/samples/sriram-sample.pdf",
    downloadName: "History-Mains-Test-2.pdf",
  },
  {
    id: "pol-mains-1",
    title: "Polity Mains",
    subtitle: "Test 1",
    subject: "Polity",
    downloadUrl: "/assets/samples/sriram-sample.pdf",
    downloadName: "Polity-Mains-Test-1.pdf",
  },
  {
    id: "pol-mains-2",
    title: "Polity Mains",
    subtitle: "Test 2",
    subject: "Polity",
    downloadUrl: "/assets/samples/sriram-sample.pdf",
    downloadName: "Polity-Mains-Test-2.pdf",
  },
  {
    id: "eco-mains-1",
    title: "Economy Mains",
    subtitle: "Test 1",
    subject: "Economy",
    downloadUrl: "/assets/samples/sriram-sample.pdf",
    downloadName: "Economy-Mains-Test-1.pdf",
  },
  {
    id: "eco-mains-2",
    title: "Economy Mains",
    subtitle: "Test 2",
    subject: "Economy",
    downloadUrl: "/assets/samples/sriram-sample.pdf",
    downloadName: "Economy-Mains-Test-2.pdf",
  },
];
