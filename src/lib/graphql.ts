import { GraphQLClient } from "graphql-request";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { logoutFn } from "@/server/auth";

const GRAPHQL_ENDPOINT =
  import.meta.env.VITE_GRAPHQL_ENDPOINT ||
  "https://learnify-be.onrender.com/graphql";

const customFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const fetchInit = { ...init, credentials: "include" as RequestCredentials };
  const response = await fetch(input, fetchInit);

  if (response.status === 401 && typeof window !== "undefined") {
    await logoutFn();
    useAuthStore.getState().logout();
    toast.error("Session expired. Please log in again.");
    window.location.href = "/learner/log-in";
    return Promise.reject(new Error("Session expired"));
  }

  return response;
};

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  fetch: customFetch,
});
