import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { Toaster } from "sonner";

import Providers from "@/providers";

export const metadata: Metadata = {
  title: "App",
  description: "App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
};

export default RootLayout;
