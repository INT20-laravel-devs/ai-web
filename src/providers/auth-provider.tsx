"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";

import { Routes } from "@/constants/navigation";
import { getMe } from "@/features/auth/api/auth-api";
import { hydrateAuthStore } from "@/store/use-auth-store";

export const protectedPages = [Routes.Chat, Routes.Profile];

const AuthProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const isProtectedPage = protectedPages.some((page) =>
    pathname.startsWith(page),
  );

  const fetchUser = async () => {
    try {
      const user = await getMe();
      hydrateAuthStore(user);
    } catch (e) {
      hydrateAuthStore(null);
      if (isProtectedPage) {
        replace(Routes.SignIn);
      }
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUser().catch((error) => console.error(error));
  }, [pathname, searchParams]);

  return <>{children}</>;
};

export default AuthProvider;
