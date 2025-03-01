import { MessageCircle, Trash2 } from "lucide-react";
import React from "react";

import { type Chat } from "@/features/chat/types/chat-types";

interface ChatItemProps {
  chat: Chat;
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  handleDeleteChat: (id: string) => void;
  isSidebarOpen: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  activeChatId,
  setActiveChatId,
  handleDeleteChat,
  isSidebarOpen,
}) => (
  <div
    onClick={() => setActiveChatId(chat.id)}
    className={`flex cursor-pointer items-center border-l-4 p-3 transition ${
      activeChatId === chat.id
        ? "border-primary bg-indigo-50 text-primary"
        : "border-transparent hover:bg-gray-100"
    } `}
  >
    <MessageCircle
      className={`mr-3 h-5 w-5 ${activeChatId === chat.id ? "text-primary" : "text-gray-500"}`}
    />
    {isSidebarOpen && (
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-medium">{chat.title}</span>
          <div className="flex items-center space-x-1">
            <span className="whitespace-nowrap text-xs text-gray-500">
              {chat.lastActive}
            </span>
            {chat.id !== "1" && (
              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleDeleteChat(chat.id);
                }}
                className="rounded-full p-1 opacity-0 transition hover:bg-red-50 group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            )}
          </div>
        </div>
        {chat.messages.length > 0 && (
          <p className="mt-1 truncate text-xs text-gray-500">
            {chat.messages[chat.messages.length - 1]!.content.substring(0, 45)}
            {chat.messages[chat.messages.length - 1]!.content.length > 45
              ? "..."
              : ""}
          </p>
        )}
      </div>
    )}
  </div>
);

export default ChatItem;
