"use client";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import { SidebarFooter as Footer, useSidebar } from "@/components/ui/sidebar";
import UserAvatar from "@/components/user-avatar";
import { Routes } from "@/constants/navigation";
import useAuthStore from "@/store/use-auth-store";

interface SidebarFooterProps {
  isSidebarOpen: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isSidebarOpen }) => {
  const { user } = useAuthStore();
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <Footer className="border-t border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserAvatar image={user?.avatarLink} />
          {isExpanded && (
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          )}
        </div>
        {isExpanded && (
          <div className="flex space-x-1">
            <Link
              href={Routes.Profile}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Settings className="h-6 w-6" />
            </Link>
          </div>
        )}
      </div>
    </Footer>
  );
};

export default SidebarFooter;
