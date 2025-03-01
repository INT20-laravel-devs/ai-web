import { type Dispatch, type SetStateAction } from "react";

import { useChatStore } from "@/store/use-chat-store";

export const adaptSetInputMessage = (
  setInputMessage: (message: string) => void,
): Dispatch<SetStateAction<string>> => {
  return (value) => {
    if (typeof value === "function") {
      const prevValue = useChatStore.getState().inputMessage;
      setInputMessage(value(prevValue));
    } else {
      setInputMessage(value);
    }
  };
};
