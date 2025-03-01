import { create } from "zustand/react";

import { type User } from "@/features/auth/types/auth-types";

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: true,
}));

export const hydrateAuthStore = (initialState: User | null) => {
  useAuthStore.setState({ user: initialState, isLoading: false });
};

export default useAuthStore;
