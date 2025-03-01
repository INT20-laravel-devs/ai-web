"use client";

import Link from "next/link";

import AuthButtons from "@/components/header/auth-buttons";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { Routes } from "@/constants/navigation";
import useAuthStore from "@/store/use-auth-store";
import { cn } from "@/utils/styles-utils";

const UserProfile = () => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[150px]" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  if (!user && !isLoading) return <AuthButtons />;

  return (
    <Link
      href={Routes.Profile}
      className={cn(
        "flex items-center justify-center gap-3 hover:bg-transparent",
      )}
    >
      <div className="flex flex-col">
        <span className="text-right text-sm font-medium">{user?.nickname}</span>
        <span className="text-muted-foreground text-right text-xs">
          {user?.email}
        </span>
      </div>
      <UserAvatar />
    </Link>
  );
};

export default UserProfile;
