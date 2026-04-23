import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { CURRENT_USER_QUERY } from "@/graphql/mutations";
import type { UserReturn, UserResponse } from "@/gql/graphql";

async function fetchCurrentUser(): Promise<UserResponse | null> {
  const response = await graphqlClient.request<{ currentUser: UserReturn }>(
    CURRENT_USER_QUERY
  );

  if (response.currentUser.isSuccess && response.currentUser.users.length > 0) {
    return response.currentUser.users[0];
  }
  return null;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: false,
  });
}
