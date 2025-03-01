import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";

import { type User } from "@/features/auth/types/auth-types";
import { getChats } from "@/features/chat/api/chat-api";
import ChatItem from "@/features/home/components/chat/chat-item";
import { hydrateChatStore,useChatStore } from "@/store/use-chat-store";

interface ChatsSectionProps {
  user: User;
  searchQuery: string;
}

const ChatsSection = ({ user, searchQuery }: ChatsSectionProps) => {
  const [threadId, setThreadId] = useQueryState(
    "threadId",
    parseAsString.withDefault(""),
  );

  // Get chats from the zustand store
  const chatsStore = useChatStore((state) => state.chats);

  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats", user?.id],
    queryFn: () => getChats(user?.id),
    enabled: !!user?.id, // Only run the query if user.id exists
  });

  // Hydrate chat store when chats data changes
  useEffect(() => {
    if (chats) {
      hydrateChatStore(chats);
    }
  }, [chats]);

  // Filter chats from store based on search query
  const filteredChats = searchQuery
    ? chatsStore?.filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chatsStore;

  if (isLoading && !chatsStore?.length) {
    return (
      <div className="py-2 text-sm text-muted-foreground">Loading chats...</div>
    );
  }

  if (!filteredChats?.length) {
    return (
      <div className="py-2 text-sm text-muted-foreground">
        {searchQuery ? "No chats match your search" : "No chats found"}
      </div>
    );
  }

  return (
    <>
      {filteredChats.map((chat) => (
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
