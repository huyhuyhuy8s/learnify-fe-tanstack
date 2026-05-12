import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql"; // No longer need getAuthenticatedClient
import { GOOGLE_LOGIN_MUTATION, CURRENT_USER_QUERY } from "@/graphql/mutations";
import { useAuthStore } from "@/store/authStore";
import type { AuthResponse, UserReturn } from "@/gql/graphql";
import isNil from "lodash/isNil";

async function googleLoginRequest(idToken: string) {
  const response = await graphqlClient.request<{ googleLogin: AuthResponse }>(
    GOOGLE_LOGIN_MUTATION,
    { idToken }
  );

  if (!response.googleLogin.success) {
    throw new Error(response.googleLogin.message || "Google Login failed");
  }

  const userResponse = await graphqlClient.request<{ currentUser: UserReturn }>(
    CURRENT_USER_QUERY
  );

  const currentUser = userResponse.currentUser;

  if (
    !currentUser.isSuccess ||
    currentUser.users.length <= 0 ||
    isNil(currentUser.users[0])
  ) {
    throw new Error("Failed to fetch user data after login");
  }

  return { login: response.googleLogin, user: currentUser.users[0] };
}

export function useGoogleLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: googleLoginRequest,
    onSuccess: (data) => {
      setAuth(data.user);
    },
  });
}
