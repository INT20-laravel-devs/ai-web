"use client";

import { type PropsWithChildren, useEffect } from "react";

import { getMe } from "@/features/auth/api/auth-api";
import { hydrateAuthStore } from "@/store/use-auth-store";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const fetchUser = async () => {
    try {
      const user = await getMe();
      hydrateAuthStore(user);
    } catch (e) {
      hydrateAuthStore(null);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUser().catch((error) => console.error(error));
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
