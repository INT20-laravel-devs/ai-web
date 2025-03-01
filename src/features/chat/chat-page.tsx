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
    initializeSocketListeners,
    cleanupSocketListeners,
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

  // Initialize socket listeners when component mounts
  useEffect(() => {
    initializeSocketListeners();

    // Clean up socket listeners when component unmounts
    return () => {
      cleanupSocketListeners();
    };
  }, [initializeSocketListeners, cleanupSocketListeners]);

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
      <ChatHeader
        activeChat={activeChat}
        onEdit={() => handleOpenRenameDialog(activeChat.title)}
        onDelete={handleOpenDeleteDialog}
        onShare={handleShare}
      />

      <div className="w-full flex-1 space-y-6 overflow-y-auto p-6">
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

      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />

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
