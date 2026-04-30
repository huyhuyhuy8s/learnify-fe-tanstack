import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserResponse } from "@/gql/graphql";

export type TAuthState = {
  user: UserResponse | null;
  isAuthenticated: boolean;
  setAuth: (user: UserResponse | null) => void;
  logout: () => void;
};

export const useAuthStore = create<TAuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => set({ user, isAuthenticated: !!user }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
