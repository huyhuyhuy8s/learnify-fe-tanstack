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
      secure: import.meta.env.PROD,
      sameSite: "lax",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    },
  });
}
