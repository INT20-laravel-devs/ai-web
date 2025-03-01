"use client";

import React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import IntegrationsSection from "@/features/profile/components/integrations-section";
import ProfileCard from "@/features/profile/components/profile-card";
import useAuthStore from "@/store/use-auth-store";

const ProfilePage = () => {
  const { user } = useAuthStore();
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger />
          <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
        </div>
      </div>
      <ProfileCard user={user!} />
      <IntegrationsSection />
    </div>
  );
};

export default ProfilePage;
