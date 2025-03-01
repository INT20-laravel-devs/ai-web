import { CommandIcon } from "lucide-react";
import Link from "next/link";

import { Routes } from "@/constants/navigation";

export const Logo = () => (
  <Link href={Routes.Home} className="flex items-center">
    <div className="bg-primary rounded-lg p-1.5">
      <CommandIcon size={18} className="text-secondary" />
    </div>
    <span className="ml-2 text-lg font-medium">Logo</span>
  </Link>
);
