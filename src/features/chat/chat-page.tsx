"use client";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
} from "react";

import ChatHeader from "@/features/home/components/chat/chat-header";
import ChatMessage from "@/features/home/components/chat/chat-message";
import EmptyChatPlaceholder from "@/features/home/components/chat/chat-placeholder";
import MessageInput from "@/features/home/components/message-input";
import { useChatStore } from "@/store/use-chat-store";

import { TypingIndicator } from "../home/components/chat/chat-icons";
import { type Chat } from "./types/chat-types";

interface ChatStore {
  chats: Chat[];
  activeChatId: string;
  inputMessage: string;
  isTyping: boolean;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleCopyMessage: (messageId: string) => void;
}

const adaptSetInputMessage = (
  setInputMessage: (message: string) => void,
): Dispatch<SetStateAction<string>> => {
  return (value) => {
    if (typeof value === "function") {
      const prevValue = useChatStore.getState().inputMessage;
      setInputMessage(value(prevValue));
    } else {
      setInputMessage(value);
    }
  };
};

const ChatPage: React.FC = () => {
  const {
    chats,
    activeChatId,
    inputMessage,
    isTyping,
    setInputMessage: storeSetInputMessage,
    handleSendMessage,
    handleCopyMessage,
  } = useChatStore();

  const setInputMessage = adaptSetInputMessage(storeSetInputMessage);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeChat =
    chats.find((chat) => chat.id === activeChatId) ??
    ({
      id: "",
      title: "",
      lastActive: "",
      messages: [],
    } as Chat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.messages, isTyping]);

  return (
    <div className="w-full flex-1 bg-gray-50">
      <ChatHeader activeChat={activeChat} />

      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {activeChat.messages.length === 0 ? (
          <EmptyChatPlaceholder setInputMessage={setInputMessage} />
        ) : (
          activeChat.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              handleCopyMessage={handleCopyMessage}
            />
          ))
        )}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatPage;
