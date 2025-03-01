import { create } from "zustand/react";

const user = {
  nickname: "Jane Doe",
  email: "testmail@gmail.com",
  avatarLink: "https://avatars.dicebear.com/api/avataaars/jane-doe.svg",
};

export type User = typeof user;

interface AuthStore {
  user: User | null;
  isLoading: boolean;
}

const useAuthStore = create<AuthStore>(() => ({
  user: null,
  isLoading: true,
}));

export const hydrateAuthStore = (initialState: User | null) => {
  useAuthStore.setState({ user: initialState, isLoading: false });
};

export default useAuthStore;
