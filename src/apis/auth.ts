import { CURRENT_USER_QUERY } from "@/graphql/mutations";

export const fetchCurrentUser = async (serverCookieHeader?: string) => {
  try {
    const endpoint =
      import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (serverCookieHeader) {
      headers["Cookie"] = serverCookieHeader;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({ query: CURRENT_USER_QUERY }),
    });

    const { data, errors } = await response.json();

    if (errors || !data?.currentUser?.isSuccess) {
      return null;
    }
    return data.currentUser.users[0];
  } catch (error) {
    console.error("Lỗi khi fetch current user:", error);
    return null;
  }
};
