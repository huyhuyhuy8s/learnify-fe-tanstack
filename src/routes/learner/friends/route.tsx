import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentUserFn } from "@/server/auth";

export const Route = createFileRoute("/learner/friends")({
  beforeLoad: async ({ location }) => {
    const { user } = await getCurrentUserFn();
    if (!user)
      throw redirect({
        to: "/learner/log-in",
        search: { redirect: location.pathname },
      });
    return { user };
  },
  component: FriendsLayout,
});

function FriendsLayout() {
  return <Outlet />;
}
