import { create } from "zustand";
import type { UserResponse } from "@/gql/graphql";

export type TAuthState = {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAuth: (user: UserResponse | null) => void;
  logout: () => void;
  setHydrated: (hydrated: boolean) => void;
};

export const useAuthStore = create<TAuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isHydrated: false,
  setAuth: (user) => set({ user, isAuthenticated: !!user }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
  setHydrated: (hydrated) => set({ isHydrated: hydrated }),
}));
