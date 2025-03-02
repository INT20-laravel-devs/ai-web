import { create } from "zustand";

import { type ChatBody, type Message } from "@/features/chat/types/chat-types";
import { socket } from "@/lib/socket";

interface SingleChatState {
  chats: ChatBody[];
  messages: Message[];
  inputMessage: string;
  isTyping: boolean;
  activeThreadId: string;
  setActiveThreadId: (threadId: string) => void;
  setInputMessage: (message: string) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setIsTyping: (isTyping: boolean) => void;
  handleCopyMessage: (content: string) => void;
  addChat: (chat: ChatBody) => void;
  removeChat: (threadId: string) => void;
}

export const useChatStore = create<SingleChatState>((set) => ({
  chats: [],
  messages: [],
  inputMessage: "",
  isTyping: false,
  activeThreadId: "",

  setActiveThreadId: (threadId: string) => set({ activeThreadId: threadId }),

  setInputMessage: (message: string) => set({ inputMessage: message }),

  setMessages: (messages: Message[]) => set({ messages }),

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setIsTyping: (isTyping: boolean) => set({ isTyping }),

  handleCopyMessage: (content: string) => {
    void navigator.clipboard.writeText(content).catch((error) => {
      console.error("Failed to copy to clipboard:", error);
    });
  },

  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),

  removeChat: (threadId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.threadId !== threadId),
      messages:
        state.messages.length > 0 && state.messages[0]?.threadId === threadId
          ? []
          : state.messages,
    })),
}));

export const hydrateChatStore = (chats: ChatBody[]) => {
  useChatStore.setState({ chats });
};
