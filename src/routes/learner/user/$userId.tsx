import { createFileRoute, redirect } from "@tanstack/react-router";
import type { RouterContext } from "@/router";

export const Route = createFileRoute("/learner/user/$userId")({
  beforeLoad: ({ context, params }) => {
    const auth = (context as RouterContext).auth;

    if (!auth?.isAuthenticated) {
      throw redirect({
        to: "/learner/sign-up",
        search: {
          redirect: `/learner/user/${params.userId}`,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/learner/user/$userId"!</div>;
}
