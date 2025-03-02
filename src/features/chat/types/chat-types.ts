export interface Message {
  threadId: string;
  content: string;
}

export interface Chat {
  threadId: string;
  userId: string;
  name?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
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
