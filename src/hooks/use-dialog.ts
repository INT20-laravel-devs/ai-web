import { useState } from "react";
import { toast } from "sonner";

export const useDialogs = (
  activeChatId: string,
  // handleRenameChat: (chatId: string, newTitle: string) => void,
  // handleDeleteChat: (chatId: string) => void,
) => {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");

  const handleOpenRenameDialog = (currentTitle: string) => {
    setNewChatTitle(currentTitle);
    setIsRenameDialogOpen(true);
  };
  //
  // const handleConfirmRename = () => {
  //   if (newChatTitle.trim()) {
  //     handleRenameChat(activeChatId, newChatTitle);
  //     setIsRenameDialogOpen(false);
  //     toast.success("Chat renamed", {
  //       description: "Your chat has been renamed successfully.",
  //     });
  //   }
  // };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  // const handleConfirmDelete = () => {
  //   handleDeleteChat(activeChatId);
  //   setIsDeleteDialogOpen(false);
  //   toast.success("Chat deleted", {
  //     description: "Your chat has been deleted.",
  //   });
  // };

  return {
    isRenameDialogOpen,
    isDeleteDialogOpen,
    newChatTitle,
    setNewChatTitle,
    handleOpenRenameDialog,
    handleOpenDeleteDialog,
    // handleConfirmRename,
    // handleConfirmDelete,
    setIsRenameDialogOpen,
    setIsDeleteDialogOpen,
  };
};
