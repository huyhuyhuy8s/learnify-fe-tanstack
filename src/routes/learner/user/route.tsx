import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/learner/user")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/learner/user"!</div>;
}
