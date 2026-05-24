import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentUserFn } from "@/server/auth";

export const Route = createFileRoute("/learner/user/")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    if (!user?.id) throw redirect({ to: "/learner/dashboard" });
    throw redirect({
      to: "/learner/user/$userId",
      params: { userId: user.id },
    });
  },
  component: () => null,
});
