import Image from "next/image";
import Link from "next/link";
import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";

type ContactItem = {
  icon: React.ReactNode;
  content: string;
  isLink?: boolean;
  href?: string;
};

type Stat = {
  value: string | number;
  label: string;
};

type ProfileCardProps = {
  name: string;
  role: string;
  avatar: string;
  badge?: string;
  stats: Stat[];
  contactInfo: ContactItem[];
};

const ProfileCard = ({
  name,
  role,
  avatar,
  badge,
  stats,
  contactInfo,
}: ProfileCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="relative mb-2">
        {badge && (
          <Badge
            className="absolute -left-2 -top-2 bg-black text-white hover:bg-black/90"
            variant="secondary"
          >
            {badge}
          </Badge>
        )}
        <div className="flex flex-col items-center">
          <div>
            <UserAvatar size={24} image={avatar} className="h-24 w-24" />
          </div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{role}</p>
        </div>
      </div>

      <div className="my-6 grid grid-cols-3 gap-4 border-y py-6 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {contactInfo.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {item.icon}
            {item.isLink ? (
              <Link
                href={item.href || "#"}
                className="text-primary hover:underline"
              >
                {item.content}
              </Link>
            ) : (
              <span>{item.content}</span>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ProfileCard;
