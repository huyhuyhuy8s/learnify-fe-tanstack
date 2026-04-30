import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/learner/lessons")({
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
  return <Outlet />;
}
