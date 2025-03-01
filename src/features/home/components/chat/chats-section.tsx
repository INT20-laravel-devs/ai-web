import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

import { type User } from "@/features/auth/types/auth-types";
import { getChats } from "@/features/chat/api/chat-api";
import { type ChatBody } from "@/features/chat/types/chat-types";
import ChatItem from "@/features/home/components/chat/chat-item";
import useAuthStore from "@/store/use-auth-store";
import { hydrateChatStore } from "@/store/use-chat-store";

interface ChatsSectionProps {
  user: User;
  searchQuery: string;
}

const ChatsSection = ({ user, searchQuery }: ChatsSectionProps) => {
  const [threadId, setThreadId] = useQueryState(
    "threadId",
    parseAsString.withDefault(""),
  );

  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(user?.id),
  });

  useEffect(() => {
    if (chats || isLoading) return;
    hydrateChatStore(chats ?? []);
  }, [chats, isLoading]);

  const filteredChats = searchQuery
    ? chats?.filter((chat) => chat.name.includes(searchQuery))
    : chats;

  return (
    <>
      {filteredChats?.map((chat) => (
        <ChatItem
          key={chat.threadId}
          chat={chat}
          activeChatId={threadId}
          setActiveChatId={setThreadId}
        />
      ))}
    </>
  );
};

export default ChatsSection;
