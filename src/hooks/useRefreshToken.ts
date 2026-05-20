import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { useRouter } from "@tanstack/react-router";
import { REFRESH_TOKEN_MUTATION } from "@/graphql/mutations";
import { useAuthStore } from "@/store/authStore";
import type { GenericResponse } from "@/gql/graphql";

async function refreshTokenRequest() {
  const response = await graphqlClient.request<{ refresh: GenericResponse }>(
    REFRESH_TOKEN_MUTATION
  );

  if (!response.refresh?.success) {
    throw new Error(response.refresh?.message || "Refresh token failed");
  }

  return response.refresh;
}

export function useRefreshToken() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: refreshTokenRequest,
    onSuccess: async () => {
      await router.invalidate();
    },
    onError: () => {
      logout();
    },
  });
}
