import { type PropsWithChildren } from "react";

import MainLayoutContent from "@/app/main-layout-content";

const MainLayout = ({ children }: PropsWithChildren) => {
  return <MainLayoutContent>{children}</MainLayoutContent>;
};

export default MainLayout;
