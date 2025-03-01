import { API_URL } from "@/constants/global";
import { type ChatBody } from "@/features/chat/types/chat-types";
import type { ErrorResponse } from "@/types/api";
import { generateAuthHeaders } from "@/utils/api-utils";

export const createChat = async () => {
  try {
    const response = await fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: generateAuthHeaders(),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as ChatBody;
  } catch (e) {
    throw e;
  }
};

export const getChats = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/chats`, {
      method: "GET",
      headers: generateAuthHeaders(),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as ChatBody[];
  } catch (e) {
    throw e;
  }
};
