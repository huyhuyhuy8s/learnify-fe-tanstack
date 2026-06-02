import { createFileRoute, Outlet } from "@tanstack/react-router";
import GraphqlError from "@/components/GraphqlError";
import RouterComponentHolder from "@/components/RouterComponentHolder";
import { getCurrentUserFn } from "@/server/auth";
import { requireRole } from "@/utils/authGuard";
import AdminSidebar from "./-components/Sidebar";
import AdminHeader from "./-components/Header";
import "./style.scss";

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
  return (
    <div className="al">
      <AdminSidebar />
      <div className="al__right">
        <AdminHeader />
        <main className="al__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
