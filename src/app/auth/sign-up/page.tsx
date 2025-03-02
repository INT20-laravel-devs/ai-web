import type { Metadata } from "next";

import SignUpForm from "@/features/auth/components/sign-up-form";

export const metadata: Metadata = {
  title: "Реєстрація",
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
