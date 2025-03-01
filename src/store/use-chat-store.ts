import { create } from "zustand";

import { type Chat, type Message } from "@/features/chat/types/chat-types";
import { initialChats } from "@/features/home/data/mock-data";
import { socket } from "@/lib/socket"; // Import your existing socket instance

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
  initializeSocketListeners: () => void;
  cleanupSocketListeners: () => void;
  handleSendMessage: () => void;
  handleNewChat: () => void;
  handleDeleteChat: (chatId: string) => void;
  handleCopyMessage: (content: string) => void;
  handleRenameChat: (chatId: string, newTitle: string) => void;
  handleShareChat: (chatId: string) => void;
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

export const useChatStore = create<ChatState>((set, get) => ({
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

  setActiveChatId: (chatId: string) => {
    const { activeChatId } = get();

    // Leave current room if we have an active chat
    if (activeChatId) {
      socket.emit("leave", { threadId: activeChatId });
    }

    // Join new room
    socket.emit("join", { threadId: chatId });

    set({ activeChatId: chatId });
  },

  initializeSocketListeners: () => {
    const { activeChatId } = get();

    // Join initial room
    if (activeChatId) {
      socket.emit("join", { threadId: activeChatId });
    }

    // Listen for incoming messages
    socket.on("message", (message) => {
      set((state) => {
        const updatedChats = state.chats.map((chat) =>
          chat.id === state.activeChatId
            ? {
                ...chat,
                lastActive: message.timestamp || new Date().toLocaleString(),
                messages: [...chat.messages, message],
              }
            : chat,
        );
        return { chats: updatedChats, isTyping: false };
      });
    });

    // Listen for chat history when joining a room
    socket.on("join", (messages: Message[]) => {
      set((state) => {
        const updatedChats = state.chats.map((chat) =>
          chat.id === state.activeChatId
            ? {
                ...chat,
                messages: messages,
              }
            : chat,
        );
        return { chats: updatedChats };
      });
    });
  },

  cleanupSocketListeners: () => {
    socket.off("message");
    socket.off("join");

    const { activeChatId } = get();
    if (activeChatId) {
      socket.emit("leave", { threadId: activeChatId });
    }
  },

  handleSendMessage: () =>
    set((state) => {
      if (!state.inputMessage.trim()) return state;

      const { timeString, dateString } = getFormattedDateTime();

      const messageData = {
        content: state.inputMessage,
        threadId: state.activeChatId,
        timestamp: `${dateString}, ${timeString}`,
      };

      // Add the message locally first (optimistic update)
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

      // Send message to server via socket
      socket.emit("message", messageData);

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

      // Leave current chat room
      const { activeChatId } = get();
      if (activeChatId) {
        socket.emit("leave", { threadId: activeChatId });
      }

      // Join the new chat room
      socket.emit("join", { threadId: newChat.id });

      return {
        chats: [...state.chats, newChat],
        activeChatId: newChat.id,
        inputMessage: "",
      };
    }),

  handleDeleteChat: (chatId: string) =>
    set((state) => {
      if (state.chats.length <= 1) return state;

      // Leave the chat room if it's the active one
      if (chatId === state.activeChatId) {
        socket.emit("leave", { threadId: chatId });
      }

      const updatedChats = state.chats.filter((chat) => chat.id !== chatId);
      const newActiveId =
        chatId === state.activeChatId
          ? updatedChats[0]?.id
          : state.activeChatId;

      // Join new active chat room if needed
      if (chatId === state.activeChatId && newActiveId) {
        socket.emit("join", { threadId: newActiveId });
      }

      return {
        chats: updatedChats,
        activeChatId: newActiveId,
      };
    }),

  handleCopyMessage: (content: string) => {
    void navigator.clipboard.writeText(content).catch((error) => {
      console.error("Failed to copy to clipboard:", error);
    });
  },

  handleRenameChat: (chatId: string, newTitle: string) =>
    set((state) => {
      if (!newTitle.trim()) return state;

      const updatedChats = state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: newTitle.trim(),
            }
          : chat,
      );

      return { chats: updatedChats };
    }),

  handleShareChat: (chatId: string) =>
    set((state) => {
      // Find the chat to share
      const chatToShare = state.chats.find((chat) => chat.id === chatId);

      if (!chatToShare) return state;

      // Create a shareable text version of the chat
      const chatContent = chatToShare.messages
        .map(
          (msg) => `${msg.sender === "user" ? "User" : "AI"}: ${msg.content}\n`,
        )
        .join("\n");

      const shareableContent = `${chatToShare.title}\n\n${chatContent}`;

      // Copy to clipboard
      void navigator.clipboard.writeText(shareableContent).catch((error) => {
        console.error("Failed to copy chat to clipboard:", error);
      });

      return state; // No state changes needed
    }),
}));
