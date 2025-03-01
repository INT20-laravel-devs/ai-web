import { NuqsAdapter } from "nuqs/adapters/react";
import { type PropsWithChildren } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import AuthProvider from "@/providers/auth-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AuthProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </AuthProvider>
    </SidebarProvider>
  );
};

export default Providers;
