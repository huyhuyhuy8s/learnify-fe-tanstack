import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { useAuthStore } from "@/store/authStore";
import { LOGIN_MUTATION, CURRENT_USER_QUERY } from "@/graphql/mutations";
import type { AuthResponse, LoginInput, UserReturn } from "@/gql/graphql";

async function loginRequest(variables: { data: LoginInput }) {
  const response = await graphqlClient.request<{ login: AuthResponse }>(
    LOGIN_MUTATION,
    variables
  );

  if (!response.login.success) {
    throw new Error(response.login.message || "Đăng nhập thất bại");
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
    throw new Error("Không lấy được thông tin người dùng");
  }

  return { login: response.login, user };
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
