"use client";

import AboutMeCard from "@/features/profile/components/about-me-card";
import ConnectionsCard from "@/features/profile/components/connections-card";
import LatestActivityCard from "@/features/profile/components/latest-activity-card";
import ProfileCard from "@/features/profile/components/profile-card";
import ProfileCompletionCard from "@/features/profile/components/profile-completion-card";
import SkillsCard from "@/features/profile/components/skills-card";

import { profileData } from "../../../data/profile-data";
import IntegrationsSection from "@/features/profile/components/integrations-section";

const ProfilePage = () => {
  const {
    name,
    role,
    avatar,
    badge,
    stats,
    contactInfo,
    profileCompletion,
    skills,
    activities,
    aboutMe,
    connections,
  } = profileData;

  return (
    <div className="grid">
        <ProfileCard
          name={name}
          role={role}
          avatar={avatar}
          badge={badge}
          stats={stats}
          contactInfo={contactInfo}
        />
        <IntegrationsSection />

    </div>
  );
};

export default ProfilePage;
