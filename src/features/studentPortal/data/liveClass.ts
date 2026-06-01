export interface LiveSession {
  id: string;
  topic: string;
  /** Seconds remaining until the class starts. */
  startsInSeconds: number;
  dateLabel: string;
  timeLabel: string;
  instructor: string;
  subject: string;
}

export interface UpcomingSession {
  id: number;
  topic: string;
  /** e.g. "1:00 PM - 2:00 PM | Today" */
  timeLabel: string;
  date: string;
}

export const nextClass: LiveSession = {
  id: "sess-1",
  topic: "Indian Constitution Features & Sources",
  startsInSeconds: 60 * 60,
  dateLabel: "April 22, 2020",
  timeLabel: "10:00 AM - 12:00 AM",
  instructor: "Kotla Darshan",
  subject: "General Science",
};

export const upcomingSessions: UpcomingSession[] = [
  {
    id: 1,
    topic: "Indian Constitution Features & Sources",
    timeLabel: "1:00 PM - 2:00 PM | Today",
    date: "2026-05-30",
  },
  {
    id: 2,
    topic: "Indian Constitution Features & Sources",
    timeLabel: "1:00 PM - 2:00 PM | Today",
    date: "2026-05-30",
  },
];
