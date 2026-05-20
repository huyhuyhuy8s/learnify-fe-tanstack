import { create } from "zustand";
import type { TSessionUser } from "@/router";

export type TAuthState = {
  user: TSessionUser | null;
  isAuthenticated: boolean;
  setAuth: (user: TSessionUser | null) => void;
  logout: () => void;
};

export const useAuthStore = create<TAuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
