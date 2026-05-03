import { create } from "zustand";
import type { UserResponse } from "@/gql/graphql";

const STORAGE_KEY = "auth-storage";
const TTL_MS = 3 * 24 * 60 * 60 * 1000;

function persistUser(user: UserResponse | null) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user, cachedAt: Date.now() })
    );
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

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
  setAuth: (user) => {
    persistUser(user);
    set({ user, isAuthenticated: !!user });
  },
  logout: () => {
    persistUser(null);
    set({ user: null, isAuthenticated: false });
  },
  setHydrated: (hydrated) => set({ isHydrated: hydrated }),
}));

export const logout = () => useAuthStore.getState().logout();
export const setAuth = (user: UserResponse | null) =>
  useAuthStore.getState().setAuth(user);
export const setHydrated = (hydrated: boolean) =>
  useAuthStore.getState().setHydrated(hydrated);
