import { create } from "zustand";

import { type Chat, type Message } from "@/features/chat/types/chat-types";
import { initialChats } from "@/features/home/data/mock-data";

interface ChatState {
  chats: Chat[];
  activeChatId: string;
  inputMessage: string;
  isSidebarOpen: boolean;
  searchQuery: string;
  isTyping: boolean;
  setSearchQuery: (query: string) => void;
  setInputMessage: (message: string) => void;
  setIsSidebarOpen: () => void;
  setActiveChatId: (chatId: string) => void;
  handleSendMessage: () => void;
  handleNewChat: () => void;
  handleDeleteChat: (chatId: string) => void;
  handleCopyMessage: (content: string) => void;
}

interface FormattedDateTime {
  timeString: string;
  dateString: string;
}

const getFormattedDateTime = (): FormattedDateTime => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { timeString, dateString: "Today" };
};

export const useChatStore = create<ChatState>((set) => ({
  chats: initialChats,
  activeChatId: "1",
  inputMessage: "",
  isSidebarOpen: true,
  searchQuery: "",
  isTyping: false,

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setInputMessage: (message: string) => set({ inputMessage: message }),
  setIsSidebarOpen: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActiveChatId: (chatId: string) => set({ activeChatId: chatId }),

  handleSendMessage: () =>
    set((state) => {
      if (!state.inputMessage.trim()) return state;

      const { timeString, dateString } = getFormattedDateTime();
      const updatedChats = state.chats.map((chat) =>
        chat.id === state.activeChatId
          ? {
              ...chat,
              lastActive: `${dateString}, ${timeString}`,
              messages: [
                ...chat.messages,
                {
                  id: `m${Date.now()}`,
                  content: state.inputMessage,
                  sender: "user",
                  timestamp: `${dateString}, ${timeString}`,
                } as Message,
              ],
            }
          : chat,
      );

      const currentMessage = state.inputMessage;
      void new Promise<void>((resolve) => {
        setTimeout(() => {
          set((prevState) => {
            const { timeString, dateString } = getFormattedDateTime();
            return {
              chats: prevState.chats.map((chat) =>
                chat.id === prevState.activeChatId
                  ? {
                      ...chat,
                      lastActive: `${dateString}, ${timeString}`,
                      messages: [
                        ...chat.messages,
                        {
                          id: `m${Date.now()}`,
                          content: `I've analyzed your inquiry regarding "${currentMessage}". Based on current industry standards and best practices, here's a comprehensive assessment that addresses your specific needs.`,
                          sender: "ai",
                          timestamp: `${dateString}, ${timeString}`,
                        } as Message,
                      ],
                    }
                  : chat,
              ),
              isTyping: false,
            };
          });
          resolve();
        }, 1500);
      }).catch((error) => {
        console.error("Error during message handling:", error);
        // Reset typing state in case of error
        set({ isTyping: false });
      });

      return { chats: updatedChats, inputMessage: "", isTyping: true };
    }),

  handleNewChat: () =>
    set((state) => {
      const { timeString } = getFormattedDateTime();
      const newChat: Chat = {
        id: `chat-${Date.now()}`,
        title: "New Conversation",
        lastActive: `Today, ${timeString}`,
        messages: [],
      };
      return {
        chats: [...state.chats, newChat],
        activeChatId: newChat.id,
        inputMessage: "",
      };
    }),

  handleDeleteChat: (chatId: string) =>
    set((state) => {
      if (state.chats.length <= 1) return state;
      const updatedChats = state.chats.filter((chat) => chat.id !== chatId);
      return {
        chats: updatedChats,
        activeChatId:
          chatId === state.activeChatId
            ? updatedChats[0]?.id
            : state.activeChatId,
      };
    }),

  handleCopyMessage: (content: string) => {
    void navigator.clipboard.writeText(content).catch((error) => {
      console.error("Failed to copy to clipboard:", error);
    });
  },
}));
