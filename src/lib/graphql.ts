import { GraphQLClient } from "graphql-request";
import { useAuthStore } from "@/store/authStore";

const GRAPHQL_ENDPOINT = "https://learnify-be.onrender.com/graphql";

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: () => {
    const token = useAuthStore.getState().token;
    return {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },
});

export function getAuthenticatedClient(token: string | null) {
  return new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
