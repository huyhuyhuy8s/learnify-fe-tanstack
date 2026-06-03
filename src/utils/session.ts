import { useSession } from "@tanstack/react-start/server";
import type { TSessionUser } from "@/router";

export type TSessionData = {
  user?: TSessionUser;
  loggedInAt?: number;
};

export function useAppSession() {
  return useSession<TSessionData>({
    name: "learnify-fe-session",
    password: process.env.SESSION_SECRET!,
    cookie: {
      secure:
        process.env.SECURE_COOKIE === "true" ||
        (import.meta.env.PROD && process.env.SECURE_COOKIE !== "false"),
      sameSite: "lax",
      httpOnly: true,
      maxAge: 45 * 60,
      path: "/",
    },
  });
}
