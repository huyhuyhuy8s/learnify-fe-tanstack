import { useMutation } from "@tanstack/react-query";
import { graphqlClient, getAuthenticatedClient } from "@/lib/graphql";
import { GOOGLE_LOGIN_MUTATION, CURRENT_USER_QUERY } from "@/graphql/mutations";
import { useAuthStore } from "@/store/authStore";
import type { AuthResponse, UserResponse, UserReturn } from "@/gql/graphql";

async function googleLoginRequest(idToken: string): Promise<{
  googleLogin: AuthResponse;
  user: UserResponse | null;
}> {
  const response = await graphqlClient.request<{ googleLogin: AuthResponse }>(
    GOOGLE_LOGIN_MUTATION,
    { idToken }
  );

  if (!response.googleLogin.success || !response.googleLogin.accessToken) {
    return { googleLogin: response.googleLogin, user: null };
  }

  const userResponse = await getAuthenticatedClient(
    response.googleLogin.accessToken
  ).request<{ currentUser: UserReturn }>(CURRENT_USER_QUERY);

  const user =
    userResponse.currentUser.isSuccess &&
    userResponse.currentUser.users.length > 0
      ? userResponse.currentUser.users[0] || null
      : null;

  return { googleLogin: response.googleLogin, user };
}

export function useGoogleLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: googleLoginRequest,
    onSuccess: (data) => {
      if (
        data.googleLogin.success &&
        data.googleLogin.accessToken &&
        data.user
      ) {
        const refreshToken = data.googleLogin.refreshToken ?? null;
        setAuth(data.googleLogin.accessToken, refreshToken, data.user, true);
      }
    },
  });
}
