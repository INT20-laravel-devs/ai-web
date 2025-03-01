"use client";
import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

import { getChats } from "@/features/chat/api/chat-api";
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

import { type Chat, type ChatBody } from "./types/chat-types";

const ChatPage = () => {
  // const [threadId] = useQueryState("threadId", parseAsString.withDefault(""));
  // const {
  //   chats,
  //   inputMessage,
  //   isTyping,
  //   initializeSocketListeners,
  //   cleanupSocketListeners,
  //   setInputMessage: storeSetInputMessage,
  //   handleSendMessage,
  //   handleCopyMessage,
  // } = useChatStore();
  //
  // const setInputMessage = adaptSetInputMessage(storeSetInputMessage);
  // const messagesEndRef = useRef<HTMLDivElement | null>(null);
  //
  // const {
  //   isRenameDialogOpen,
  //   isDeleteDialogOpen,
  //   newChatTitle,
  //   setNewChatTitle,
  //   handleOpenRenameDialog,
  //   handleOpenDeleteDialog,
  //   setIsRenameDialogOpen,
  //   setIsDeleteDialogOpen,
  // } = useDialogs(threadId);
  //
  // const activeChat = findActiveChat(chats ?? [], threadId);
  //
  // useEffect(() => {
  //   initializeSocketListeners();
  //
  //   return () => {
  //     cleanupSocketListeners();
  //   };
  // }, [initializeSocketListeners, cleanupSocketListeners]);
  //
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [activeChat.messages, isTyping]);
  //
  // // const handle
  // // Share = () => {
  // //   handleShareChat(activeChatId);
  // //   toast.success("Chat shared", {
  // //     description: "Chat content copied to clipboard.",
  // //   });
  // // };
  //
  // return (
  //   <div className="flex w-full flex-1 flex-col bg-gray-50">
  //     <ChatHeader
  //       activeChat={activeChat}
  //       onEdit={() => handleOpenRenameDialog(activeChat.title)}
  //       onDelete={handleOpenDeleteDialog}
  //     />
  //
  //     <div className="w-full flex-1 space-y-6 overflow-y-auto p-6">
  //       {activeChat.messages.length === 0 ? (
  //         <EmptyChatPlaceholder setInputMessage={setInputMessage} />
  //       ) : (
  //         activeChat.messages.map((message) => (
  //           <ChatMessage
  //             key={message.id}
  //             message={message}
  //             handleCopyMessage={handleCopyMessage}
  //           />
  //         ))
  //       )}
  //
  //       {isTyping && <TypingIndicator />}
  //
  //       <div ref={messagesEndRef} />
  //     </div>
  //
  //     <MessageInput
  //       inputMessage={inputMessage}
  //       setInputMessage={setInputMessage}
  //       handleSendMessage={handleSendMessage}
  //     />
  //
  //     {/* Dialogs */}
  //     <RenameDialog
  //       isOpen={isRenameDialogOpen}
  //       setIsOpen={setIsRenameDialogOpen}
  //       title={newChatTitle}
  //       setTitle={setNewChatTitle}
  //       onConfirm={handleConfirmRename}
  //     />
  //
  //     <DeleteDialog
  //       isOpen={isDeleteDialogOpen}
  //       setIsOpen={setIsDeleteDialogOpen}
  //       onConfirm={handleConfirmDelete}
  //     />
  //   </div>
  // );

  return null;
};

// const findActiveChat = (chats: ChatBody[], activeChatId: string): ChatBody =>
//   chats.find((chat) => chat.threadId === activeChatId) ?? {
//     threadId: "",
//     messages: [],
//   };

export default ChatPage;
