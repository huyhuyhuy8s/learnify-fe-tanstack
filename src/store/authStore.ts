import { create } from "zustand";
import type { UserResponse } from "@/gql/graphql";

const STORAGE_KEY = "auth-storage";

function getPersistedUser(): UserResponse | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed.user ?? null;
  } catch {
    return null;
  }
}

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

export const useAuthStore = create<TAuthState>()((set) => {
  const initialUser = getPersistedUser();
  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
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
  };
});

export const logout = () => useAuthStore.getState().logout();
export const setAuth = (user: UserResponse | null) =>
  useAuthStore.getState().setAuth(user);
export const setHydrated = (hydrated: boolean) =>
  useAuthStore.getState().setHydrated(hydrated);
