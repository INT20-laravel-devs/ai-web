"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Routes } from "@/constants/navigation";
import { signIn } from "@/features/auth/api/auth-api";
import {
  type SignInFormData,
  signInSchema,
} from "@/features/auth/types/auth-types";
import { cn } from "@/utils/styles-utils";

interface SignInFormProps {
  className?: string;
}

const SignInForm = ({ className }: SignInFormProps) => {
  const { replace, push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data);
      toast.success("Logged in successfully");
      // replace(Routes.Home);
      push('/chat')
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      console.error(e);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Input
          id="emailOrUsername"
          type="text"
          label="Email / Username"
          error={errors.emailOrUsername?.message}
          placeholder="m@example.com"
          {...register("emailOrUsername")}
        />
        <Input
          id="password"
          label="Password"
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />
        <Button isLoading={isSubmitting} type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href={Routes.SignUp} className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
};

export default SignInForm;
