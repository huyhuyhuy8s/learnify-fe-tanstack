import { useAuthStore } from "@/store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/learner/user/$userId")({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (!isAuthenticated) {
      throw redirect({
        to: "/learner/sign-up",
        search: {
          redirect: "/learner/user/$userId",
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/learner/user/$userId"!</div>;
}
