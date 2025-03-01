import { NuqsAdapter } from "nuqs/adapters/react";
import { type PropsWithChildren } from "react";

import AuthProvider from "@/providers/auth-provider";
const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </AuthProvider>
  );
};

export default Providers;
