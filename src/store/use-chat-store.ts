import { create } from "zustand";

import { type ChatBody, type Message } from "@/features/chat/types/chat-types";
import { socket } from "@/lib/socket";

interface SingleChatState {
  chats: ChatBody[];
  messages: Message[];
  inputMessage: string;
  isTyping: boolean;
  setInputMessage: (message: string) => void;
  initializeSocketListeners: () => void;
  cleanupSocketListeners: () => void;
  handleSendMessage: () => void;
  handleCopyMessage: (content: string) => void;
  addChat: (chat: ChatBody) => void;
  removeChat: (threadId: string) => void; // New function
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

export const useChatStore = create<SingleChatState>((set) => ({
  chats: [],
  messages: [],
  inputMessage: "",
  isTyping: false,

  setInputMessage: (message: string) => set({ inputMessage: message }),

  initializeSocketListeners: () => {
    // Connect to socket and join the chat
    socket.emit("join", { threadId: "single-chat" });

    // Listen for incoming messages
    socket.on("message", (message) => {
      set((state) => ({
        messages: [...state.messages, message],
        isTyping: false,
      }));
    });

    // Listen for chat history when joining
    socket.on("join", (messages: Message[]) => {
      set({ messages });
    });
  },

  cleanupSocketListeners: () => {
    socket.off("message");
    socket.off("join");
    socket.emit("leave", { threadId: "single-chat" });
  },

  handleSendMessage: () =>
    set((state) => {
      if (!state.inputMessage.trim()) return state;

      const { timeString, dateString } = getFormattedDateTime();

      const messageData = {
        content: state.inputMessage,
        threadId: "single-chat",
        timestamp: `${dateString}, ${timeString}`,
      };

      const newMessage = {
        threadId: "single-chat",
        content: state.inputMessage,
      } as Message;

      // Send message to server via socket
      socket.emit("message", messageData);

      return {
        messages: [...state.messages, newMessage],
        inputMessage: "",
        isTyping: true,
      };
    }),

  handleCopyMessage: (content: string) => {
    void navigator.clipboard.writeText(content).catch((error) => {
      console.error("Failed to copy to clipboard:", error);
    });
  },

  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),

  // New function to remove a chat by threadId
  removeChat: (threadId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.threadId !== threadId),
      // Clear messages if they belong to the deleted chat
      messages:
        state.messages.length > 0 && state.messages[0].threadId === threadId
          ? []
          : state.messages,
    })),
}));

export const hydrateChatStore = (chats: ChatBody[]) => {
  useChatStore.setState({ chats });
};
