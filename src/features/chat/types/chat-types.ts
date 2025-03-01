export interface Message {
  threadId: string;
  content: string;
}

export interface Chat {
  id: string;
  title: string;
  lastActive: string;
  messages: Message[];
}

export interface PromptExample {
  title: string;
  description: string;
}

export interface ChatBody {
  name: string;
  description: string;
  threadId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
