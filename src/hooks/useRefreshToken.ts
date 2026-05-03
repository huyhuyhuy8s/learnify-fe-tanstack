import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import {
  CURRENT_USER_QUERY,
  REFRESH_TOKEN_MUTATION,
} from "@/graphql/mutations";
import { useAuthStore } from "@/store/authStore";
import type { GenericResponse, UserReturn } from "@/gql/graphql";

async function refreshTokenRequest() {
  const response = await graphqlClient.request<{ refresh: GenericResponse }>(
    REFRESH_TOKEN_MUTATION
  );

  if (!response.refresh?.success) {
    throw new Error(response.refresh?.message || "Refresh token failed");
  }

  const userResponse = await graphqlClient.request<{ currentUser: UserReturn }>(
    CURRENT_USER_QUERY
  );

  const user = userResponse.currentUser.users?.[0] || null;

  if (!user) {
    throw new Error("Không thể lấy thông tin người dùng sau khi refresh");
  }

  return { refresh: response.refresh, user };
}

export function useRefreshToken() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: refreshTokenRequest,
    onSuccess: (data) => {
      setAuth(data.user);
    },
    onError: () => {
      logout();
    },
  });
}
