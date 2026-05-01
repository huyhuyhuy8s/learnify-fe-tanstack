import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import "./route.scss";
import TopNav from "@/components/TopNav";
import LeftNav from "@/components/LeftNav";
import { useAuthStore } from "@/store";

export const Route = createFileRoute("/learner_/lessons")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Lessons - Learnify",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isRefreshing = useAuthStore((state) => state.isRefreshing);
  const navigate = useNavigate();

  if (!isAuthenticated && !isRefreshing) {
    navigate({ to: "/learner/log-in" });
  }

  return (
    <section className="lesson-page">
      <TopNav fullWidth />
      <LeftNav compact />
      <Outlet />
    </section>
  );
}
