"use client";
import { MessageCircle } from "lucide-react";
import type React from "react";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { type ChatBody } from "@/features/chat/types/chat-types";

interface ChatItemProps {
  chat: ChatBody;
  chatIndex: number;
  activeChatId: string;
  setActiveChatId: (id: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  chatIndex,
  activeChatId,
  setActiveChatId,
}) => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const isActive = activeChatId === chat.threadId;

  const date = new Date(chat.updatedAt);
  const formattedDate = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <SidebarMenuItem className="list-none">
      <SidebarMenuButton
        onClick={() => setActiveChatId(chat.threadId)}
        isActive={isActive}
        className={`flex items-center rounded-none border-l-4 p-2 py-7 transition ${
          isActive
            ? "border-primary bg-indigo-50 text-primary"
            : "border-transparent hover:bg-gray-100"
        }`}
        tooltip={chat.name}
      >
        <MessageCircle
          className={`mr-3 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5 ${isActive ? "text-primary" : "text-gray-500"}`}
        />
        {isExpanded && (
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center justify-between gap-1">
              <span className="truncate text-sm font-medium">
                Чат {chatIndex}
              </span>
              <span className="whitespace-nowrap text-xs font-medium text-gray-500">
                {formattedDate}
              </span>
            </div>
          </div>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default ChatItem;
