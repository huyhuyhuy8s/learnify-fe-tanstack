import { GraphQLClient } from "graphql-request";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { logoutFn } from "@/server/auth";

const GRAPHQL_ENDPOINT =
  import.meta.env.VITE_GRAPHQL_ENDPOINT ||
  "https://learnify-be.onrender.com/graphql";

async function isGraphqlUnauthorized(res: Response) {
  try {
    const clone = res.clone();
    const body = await clone.json();
    if (
      body?.errors?.some(
        (e: any) =>
          e?.extensions?.code === "UNAUTHENTICATED" ||
          e?.extensions?.code === "UnauthorizedException" ||
          e?.message?.includes("Unauthorized") ||
          e?.message?.includes("No token provided")
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
  const response = await fetch(input, fetchInit);

  if (
    (response.status === 401 && typeof window !== "undefined") ||
    (await isGraphqlUnauthorized(response))
  ) {
    await logoutFn();
    useAuthStore.getState().logout();
    toast.error("Session expired. Please log in again.");
    window.location.href = "/auth/log-in";
    return Promise.reject(new Error("Session expired"));
  }

  return response;
};

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  fetch: customFetch,
});
