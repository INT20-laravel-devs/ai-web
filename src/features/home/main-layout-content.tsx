"use client";
import { useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect, useRef } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Routes } from "@/constants/navigation";
import ChatItem from "@/features/home/components/chat/chat-item";
import SidebarFooter from "@/features/home/components/sidebar/sidebar-footer";
import SidebarHeader from "@/features/home/components/sidebar/siderbar-header";
import useAuthStore from "@/store/use-auth-store";
import { useChatStore } from "@/store/use-chat-store";

const MainLayoutContent = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const { user, isLoading } = useAuthStore();
  const {
    chats,
    activeChatId,
    isSidebarOpen,
    searchQuery,
    setSearchQuery,
    setActiveChatId,
    handleNewChat,
  } = useChatStore();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const filteredChats = searchQuery
    ? chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chats;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId]);

  // if (!user && !isLoading) {
  //   push(Routes.SignIn);
  //   return null;
  // }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar className="border-r border-gray-200 bg-white shadow-md">
        <SidebarHeader
          handleNewChat={handleNewChat}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <SidebarContent className="flex-1 gap-0">
          {filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              activeChatId={activeChatId}
              setActiveChatId={setActiveChatId}
            />
          ))}
        </SidebarContent>

        <SidebarFooter isSidebarOpen={isSidebarOpen} />
      </Sidebar>

      <SidebarInset className="h-full w-full flex-col">
        {children}
      </SidebarInset>
    </div>
  );
};

export default MainLayoutContent;
