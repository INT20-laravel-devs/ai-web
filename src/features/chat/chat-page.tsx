"use client";

import { parseAsString, useQueryState } from "nuqs";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

import ChatHeader from "@/features/home/components/chat/chat-header";
import { TypingIndicator } from "@/features/home/components/chat/chat-icons";
import ChatMessage from "@/features/home/components/chat/chat-message";
import EmptyChatPlaceholder from "@/features/home/components/chat/chat-placeholder";
import MessageInput from "@/features/home/components/message-input";
import { useChatStore } from "@/store/use-chat-store";
import { adaptSetInputMessage } from "@/utils/input-utils";

const ChatPage: React.FC = () => {
  const [threadId, setThreadId] = useQueryState(
    "threadId",
    parseAsString.withDefault(""),
  );
  const {
    chats,
    messages,
    inputMessage,
    isTyping,
    initializeSocketListeners,
    cleanupSocketListeners,
    setInputMessage: storeSetInputMessage,
    handleSendMessage,
    handleCopyMessage,
  } = useChatStore();

  const setInputMessage = adaptSetInputMessage(storeSetInputMessage);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initializeSocketListeners();

    return () => {
      cleanupSocketListeners();
    };
  }, [initializeSocketListeners, cleanupSocketListeners]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleShare = () => {
    const chatContent = messages
      .map(
        (msg, index) => `${index % 2 === 0 ? "User" : "AI"}: ${msg.content}\n`,
      )
      .join("\n");

    void navigator.clipboard.writeText(chatContent).catch((error) => {
      console.error("Failed to copy chat to clipboard:", error);
    });

    toast.success("Chat shared", {
      description: "Chat content copied to clipboard.",
    });
  };

  const activeChat = chats.find((chat) => chat.threadId === threadId);

  return (
    <div className="flex h-full flex-col">
      <ChatHeader activeChat={activeChat} onShare={handleShare} />

      <div className="flex-1 overflow-auto p-4">
        {messages.length === 0 ? (
          <EmptyChatPlaceholder setInputMessage={() => {}} />
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                messageIndex={index}
                handleCopyMessage={handleCopyMessage}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
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
