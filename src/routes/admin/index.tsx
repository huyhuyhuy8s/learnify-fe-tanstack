import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin | Learnify" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div>
      <h3>Admin Panel</h3>
    </div>
  );
}
