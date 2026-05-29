import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getCurrentUserFn } from "@/server/auth";
import { requireRole } from "@/utils/authGuard";

export const Route = createFileRoute("/reviewer")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    requireRole("reviewer", "admin")({ user, isAuthenticated: !!user });
  },
  head: () => ({
    meta: [{ title: "Content Reviewer | Learnify" }],
  }),
  component: ReviewerLayout,
});

function ReviewerLayout() {
  return <Outlet />;
}
