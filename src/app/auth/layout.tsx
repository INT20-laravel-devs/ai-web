import { type PropsWithChildren } from "react";

import AuthLayoutContent from "@/features/auth/auth-layout-content";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <AuthLayoutContent>{children}</AuthLayoutContent>;
};

export default AuthLayout;
