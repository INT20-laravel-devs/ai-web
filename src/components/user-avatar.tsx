import { UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  image?: string | null;
  className?: string;
  size?: number;
}

const UserAvatar = ({ image, className, size = 16 }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={image ?? ""} alt="alt" />
      <AvatarFallback>
        <UserRound size={size} className="opacity-60" aria-hidden="true" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
