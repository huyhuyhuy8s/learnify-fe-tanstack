import { create } from "zustand";
import type { UserResponse } from "@/gql/graphql";

export type ExtendedUser = UserResponse & {
  diamond?: number | null;
  currentSteak?: number | null;
};

export type TAuthState = {
  user: ExtendedUser | null;
  isAuthenticated: boolean;
  setAuth: (user: ExtendedUser | null) => void;
  logout: () => void;
};

export const useAuthStore = create<TAuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export const logout = () => useAuthStore.getState().logout();
export const setAuth = (user: ExtendedUser | null) =>
  useAuthStore.getState().setAuth(user);
