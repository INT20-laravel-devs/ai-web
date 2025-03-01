import { Pencil } from "lucide-react";
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

const EditProfileDialog = () => {
  const { user, setUser } = useAuthStore();
  const [editUser, setEditUser] = useState<User>(user!);
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    hydrateAuthStore(editUser);
    console.log("Saving user data:", editUser);
    setOpen(false);
  };

  const resetForm = () => {
    setEditUser(user!);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
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
        <span className="text-black">Edit Profile</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
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
                Drop the image here ...
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop an image here, or click to select one
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={editUser?.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={editUser?.username}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
