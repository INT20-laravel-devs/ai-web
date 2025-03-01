// Mock data
export const initialChats = [
  {
    id: "1",
    title: "Web Development Insights",
    lastActive: "Today, 2:30 PM",
    messages: [
      {
        id: "m1",
        content: "What are the latest trends in React development?",
        sender: "user",
        timestamp: "Today, 2:25 PM",
      },
      {
        id: "m2",
        content:
          "Modern React development is focusing on server components, micro-frontends, and enhanced performance optimization techniques with advanced state management solutions like Jotai and Zustand gaining popularity over Redux.",
        sender: "ai",
        timestamp: "Today, 2:26 PM",
      },
    ],
  },
  {
    id: "2",
    title: "Creative Writing",
    lastActive: "Yesterday",
    messages: [
      {
        id: "m3",
        content:
          "Can you help me craft a compelling introduction for my novel?",
        sender: "user",
        timestamp: "Yesterday, 5:15 PM",
      },
      {
        id: "m4",
        content:
          "Absolutely! Lets create something that hooks readers from the first sentence...",
        sender: "ai",
        timestamp: "Yesterday, 5:16 PM",
      },
    ],
  },
  {
    id: "3",
    title: "Product Development Strategy",
    lastActive: "Mar 1, 2025",
    messages: [],
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