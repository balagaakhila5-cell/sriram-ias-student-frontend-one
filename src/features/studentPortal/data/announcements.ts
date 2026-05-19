export type AnnouncementCategory = "Exam" | "General";

export interface Announcement {
  id: string;
  dateLabel: string;
  category: AnnouncementCategory;
  title: string;
  description: string;
  attachmentName?: string;
  attachmentUrl?: string;
  read?: boolean;
  pinned?: boolean;
}

export const announcements: Announcement[] = [
  {
    id: "a-1",
    dateLabel: "10:00 AM | April 22 , 2020",
    category: "Exam",
    title: "Anubuthi III Results are Announced Today .",
    description: "The results for Anubuthi III have been officially announced.",
    attachmentName: "resultsanouncement.pdf",
    attachmentUrl: "#",
  },
  {
    id: "a-2",
    dateLabel: "10:00 AM | April 22 , 2020",
    category: "General",
    title: "Anubuthi III Results are Announced Today .",
    description: "The results for Anubuthi III have been officially announced.",
  },
  {
    id: "a-3",
    dateLabel: "10:00 AM | April 22 , 2020",
    category: "Exam",
    title: "Anubuthi III Results are Announced Today .",
    description: "The results for Anubuthi III have been officially announced.",
    attachmentName: "resultsanouncement.pdf",
    attachmentUrl: "#",
  },
];
