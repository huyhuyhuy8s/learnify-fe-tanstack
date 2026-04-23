import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/learner/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(auth)/learner/forgot-password"!</div>;
}
