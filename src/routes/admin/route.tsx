import { createFileRoute, Outlet } from "@tanstack/react-router";
import AdminSidebar from "./-components/Sidebar";
import AdminHeader from "./-components/Header";
import "./style.scss";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Portal | Learnify" }],
  }),
  component: AdminLayout,
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
