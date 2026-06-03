import { GraphQLClient } from "graphql-request";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { logoutFn } from "@/server/auth";

const GRAPHQL_ENDPOINT =
  import.meta.env.VITE_GRAPHQL_ENDPOINT ||
  "https://learnify-be.onrender.com/graphql";

const AUTH_ERROR_CODES = ["UnauthorizedException", "UNAUTHENTICATED"];

const handleAuthError = async () => {
  if (typeof window === "undefined") return;
  await logoutFn();
  useAuthStore.getState().logout();
  toast.error("Session expired. Please log in again.");
  window.location.href = "/auth/log-in";
};

const isAuthErrorResponse = async (response: Response): Promise<boolean> => {
  try {
    const cloned = response.clone();
    const body: { errors?: Array<{ extensions?: { code?: string } }> } =
      await cloned.json();
    return !!body.errors?.some((e) =>
      AUTH_ERROR_CODES.includes(e?.extensions?.code ?? "")
    );
  } catch {
    return false;
  }
};

const customFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const fetchInit = { ...init, credentials: "include" as RequestCredentials };
  const response = await fetch(input, fetchInit);

  if (typeof window !== "undefined") {
    if (response.status === 401) {
      await handleAuthError();
      return Promise.reject(new Error("Session expired"));
    }

    if (await isAuthErrorResponse(response)) {
      await handleAuthError();
      return Promise.reject(new Error("Session expired"));
    }
  }

  return response;
};

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  fetch: customFetch,
});
