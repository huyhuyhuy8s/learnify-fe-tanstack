import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql"; // Không cần getAuthenticatedClient nữa
import { GOOGLE_LOGIN_MUTATION, CURRENT_USER_QUERY } from "@/graphql/mutations";
import { useAuthStore } from "@/store/authStore";
import type { AuthResponse, UserReturn } from "@/gql/graphql";

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

  const user =
    userResponse.currentUser.isSuccess &&
    userResponse.currentUser.users.length > 0
      ? userResponse.currentUser.users[0]
      : null;

  if (!user) {
    throw new Error("Không thể lấy thông tin người dùng");
  }

  return { googleLogin: response.googleLogin, user };
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
