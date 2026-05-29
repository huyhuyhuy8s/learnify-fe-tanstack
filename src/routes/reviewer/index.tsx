import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reviewer/")({
  head: () => ({
    meta: [{ title: "Pending Reviews | Content Reviewer | Learnify" }],
  }),
  component: ReviewerPendingPage,
});

function ReviewerPendingPage() {
  return (
    <div>
      <h3>Pending Reviews</h3>
    </div>
  );
}
