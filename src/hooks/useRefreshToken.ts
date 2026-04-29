import type { AuthResponse, UserResponse } from "@/gql/graphql";
import {
  CURRENT_USER_QUERY,
  REFRESH_TOKEN_MUTATION,
} from "@/graphql/mutations";
import { graphqlClient } from "@/lib/graphql";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

async function refreshTokenRequest(refreshToken: string): Promise<{
  refreshToken: AuthResponse;
  user: UserResponse | null;
}> {
  const response = await graphqlClient.request<{ refreshToken: AuthResponse }>(
    REFRESH_TOKEN_MUTATION,
    { refreshToken }
  );

  if (!response.refreshToken.success || !response.refreshToken.accessToken) {
    return { refreshToken: response.refreshToken, user: null };
  }

  const userResponse = await graphqlClient.request(CURRENT_USER_QUERY);

  const user = userResponse.currentUser.users?.[0] || null;

  return { refreshToken: response.refreshToken, user };
}

export function useRefreshToken() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: refreshTokenRequest,
    onSuccess: (data) => {
      if (
        data.refreshToken.success &&
        data.refreshToken.accessToken &&
        data.user
      ) {
        const newRefreshToken = data.refreshToken.refreshToken ?? null;
        setAuth(data.refreshToken.accessToken, newRefreshToken, data.user);
      }
    },
    onError: () => {
      logout();
    },
  });
}
