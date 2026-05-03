import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { CURRENT_USER_QUERY } from "@/graphql/mutations";
import type { UserReturn, UserResponse } from "@/gql/graphql";

async function fetchCurrentUser(): Promise<UserResponse | null> {
  try {
    const response = await graphqlClient.request<{ currentUser: UserReturn }>(
      CURRENT_USER_QUERY
    );

    if (
      response.currentUser.isSuccess &&
      response.currentUser.users.length > 0
    ) {
      return response.currentUser.users[0] || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return null;
  }
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: true,
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
