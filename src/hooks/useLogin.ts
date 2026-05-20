import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { useRouter } from "@tanstack/react-router";
import { LOGIN_MUTATION } from "@/graphql/mutations";
import type { AuthResponse, LoginInput } from "@/gql/graphql";

async function loginRequest(variables: { data: LoginInput }) {
  const response = await graphqlClient.request<{ login: AuthResponse }>(
    LOGIN_MUTATION,
    variables
  );

  if (!response.login.success) {
    throw new Error(response.login.message || "Login failed");
  }

  return response.login;
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: async () => {
      await router.invalidate();
    },
  });
}
