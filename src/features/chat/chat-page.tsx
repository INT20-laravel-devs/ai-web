"use client";

import { parseAsString, useQueryState } from "nuqs";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

import { deleteChat } from "@/features/chat/api/chat-api";
import { type Chat, type Message } from "@/features/chat/types/chat-types";
import ChatHeader from "@/features/home/components/chat/chat-header";
import { TypingIndicator } from "@/features/home/components/chat/chat-icons";
import ChatMessage from "@/features/home/components/chat/chat-message";
import EmptyChatPlaceholder from "@/features/home/components/chat/chat-placeholder";
import MessageInput from "@/features/home/components/message-input";
import { socket } from "@/lib/socket";
import useAuthStore from "@/store/use-auth-store";
import { useChatStore } from "@/store/use-chat-store";
import { adaptSetInputMessage } from "@/utils/input-utils";

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
    activeThreadId,
    setActiveThreadId,
    setInputMessage: storeSetInputMessage,
    setMessages,
    addMessage,
    setIsTyping,
    handleCopyMessage,
    removeChat,
  } = useChatStore();

  const setInputMessage = adaptSetInputMessage(storeSetInputMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize socket listeners
  useEffect(() => {
    // Listen for incoming messages
    const handleIncomingMessage = (message: Message) => {
      console.log("Incoming message", message);
      addMessage(message);
      setIsTyping(false);
    };

    // Listen for chat history when joining
    const handleJoinRoom = (chatInfo: Chat) => {
      setMessages(chatInfo.messages);
    };

    socket.on("message", handleIncomingMessage);
    socket.on("join", handleJoinRoom);

    // Cleanup socket listeners
    return () => {
      socket.off("message", handleIncomingMessage);
      socket.off("join", handleJoinRoom);

      if (activeThreadId) {
        socket.emit("leave", { threadId: activeThreadId });
      }
    };
  }, [activeThreadId, addMessage, setIsTyping, setMessages]);

  // Join the room specified in the URL query parameter
  useEffect(() => {
    if (threadId && threadId !== activeThreadId) {
      // Leave current room if needed
      if (activeThreadId) {
        socket.emit("leave", { threadId: activeThreadId });
      }

      // Join new room
      socket.emit("join", { threadId });
      setActiveThreadId(threadId);
    }
  }, [threadId, activeThreadId, setActiveThreadId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !activeThreadId) return;

    const { timeString, dateString } = getFormattedDateTime();

    const messageData = {
      content: inputMessage,
      threadId: activeThreadId,
      timestamp: `${dateString}, ${timeString}`,
    };

    // Send message to server via socket
    socket.emit("message", messageData);

    addMessage(messageData);

    // Reset input and set typing state
    setInputMessage("");
    setIsTyping(true);
  };

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

  const handleDeleteChat = async () => {
    if (!threadId) {
      toast.error("Cannot delete chat", {
        description: "No chat is currently selected.",
      });
      return;
    }

    try {
      toast.loading("Deleting chat...");

      // Call the delete API with the thread ID
      await deleteChat(threadId);

      // Update the store to remove the deleted chat
      removeChat(threadId);

      // Reset thread ID after successful deletion
      await setThreadId("");

      toast.dismiss();
      toast.success("Chat deleted successfully");
    } catch (error) {
      console.error("Failed to delete chat:", error);
      toast.dismiss();
      toast.error("Failed to delete chat", {
        description: "An error occurred while deleting the chat.",
      });
    }
  };

  const activeChat = chats.find((chat) => chat.threadId === threadId);

  console.log(JSON.stringify(messages));

  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        activeChat={activeChat!}
        onShare={handleShare}
        onDelete={handleDeleteChat}
      />

      <div className="flex-1 overflow-auto p-4">
        {messages.length === 0 ? (
          <EmptyChatPlaceholder setInputMessage={setInputMessage} />
        ) : (
          <div className="space-y-4">
            {Array.isArray(messages) &&
              messages.map((message, index) => (
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
