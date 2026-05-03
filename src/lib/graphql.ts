import { GraphQLClient } from "graphql-request";
import { useAuthStore } from "@/store/authStore";
import { REFRESH_TOKEN_MUTATION } from "@/graphql/mutations";
import { toast } from "sonner";

const GRAPHQL_ENDPOINT = "https://learnify-be.onrender.com/graphql";
// const GRAPHQL_ENDPOINT = "http://localhost:10000/graphql";

let refreshPromise: Promise<boolean> | null = null;

type TGraphQLError = {
  extensions?: { code?: string };
  message?: string;
};

async function isGraphqlUnauthorized(res: Response): Promise<boolean> {
  try {
    const clone = res.clone();
    const body = await clone.json();
    const errors = body?.errors as TGraphQLError[] | undefined;
    return (
      errors?.some(
        (e) =>
          e?.extensions?.code === "UNAUTHENTICATED" ||
          e?.extensions?.code === "UnauthorizedException" ||
          e?.message?.includes("Unauthorized") ||
          e?.message?.includes("No token provided")
      ) ?? false
    );
  } catch {
    return false;
  }
}

const customFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const fetchInit = { ...init, credentials: "include" as RequestCredentials };

  let response = await fetch(input, fetchInit);

  const isUnauthorized =
    response.status === 401 || (await isGraphqlUnauthorized(response));

  if (isUnauthorized) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const refreshRes = await fetch(GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ query: REFRESH_TOKEN_MUTATION }),
          });

          const refreshData = await refreshRes.json();
          if (refreshData?.data?.refresh?.success) {
            return true;
          }
          return false;
        } catch {
          return false;
        } finally {
          refreshPromise = null;
        }
      })();
    }
    const refreshSuccess = await refreshPromise;
    if (refreshSuccess) {
      response = await fetch(input, fetchInit);
    } else {
      useAuthStore.getState().logout();
      window.location.href = "/login";
      toast.error("Session expired. Please login again.");
      return Promise.reject(new Error("Session expired. Please login again."));
    }
  }

  return response;
};

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  fetch: customFetch,
});
