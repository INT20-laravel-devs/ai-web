import { Edit, MoreHorizontal, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { type Chat, type ChatBody } from "@/features/chat/types/chat-types";

interface ChatHeaderProps {
  activeChat: ChatBody;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  activeChat,
  onEdit,
  onDelete,
}) => (
  <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-center">
      <SidebarTrigger />

      <Image
        src="/icons/favicon.ico"
        alt="FICE advisor logo"
        className="ml-3"
        width={24}
        height={24}
      />
      <span className="ml-3 rounded-full bg-indigo-100 px-2 py-1 text-xs text-primary">
        FICE Advisor
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
          <DropdownMenuItem
            onClick={onDelete}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Видалити чат</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

export default ChatHeader;
