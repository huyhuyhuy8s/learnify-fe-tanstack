import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/learner/roadmaps")({
  component: RoadmapsLayout,
});

function RoadmapsLayout() {
  return <Outlet />;
}
