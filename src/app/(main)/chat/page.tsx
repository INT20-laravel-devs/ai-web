import { type Metadata } from "next";

import ChatPage from "@/features/chat/chat-page";

export const metadata: Metadata = {
  title: "Чат",
};

const Chat = () => {
  return <ChatPage />;
};

export default Chat;
