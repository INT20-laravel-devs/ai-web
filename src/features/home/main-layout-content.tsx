"use client";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";

import { Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";
import { Routes } from "@/constants/navigation";
import { createChat } from "@/features/chat/api/chat-api";
import ChatsSection from "@/features/home/components/chat/chats-section";
import SidebarFooter from "@/features/home/components/sidebar/sidebar-footer";
import SidebarHeader from "@/features/home/components/sidebar/siderbar-header";
import useAuthStore from "@/store/use-auth-store";
import { useChatStore } from "@/store/use-chat-store";

const MainLayoutContent = ({ children }: PropsWithChildren) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [threadId, setThreadId] = useQueryState(
    "threadId",
    parseAsString.withDefault(""),
  );
  const { user } = useAuthStore();
  const { addChat } = useChatStore();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleNewChat = async () => {
    try {
      const chatBody = await createChat();
      await setThreadId(chatBody.threadId);
      addChat(chatBody);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threadId]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar className="border-r border-gray-200 bg-white shadow-md">
        <SidebarHeader
          handleNewChat={handleNewChat}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <SidebarContent className="flex-1 gap-0">
          {user && <ChatsSection user={user} searchQuery={searchQuery} />}
        </SidebarContent>

        <SidebarFooter />
      </Sidebar>

      <SidebarInset className="h-full w-full flex-col">{children}</SidebarInset>
    </div>
  );
};

export default MainLayoutContent;
