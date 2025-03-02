"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Routes } from "@/constants/navigation";
import { signUp } from "@/features/auth/api/auth-api";
import {
  type SignUpFormData,
  signUpSchema,
} from "@/features/auth/types/auth-types";
import { cn } from "@/utils/styles-utils";

interface SignUpFormProps {
  className?: string;
}

const SignUpForm = ({ className }: SignUpFormProps) => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUp(data);
      toast.success("Account created successfully");
      replace(Routes.SignIn);
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
        <h1 className="text-2xl font-bold">Створеня нового аккаунту</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Введіть свої дані для реєстрації
        </p>
      </div>
      <div className="grid gap-6">
        <Input
          id="name"
          label="Нікнейм"
          error={errors.username?.message}
          placeholder="John Doe"
          {...register("username")}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          error={errors.email?.message}
          placeholder="m@example.com"
          {...register("email")}
        />
        <Input
          id="password"
          label="Пароль"
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />
        <Button isLoading={isSubmitting} type="submit" className="w-full">
          Зареєструватися
        </Button>
      </div>
      <div className="text-center text-sm">
        Вже маєте аккаунт?{" "}
        <a href={Routes.SignIn} className="underline underline-offset-4">
          Увійти
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;
