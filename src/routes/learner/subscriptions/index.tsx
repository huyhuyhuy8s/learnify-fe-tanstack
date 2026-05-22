import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/learner/subscriptions/")({
  component: SubscriptionComponent,
});

function SubscriptionComponent() {
  return <div className="subscriptions"></div>;
}
