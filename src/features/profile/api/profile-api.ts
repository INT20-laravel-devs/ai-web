import { API_URL } from "@/constants/global";
import { ErrorResponse } from "@/types/api";
import {
  generateAuthHeaders,
  generateAuthHeadersAvatar,
} from "@/utils/api-utils";

export const updateAvatar = async (formData: FormData) => {
  try {
    const res = await fetch(`${API_URL}/users/avatars/upload`, {
      method: "PATCH",
      body: formData,

      headers: generateAuthHeadersAvatar(),
    });

   
    if (!res.ok) {
      const error: ErrorResponse = await res.json();
      throw new Error(error.message);
    }

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const updateProfile = async (userId: string, username: string) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ username }),
      headers: generateAuthHeaders(),
    });

     if (!res.ok) {
       const error: ErrorResponse = await res.json();
       throw new Error(error.message);
     }

    return res;
  } catch (e) {
    console.error(e);
  }
};
