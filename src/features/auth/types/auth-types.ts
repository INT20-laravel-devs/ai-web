import { z } from "zod";

export const signUpSchema = z.object({
  nickname: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
  emailOrNickname: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;

export interface EmailResendRequest {
  email: string;
}

export type UserRole = "PLAYER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  nickname: string;
  role: UserRole;
  avatarLink: string | null;
}
