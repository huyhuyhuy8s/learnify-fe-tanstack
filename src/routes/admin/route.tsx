import { createFileRoute, Outlet } from "@tanstack/react-router";
import GraphqlError from "@/components/GraphqlError";
import RouterComponentHolder from "@/components/RouterComponentHolder";
import { getCurrentUserFn } from "@/server/auth";
import { requireRole } from "@/utils/authGuard";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    requireRole("admin")({ user, isAuthenticated: !!user });
  },
  head: () => ({
    meta: [{ title: "Admin | Learnify" }],
  }),
  component: AdminLayout,
  errorComponent: ({ error }) => (
    <RouterComponentHolder children={<GraphqlError error={error} />} />
  ),
});

function AdminLayout() {
  return <Outlet />;
}
