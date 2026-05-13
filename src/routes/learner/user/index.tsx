import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store";

export const Route = createFileRoute("/learner/user/")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (!user?.id) throw redirect({ to: "/learner/dashboard" });
    throw redirect({
      to: "/learner/user/$userId",
      params: { userId: user.id },
    });
  },
  component: () => null,
});
