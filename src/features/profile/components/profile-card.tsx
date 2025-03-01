import { Mail } from "lucide-react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { type User } from "@/features/auth/types/auth-types";
import { SidebarTrigger } from "@/components/ui/sidebar";

type ProfileCardProps = {
  user: User;
  onEdit?: () => void;
};

const ProfileCard = ({ user, onEdit }: ProfileCardProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger />
          <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
        </div>
      </div>

      <Card className="w-full max-w-md bg-white shadow-lg dark:bg-gray-800">
        <CardHeader className="flex flex-col items-center pb-2 pt-6">
          <UserAvatar
            image={user?.avatarLink}
            size={24}
            className="h-32 w-32"
          />
          <h2 className="mt-2 text-2xl font-bold">{user?.username}</h2>
        </CardHeader>

        <CardContent className="flex flex-col items-center text-center">
          <div className="mb-2 flex items-center text-gray-600 dark:text-gray-400">
            <Mail className="mr-2 h-4 w-4" />
            <span>{user?.email}</span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-4 pb-6">
          <Button variant="outline" onClick={onEdit} className="w-full">
            Edit Profile
          </Button>
          <Button variant="destructive" className="w-full">
            Log out
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProfileCard;
