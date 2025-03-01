"use client";

import { format } from "date-fns";
import { Send, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar";
import { socket } from "@/lib/socket";
import useAuthStore from "@/store/use-auth-store";

interface Message {
  nickname: string;
  createdAt: string;
  content: string;
  questId: string;
  avatarLink: string;
}

export const ChatInterface = () => {
  const user = useAuthStore((state) => state.user);
  const questId = "default-quest-id";
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize socket connection and join the room
  useEffect(() => {
    // Join the room when component mounts
    socket.emit("join", { questId });

    // Listen for join event with chat history
    socket.on("join", (history: Message[]) => {
      setMessages(history);
    });

    // Listen for new messages
    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Clean up listeners when component unmounts
    return () => {
      socket.off("join");
      socket.off("message");
      socket.emit("leave", { questId });
    };
  }, [questId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const messageData: Message = {
      nickname: user?.nickname ?? "You",
      createdAt: new Date().toISOString(),
      content: newMessage,
      questId: questId,
      avatarLink: user?.avatarLink ?? "",
    };

    socket.emit("message", messageData);
    setNewMessage("");
  };

  const isOwnMessage = (message: Message) =>
    message.nickname === user?.nickname;

  return (
    <Card className="flex w-[400px] flex-col shadow-lg">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <UserAvatar
            image={user?.avatarLink}
            size={20}
            className="h-12 w-12"
          />
          <div>
            <div className="font-semibold">{user?.nickname}</div>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="no-scrollbar h-[300px] space-y-4 overflow-y-auto p-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${isOwnMessage(message) ? "justify-end" : "justify-start"} mb-4`}
          >
            {!isOwnMessage(message) && (
              <UserAvatar
                image={message.avatarLink}
                className="mr-2 h-8 w-8 flex-shrink-0"
              />
            )}

            <div
              className={`max-w-[70%] ${isOwnMessage(message) ? "order-1" : "order-2"}`}
            >
              <div
                className={`flex items-baseline ${isOwnMessage(message) ? "justify-end" : "justify-start"} mb-1`}
              >
                <span className="text-sm font-semibold">
                  {isOwnMessage(message) ? "You" : message.nickname}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {format(new Date(message.createdAt), "HH:mm")}
                </span>
              </div>

              <div
                className={`break-words rounded-2xl px-3 py-2 text-sm ${
                  isOwnMessage(message)
                    ? "rounded-tr-none bg-primary text-primary-foreground"
                    : "rounded-tl-none bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>

            {isOwnMessage(message) && (
              <UserAvatar
                image={user?.avatarLink}
                className="ml-2 h-8 w-8 flex-shrink-0"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto w-full border-t p-4">
        <form onSubmit={sendMessage} className="flex w-full items-center">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon" className="ml-2 flex-shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};
