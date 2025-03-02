import { API_URL } from "@/constants/global";
import { ErrorResponse } from "@/types/api";
import { generateAuthHeaders } from "@/utils/api-utils";

export const loginFiceAdvisor = async (username: string, password: string) => {
  try {
    const res = await fetch(`${API_URL}/ficeadvisor`, {
      method: "POST",
      headers: generateAuthHeaders(),
      body: JSON.stringify({ username, password }),
    });


    if (!res.ok) {
      const error: ErrorResponse = await res.json();
      throw new Error(error.message);
    }

    return res;
  } catch (e) {
    console.error("FICE Advisor login error:", e);
    throw e;
  }
};
