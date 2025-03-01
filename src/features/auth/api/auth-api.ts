import { API_URL } from "@/constants/global";
import {
  type EmailResendRequest,
  type SignInFormData,
  type SignInResponse,
  type SignUpFormData,
  type User,
} from "@/features/auth/types/auth-types";
import { type ErrorResponse } from "@/types/api";
import { generateAuthHeaders } from "@/utils/api-utils";

export const signIn = async (data: SignInFormData) => {
  try {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    const result = (await response.json()) as SignInResponse;
    localStorage.setItem("token", result.token);
  } catch (e) {
    throw e;
  }
};

export const signUp = async (data: SignUpFormData) => {
  try {
    const response = await fetch(`${API_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};

export const emailResend = async (data: EmailResendRequest) => {
  try {
    const response = await fetch(`${API_URL}/auth/email-resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};
export const emailApprove = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/email-approve/${token}`, {
      method: "POST",
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};

export const getMe = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: generateAuthHeaders(),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as User;
  } catch (e) {
    throw e;
  }
};
