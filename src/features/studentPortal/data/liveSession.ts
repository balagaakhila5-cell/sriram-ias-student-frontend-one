export interface ChatMessage {
  id: string;
  author: string;
  text: string;
  time: string;
  isSelf?: boolean;
}

export const inCallMessages: ChatMessage[] = [
  {
    id: "m-1",
    author: "Darshan Sir",
    text: "Have a great working week!!",
    time: "09:25 AM",
  },
  {
    id: "m-2",
    author: "You",
    text: "You did your job well!",
    time: "09:25 AM",
    isSelf: true,
  },
  {
    id: "m-3",
    author: "Darshan Sir",
    text: "Have a great working week!!",
    time: "09:25 AM",
  },
];

export const questions: ChatMessage[] = [
  {
    id: "q-1",
    author: "Student 1",
    text: "What are the major factors affecting the distribution of population?",
    time: "09:25 AM",
  },
  {
    id: "q-2",
    author: "Student 2",
    text: "Why are rivers important for economic development?",
    time: "09:25 AM",
  },
];
