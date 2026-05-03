import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import "./route.scss";
import TopNav from "@/components/TopNav";
import LeftNav from "@/components/LeftNav";
import { useAuthStore } from "@/store";
import { createLearnerHead } from "@/utils";

export const Route = createFileRoute("/learner_/lessons")({
  beforeLoad: ({ location }) => {
    const { isAuthenticated, isHydrated } = useAuthStore.getState();
    if (isHydrated && !isAuthenticated) {
      throw redirect({
        to: "/learner/log-in",
        search: { redirect: location.pathname },
      });
    }
  },
  component: RouteComponent,
  head: () => ({
    ...createLearnerHead("Lessons"),
  }),
});

function RouteComponent() {
  return (
    <section className="lesson-page">
      <TopNav fullWidth />
      <LeftNav compact />
      <Outlet />
    </section>
  );
}
