import { MoreHorizontal } from "lucide-react";
import React from "react";

import { type Chat } from "@/features/chat/types/chat-types";

interface ChatHeaderProps {
  activeChat: Chat;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ activeChat }) => (
  <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-center">
      <h1 className="text-xl font-semibold text-gray-800">
        {activeChat.title}
      </h1>
      <span className="ml-3 rounded-full bg-indigo-100 px-2 py-1 text-xs text-primary">
        Active
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <button
        className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
        title="More options"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  </div>
);

export default ChatHeader;
