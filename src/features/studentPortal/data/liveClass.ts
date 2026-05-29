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
<<<<<<< HEAD
  id: number;
  topic: string;
  timeLabel: string;
  date: string;
=======
    id: number;
  topic: string;
  timeLabel: string;
   date: string;
>>>>>>> updates
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
    topic: "React Hooks",
    timeLabel: "10:00 AM",
    date: "2026-05-28",
  },
  {
    id: 2,
    topic: "Next JS",
    timeLabel: "2:00 PM",
    date: "2026-05-29",
  },
];
