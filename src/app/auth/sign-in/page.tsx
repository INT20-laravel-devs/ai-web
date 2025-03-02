import type { Metadata } from "next";

import SignInForm from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = {
  title: "Вхід",
};

const SignIn = () => {
  return <SignInForm />;
};

export default SignIn;
