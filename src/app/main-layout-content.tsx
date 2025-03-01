"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { type PropsWithChildren, useEffect, useRef } from "react";

import ChatItem from "@/features/home/components/chat/chat-item";
import SidebarFooter from "@/features/home/components/sidebar/sidebar-footer";
import SidebarHeader from "@/features/home/components/sidebar/siderbar-header";
import { useChatStore } from "@/store/use-chat-store";

const MainLayoutContent = ({ children }: PropsWithChildren) => {
  const {
    chats,
    activeChatId,
    inputMessage,
    isSidebarOpen,
    searchQuery,
    isTyping,
    setSearchQuery,
    setInputMessage,
    setIsSidebarOpen,
    setActiveChatId,
    handleSendMessage,
    handleNewChat,
    handleDeleteChat,
    handleCopyMessage,
  } = useChatStore();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const filteredChats = searchQuery
    ? chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chats;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={` ${isSidebarOpen ? "w-80" : "w-20"} flex flex-col border-r border-gray-200 bg-white shadow-md transition-all duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <SidebarHeader
          isSidebarOpen={isSidebarOpen}
          handleNewChat={handleNewChat}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              activeChatId={activeChatId}
              setActiveChatId={setActiveChatId}
              handleDeleteChat={handleDeleteChat}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </div>

        {/* Sidebar Footer */}
        <SidebarFooter isSidebarOpen={isSidebarOpen} />

        {/* Sidebar Toggle */}
        <button
          onClick={setIsSidebarOpen}
          className="flex justify-center border-t border-gray-200 bg-gray-50 p-3 transition hover:bg-gray-100"
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Main Chat Area */}
      {children}
    </div>
  );
};

export default MainLayoutContent;
