import { redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import type { TRole } from "@/types/global";
import type { TSessionUser } from "@/router";

export type TAuthState = {
  user: TSessionUser | null;
  isAuthenticated: boolean;
  expired?: boolean;
};

export function requireGuest(auth: TAuthState) {
  if (auth.isAuthenticated) {
    throw redirect({ to: "/learner" });
  }
}

export function requireAuth(auth: TAuthState) {
  if (!auth.isAuthenticated) {
    if (auth.expired && typeof window !== "undefined") {
      toast.error("Session expired. Please log in again.");
    }
    throw redirect({ to: "/auth/log-in" });
  }
}

export function requireRole(...roles: TRole[]) {
  return (auth: TAuthState & { expired?: boolean }) => {
    requireAuth(auth);
    if (!auth.user?.role || !roles.includes(auth.user.role as TRole)) {
      throw redirect({ to: "/" });
    }
  };
}
