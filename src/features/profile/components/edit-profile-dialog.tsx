import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserAvatar from "@/components/user-avatar";
import { type User } from "@/features/auth/types/auth-types";
import useAuthStore, { hydrateAuthStore } from "@/store/use-auth-store";

import { updateAvatar, updateProfile } from "../api/profile-api";

const EditProfileDialog = () => {
  const { user } = useAuthStore();
  const [editUser, setEditUser] = useState<User>(user!);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        console.log(avatarFile);
        await updateAvatar(formData);
      }

      if (user?.username !== editUser.username) {
        await updateProfile(user!.id, editUser.username);
      }

      hydrateAuthStore(editUser);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditUser(user!);
    setAvatarFile(null);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setEditUser((prev) => ({
          ...prev,
          avatarLink: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (newOpen) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <span className="text-black">Налаштування</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Налаштування</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div
            {...getRootProps()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6"
          >
            <input {...getInputProps()} />
            <UserAvatar
              image={editUser?.avatarLink}
              size={24}
              className="h-24 w-24"
            />
            {isDragActive ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Скиньте зображення сюди ...
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Перетягніть зображення сюди або клацніть, щоб вибрати його
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Емейл</Label>
            <Input id="email" value={editUser?.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Ім&apos;я користувача</Label>
            <Input
              id="username"
              name="username"
              value={editUser?.username}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Скасувати
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
