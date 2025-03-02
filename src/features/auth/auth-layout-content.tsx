import { type PropsWithChildren } from "react";

import { Logo } from "@/components/logo";

const AuthLayoutContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutContent;
