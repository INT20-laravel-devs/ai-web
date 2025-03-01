"use client";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

import ChatHeader from "@/features/home/components/chat/chat-header";
import { TypingIndicator } from "@/features/home/components/chat/chat-icons";
import ChatMessage from "@/features/home/components/chat/chat-message";
import EmptyChatPlaceholder from "@/features/home/components/chat/chat-placeholder";
import { DeleteDialog } from "@/features/home/components/dialog/delete-dialog";
import { RenameDialog } from "@/features/home/components/dialog/rename-dialog";
import MessageInput from "@/features/home/components/message-input";
import { useDialogs } from "@/hooks/use-dialog";
import { useChatStore } from "@/store/use-chat-store";
import { adaptSetInputMessage } from "@/utils/input-utils";

import { type Chat } from "./types/chat-types";

const ChatPage: React.FC = () => {
  const {
    chats,
    activeChatId,
    inputMessage,
    isTyping,
    setInputMessage: storeSetInputMessage,
    handleSendMessage,
    handleCopyMessage,
    handleDeleteChat,
    handleRenameChat,
    handleShareChat,
  } = useChatStore();

  const setInputMessage = adaptSetInputMessage(storeSetInputMessage);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
    isRenameDialogOpen,
    isDeleteDialogOpen,
    newChatTitle,
    setNewChatTitle,
    handleOpenRenameDialog,
    handleOpenDeleteDialog,
    handleConfirmRename,
    handleConfirmDelete,
    setIsRenameDialogOpen,
    setIsDeleteDialogOpen,
  } = useDialogs(activeChatId, handleRenameChat, handleDeleteChat);

  const activeChat = findActiveChat(chats, activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.messages, isTyping]);

  const handleShare = () => {
    handleShareChat(activeChatId);
    toast.success("Chat shared", {
      description: "Chat content copied to clipboard.",
    });
  };

  return (
    <div className="flex w-full flex-1 flex-col bg-gray-50">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <ChatHeader
          activeChat={activeChat}
          onEdit={() => handleOpenRenameDialog(activeChat.title)}
          onDelete={handleOpenDeleteDialog}
          onShare={handleShare}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex h-[calc(100vh-130px)] flex-col overflow-hidden">
        <div className="w-full flex-1 space-y-6 overflow-y-auto p-12">
          {activeChat.messages.length === 0 ? (
            <EmptyChatPlaceholder setInputMessage={setInputMessage} />
          ) : (
            activeChat.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                handleCopyMessage={handleCopyMessage}
              />
            ))
          )}

          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input - Fixed at Bottom */}
      <div className="sticky bottom-0 border-t border-gray-200 bg-white">
        <MessageInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>

      {/* Dialogs */}
      <RenameDialog
        isOpen={isRenameDialogOpen}
        setIsOpen={setIsRenameDialogOpen}
        title={newChatTitle}
        setTitle={setNewChatTitle}
        onConfirm={handleConfirmRename}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

const findActiveChat = (chats: Chat[], activeChatId: string): Chat =>
  chats.find((chat) => chat.id === activeChatId) ?? {
    id: "",
    title: "",
    lastActive: "",
    messages: [],
  };

export default ChatPage;
