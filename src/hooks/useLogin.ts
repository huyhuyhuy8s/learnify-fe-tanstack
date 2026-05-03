import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { useAuthStore } from "@/store/authStore";
import isNil from "lodash/isNil";
import { LOGIN_MUTATION, CURRENT_USER_QUERY } from "@/graphql/mutations";
import type { AuthResponse, LoginInput, UserReturn } from "@/gql/graphql";

async function loginRequest(variables: { data: LoginInput }) {
  const response = await graphqlClient.request<{ login: AuthResponse }>(
    LOGIN_MUTATION,
    variables
  );

  if (!response.login.success) {
    throw new Error(response.login.message || "Login failed");
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

  return { login: response.login, user: currentUser.users[0] };
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setAuth(data.user);
    },
  });
}
