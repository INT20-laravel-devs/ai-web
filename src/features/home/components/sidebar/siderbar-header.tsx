"use client";
import { Plus, Search } from "lucide-react";
import React from "react";

import {
  SidebarHeader as Header,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface SidebarHeaderProps {
  isSidebarOpen: boolean;
  handleNewChat: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isSidebarOpen,
  handleNewChat,
  searchQuery,
  setSearchQuery,
}) => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <Header className="space-y-3 border-b border-gray-200 p-4">
      {isExpanded ? (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Conversations
            </h2>
            <button
              onClick={handleNewChat}
              className="rounded-full p-2 text-gray-700 transition hover:bg-gray-100"
              title="New Chat"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <SidebarInput
              type="text"
              placeholder="Search conversations"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </>
      ) : (
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleNewChat}
              className="mb-2 flex justify-center rounded-full p-2 transition hover:bg-gray-100"
              tooltip="New Chat"
            >
              <Plus className="h-6 w-6 text-gray-700" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="flex justify-center rounded-full p-2 transition hover:bg-gray-100"
              tooltip="Search"
            >
              <Search className="h-6 w-6 text-gray-700" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      )}
    </Header>
  );
};

export default SidebarHeader;
