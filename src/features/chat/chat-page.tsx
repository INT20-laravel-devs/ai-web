"use client";
import React, { useEffect, useRef } from "react";

import ChatHeader from "@/features/home/components/chat/chat-header";
import ChatMessage from "@/features/home/components/chat/chat-message";
import EmptyChatPlaceholder from "@/features/home/components/chat/chat-placeholder";
import MessageInput from "@/features/home/components/message-input";
import TypingIndicator from "@/features/home/components/typing-indicator";
import { useChatStore } from "@/store/use-chat-store";

const ChatPage = () => {
  const {
    chats,
    activeChatId,
    inputMessage,
    isTyping,
    setInputMessage,
    handleSendMessage,
    handleCopyMessage,
  } = useChatStore();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Scroll to bottom effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      {/* Chat Header */}
      <ChatHeader activeChat={activeChat} />

      {/* Messages Container */}
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {activeChat?.messages.length === 0 ? (
          <EmptyChatPlaceholder setInputMessage={setInputMessage} />
        ) : (
          activeChat?.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              handleCopyMessage={handleCopyMessage}
            />
          ))
        )}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatPage;
