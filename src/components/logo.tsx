import { BrainCog, CommandIcon } from "lucide-react";
import Link from "next/link";

import { Routes } from "@/constants/navigation";

export const Logo = () => (
  <Link href={Routes.Home} className="flex items-center">
    <div className="rounded-lg bg-primary p-1.5">
      <BrainCog size={18} className="text-secondary" />
    </div>
    <span className="ml-2 text-lg font-medium">SmartSup</span>
  </Link>
);
