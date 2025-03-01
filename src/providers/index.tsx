"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { type PropsWithChildren } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import AuthProvider from "@/providers/auth-provider";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <AuthProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </AuthProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

export default Providers;
