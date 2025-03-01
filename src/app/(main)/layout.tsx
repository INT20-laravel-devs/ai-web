import { type PropsWithChildren } from "react";
import Navbar from "src/components/header";

import Footer from "@/components/footer/footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto h-full max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
