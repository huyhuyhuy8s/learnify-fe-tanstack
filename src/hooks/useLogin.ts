import { useMutation } from "@tanstack/react-query";
import { graphqlClient, getAuthenticatedClient } from "@/lib/graphql";
import { useAuthStore } from "@/store/authStore";
import { LOGIN_MUTATION, CURRENT_USER_QUERY } from "@/graphql/mutations";
import type {
  AuthResponse,
  LoginInput,
  UserResponse,
  UserReturn,
} from "@/gql/graphql";

async function loginRequest(variables: {
  data: LoginInput;
}): Promise<{ login: AuthResponse; user: UserResponse | null }> {
  const response = await graphqlClient.request<{ login: AuthResponse }>(
    LOGIN_MUTATION,
    variables
  );

  if (!response.login.success || !response.login.accessToken) {
    return { login: response.login, user: null };
  }

  const userResponse = await getAuthenticatedClient(
    response.login.accessToken
  ).request<{ currentUser: UserReturn }>(CURRENT_USER_QUERY);

  const user =
    userResponse.currentUser.isSuccess &&
    userResponse.currentUser.users.length > 0
      ? userResponse.currentUser.users[0]
      : null;

  return { login: response.login, user };
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      if (data.login.success && data.login.accessToken) {
        const refreshToken = data.login.refreshToken ?? null;
        setAuth(data.login.accessToken, refreshToken, data.user);
      }
    },
  });
}
