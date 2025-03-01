import { Edit, MoreHorizontal, Share2, Trash2 } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Chat } from "@/features/chat/types/chat-types";

interface ChatHeaderProps {
  activeChat: Chat;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  activeChat,
  onEdit,
  onDelete,
  onShare,
}) => (
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
            title="More options"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            <span>Rename Chat</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onShare} className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share Chat</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Chat</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

export default ChatHeader;
