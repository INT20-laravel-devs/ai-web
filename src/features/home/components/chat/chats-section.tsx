import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const { push } = useRouter();


  const chatsStore = useChatStore((state) => state.chats);

  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats", user?.id],
    queryFn: () => getChats(user?.id),
    enabled: !!user?.id, 
  });

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
        <div
          key={chat.threadId}
          onClick={() => push(`/chat?threadId=${chat.threadId}`)}
        >
          <ChatItem
            chat={chat}
            activeChatId={threadId}
            setActiveChatId={setThreadId}
          />
        </div>
      ))}
    </>
  );
};

export default ChatsSection;
