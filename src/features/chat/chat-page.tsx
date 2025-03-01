"use client";
import React, { useEffect, useRef, useState } from "react";

import ChatHeader from "@/features/home/components/chat/chat-header";
import ChatMessage from "@/features/home/components/chat/chat-message";
import EmptyChatPlaceholder from "@/features/home/components/chat/chat-placeholder";
import MessageInput from "@/features/home/components/message-input";
import TypingIndicator from "@/features/home/components/typing-indicator";
import { initialChats } from "@/features/home/data/mock-data";

const ChatPage = () => {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState("1");
  const [inputMessage, setInputMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const filteredChats = searchQuery
    ? chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chats;

  // Helper function to get formatted time and date
  const getFormattedDateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { timeString, dateString: "Today" };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const { timeString, dateString } = getFormattedDateTime();

    // Add user message
    const updatedChats = chats.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            lastActive: `${dateString}, ${timeString}`,
            messages: [
              ...chat.messages,
              {
                id: `m${Date.now()}`,
                content: inputMessage,
                sender: "user",
                timestamp: `${dateString}, ${timeString}`,
              },
            ],
          }
        : chat,
    );

    // Update chats and clear input
    setChats(updatedChats);
    setInputMessage("");

    // Show AI typing indicator
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);

      const { timeString, dateString } = getFormattedDateTime();

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                lastActive: `${dateString}, ${timeString}`,
                messages: [
                  ...chat.messages,
                  {
                    id: `m${Date.now()}`,
                    content: `I've analyzed your inquiry regarding "${inputMessage}". Based on current industry standards and best practices, here's a comprehensive assessment that addresses your specific needs.`,
                    sender: "ai",
                    timestamp: `${dateString}, ${timeString}`,
                  },
                ],
              }
            : chat,
        ),
      );
    }, 1500);
  };

  const handleNewChat = () => {
    const { timeString } = getFormattedDateTime();

    const newChat = {
      id: `chat-${Date.now()}`,
      title: "New Conversation",
      lastActive: `Today, ${timeString}`,
      messages: [],
    };

    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
    setInputMessage("");
  };

  const handleDeleteChat = (chatId) => {
    if (chats.length <= 1) return;

    const updatedChats = chats.filter((chat) => chat.id !== chatId);
    setChats(updatedChats);

    if (chatId === activeChatId) {
      setActiveChatId(updatedChats[0].id);
    }
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  // Scroll to bottom effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  return (
    <div>
      <div className="flex flex-1 flex-col bg-gray-50">
        {/* Chat Header */}
        <ChatHeader activeChat={activeChat} />

        {/* Messages Container */}
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
    </div>
  );
};

export default ChatPage;
