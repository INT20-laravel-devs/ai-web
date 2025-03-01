import { Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserAvatar from "@/components/user-avatar";
import { type User } from "@/features/auth/types/auth-types";
import useAuthStore, { hydrateAuthStore } from "@/store/use-auth-store";

const EditProfileCard = () => {
  const { user, setUser } = useAuthStore();
  const [editUser, setEditUser] = useState<User>(user!);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    hydrateAuthStore(editUser);
    console.log("Saving user data:", editUser);
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
    <Card className="w-full max-w-md">
      <CardContent className="space-y-4 py-4">
        <div
          {...getRootProps()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6"
        >
          <input {...getInputProps()} />
          <UserAvatar
            image={editUser?.avatarLink}
            size={24}
            className="h-32 w-32"
          />
          {isDragActive ? (
            <p className="text-sm text-muted-foreground">
              Drop the image here ...
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Drag 'n' drop an image here, or click to select one
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={editUser?.email} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            name="nickname"
            value={editUser?.username}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4 pb-6">
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default EditProfileCard;
