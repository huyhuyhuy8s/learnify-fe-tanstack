import { ClientError, GraphQLClient } from "graphql-request";
import { useAuthStore } from "@/store/authStore";
import { REFRESH_TOKEN_MUTATION } from "@/graphql/mutations";

const GRAPHQL_ENDPOINT = "https://learnify-be.onrender.com/graphql";

let refreshPromise: Promise<unknown> | null = null;

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: () => {
    const token = useAuthStore.getState().token;
    return {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },
  responseMiddleware: async (response) => {
    if (response instanceof ClientError) {
      const status = response.response.status;
      if (status === 401) {
        const { refreshToken, isRefreshing, logout } = useAuthStore.getState();

        if (!refreshToken || isRefreshing) {
          logout();
          return;
        }
        if (!refreshPromise) {
          refreshPromise = fetch(GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: REFRESH_TOKEN_MUTATION,
              variables: { refreshToken },
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data?.refreshToken?.success) {
                const { setAuth, user } = useAuthStore.getState();
                setAuth(
                  data.data.refreshToken.accessToken,
                  data.data.refreshToken.refreshToken,
                  user
                );
                return data.data.refreshToken;
              } else {
                logout();
                throw new Error("Failed to refresh token");
              }
            })
            .finally(() => {
              refreshPromise = null;
            });
        }
        await refreshPromise;
      }
    }
  },
});

export function getAuthenticatedClient(token: string | null) {
  return new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    responseMiddleware: async (response) => {
      if (response instanceof ClientError) {
        const status = response.response.status;
        if (status === 401) {
          useAuthStore.getState().logout();
        }
      }
    },
  });
}
