"use client";

import { useRouter } from "next/navigation";

import { Routes } from "@/constants/navigation";
import useAuthStore from "@/store/use-auth-store";

const Home = () => {
  const { replace } = useRouter();
  const { user, isLoading } = useAuthStore();

  if (!user && !isLoading) {
    replace(Routes.SignUp);
  } else if (user) {
    replace(Routes.Profile);
  }

  return null;
};

export default Home;
