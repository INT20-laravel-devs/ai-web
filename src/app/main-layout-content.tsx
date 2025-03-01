"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, {
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

import ChatItem from "@/features/home/components/chat/chat-item";
import SidebarFooter from "@/features/home/components/sidebar/sidebar-footer";
import SidebarHeader from "@/features/home/components/sidebar/siderbar-header";
import { initialChats } from "@/features/home/data/mock-data";

const MainLayoutContent = ({ children }: PropsWithChildren) => {
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
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
