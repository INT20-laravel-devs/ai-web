"use client";
import { MessageCircle } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import type { Chat } from "@/features/chat/types/chat-types";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

interface ChatItemProps {
  chat: Chat;
  activeChatId: string;
  setActiveChatId: (id: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  activeChatId,
  setActiveChatId,
}) => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const isActive = activeChatId === chat.id;
  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <SidebarMenuItem className="list-none">
      <SidebarMenuButton
        onClick={() => setActiveChatId(chat.id)}
        isActive={isActive}
        className={`flex items-center rounded-none border-l-4 p-2 py-7 transition ${
          isActive
            ? "border-primary bg-indigo-50 text-primary"
            : "border-transparent hover:bg-gray-100"
        }`}
        tooltip={chat.title}
      >
        <MessageCircle
          className={`mr-3 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5 ${isActive ? "text-primary" : "text-gray-500"}`}
        />
        {isExpanded && (
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center justify-between gap-1">
              <span className="truncate text-sm font-medium">{chat.title}</span>
              <span className="whitespace-nowrap text-xs font-medium text-gray-500">
                {chat.lastActive}
              </span>
            </div>
            {chat.messages.length > 0 && (
              <p className="mt-1 truncate text-xs font-medium text-gray-500">
                {chat.messages[chat.messages.length - 1]!.content.substring(
                  0,
                  isMobile ? 25 : 45,
                )}
                {chat.messages[chat.messages.length - 1]!.content.length >
                (isMobile ? 25 : 45)
                  ? "..."
                  : ""}
              </p>
            )}
          </div>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default ChatItem;
