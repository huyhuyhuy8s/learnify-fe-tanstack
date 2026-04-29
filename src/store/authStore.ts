import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserResponse } from "@/gql/graphql";

export type TAuthState = {
  token: string | null;
  refreshToken: string | null;
  user: UserResponse | null;
  isAuthenticated: boolean;
  isRefreshing: boolean;
  setAuth: (
    token: string,
    refreshToken: string | null,
    user: UserResponse | null
  ) => void;
  logout: () => void;
  setRefreshing: (isRefreshing: boolean) => void;
};

export const useAuthStore = create<TAuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isRefreshing: false,
      setAuth: (token, refreshToken, user) =>
        set({ token, refreshToken, user, isAuthenticated: true }),
      logout: () =>
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          isRefreshing: false,
        }),
      setRefreshing: (isRefreshing) => set({ isRefreshing }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;

  return payload.exp * 1000 < Date.now();
};
