import { getCurrentUserFn } from "@/server/auth";
import { createLearnerHead } from "@/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/learner/courses/")({
  beforeLoad: async ({ location }) => {
    const { user } = await getCurrentUserFn();
    if (!user)
      throw redirect({
        to: "/auth/log-in",
        search: { redirect: location.pathname },
      });
  },
  head: () => createLearnerHead("Courses"),
});
