export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  lastActive: string;
  messages: Message[];
}
