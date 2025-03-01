import { type Chat } from "@/features/chat/types/chat-types";

export const initialChats: Chat[] = [
  {
    id: "1",
    title: "Chat 1",
    lastActive: "Today, 10:00 AM",
    messages: [
      {
        id: "m1",
        content: "Hello!",
        sender: "user",
        timestamp: "Today, 10:00 AM",
      },
      {
        id: "m2",
        content: "Hi there!",
        sender: "ai",
        timestamp: "Today, 10:01 AM",
      },
    ],
  },
];

export const promptExamples = [
  {
    title: "Website Development",
    description: "Help me build a responsive landing page for my new product",
  },
  {
    title: "Code Review",
    description: "Review my React component for performance issues",
  },
  {
    title: "Learn Something New",
    description: "Explain how GraphQL differs from traditional REST APIs",
  },
];
