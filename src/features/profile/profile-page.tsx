"use client";

import IntegrationsSection from "@/features/profile/components/integrations-section";
import ProfileCard from "@/features/profile/components/profile-card";
import useAuthStore from "@/store/use-auth-store";

const ProfilePage = () => {
  const { user } = useAuthStore();
  return (
    <div className="space-y-4 p-6">
      <ProfileCard user={user!} />
      <IntegrationsSection />
    </div>
  );
};

export default ProfilePage;
