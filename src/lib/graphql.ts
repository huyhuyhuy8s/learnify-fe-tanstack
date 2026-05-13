import { GraphQLClient } from "graphql-request";
import { useAuthStore } from "@/store/authStore";
import { REFRESH_TOKEN_MUTATION } from "@/graphql/mutations";
import { toast } from "sonner";

const GRAPHQL_ENDPOINT = "https://learnify-be.onrender.com/graphql";
// const GRAPHQL_ENDPOINT = "http://localhost:10000/graphql";

let refreshPromise: Promise<boolean> | null = null;

async function isGraphqlUnauthorized(res: Response) {
  try {
    const clone = res.clone();
    const body = await clone.json();
    if (
      body?.errors?.some(
        (e: { extensions?: { code?: string }; message?: string }) =>
          e?.extensions?.code === "UNAUTHENTICATED" ||
          e?.extensions?.code === "UnauthorizedException" ||
          e?.message?.includes("Unauthorized") ||
          e?.message?.includes("No token provided") ||
          e?.message?.includes("Invalid token")
      )
    ) {
      return true;
    }
    return false;
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
    let currentRefreshPromise = refreshPromise;
    if (!currentRefreshPromise) {
      currentRefreshPromise = (async () => {
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
      refreshPromise = currentRefreshPromise;
    }
    const refreshSuccess = await currentRefreshPromise;
    if (refreshSuccess) {
      response = await fetch(input, fetchInit);
    } else {
      if (typeof window !== "undefined") {
        useAuthStore.getState().logout();
        toast.error("Session expired. Please log in again.");
        window.location.href = "/learner/log-in";
      }
      return Promise.reject(new Error("Session expired. Please log in again."));
    }
  }

  return response;
};

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  fetch: customFetch,
});
