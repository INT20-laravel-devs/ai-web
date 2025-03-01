import { Copy } from "lucide-react";
import React from "react";

import { type Message } from "@/features/chat/types/chat-types";

import { AiAvatar, UserAvatar } from "./chat-icons";

interface ChatMessageProps {
  message: Message;
  messageIndex: number;
  handleCopyMessage: (content: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  messageIndex,
  handleCopyMessage,
}) => {
  const isUserMessage = messageIndex % 2 === 0; // Infer if it's a user message based on the index

  return (
    <div
      className={`group flex items-start gap-4 ${isUserMessage ? "justify-end" : "justify-start"} `}
    >
      {!isUserMessage && <AiAvatar />}

      <div className="flex max-w-[70%] flex-col">
        <div
          className={`rounded-2xl p-4 shadow-sm ${
            isUserMessage
              ? "rounded-tr-none bg-primary text-white"
              : "rounded-tl-none border border-gray-200 bg-white text-gray-800"
          } `}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        <div
          className={`mt-1 flex items-center space-x-2 ${isUserMessage ? "justify-end" : "justify-start"}`}
        >
          {!isUserMessage && (
            <div className="opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => handleCopyMessage(message.content)}
                className="rounded p-1 hover:bg-gray-100"
                title="Copy message"
              >
                <Copy className="h-3 w-3 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isUserMessage && <UserAvatar />}
    </div>
  );
};

export default ChatMessage;
