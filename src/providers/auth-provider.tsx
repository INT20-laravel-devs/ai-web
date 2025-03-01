"use client";

import { type PropsWithChildren, useEffect } from "react";

import { hydrateAuthStore } from "@/store/use-auth-store";

const userMock = {
  nickname: "Jane Doe",
  email: "testmail@gmail.com",
  avatarLink: "https://avatars.dicebear.com/api/avataaars/jane-doe.svg",
};
;

const AuthProvider = ({ children }: PropsWithChildren) => {
  const fetchUser = async () => {
    try {
      const user = await new Promise<typeof userMock>((resolve) =>
        setTimeout(() => resolve(userMock), 1000),
      );
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
