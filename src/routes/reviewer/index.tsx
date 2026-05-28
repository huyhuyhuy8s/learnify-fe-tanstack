import { createFileRoute } from "@tanstack/react-router";
import { MOCK_REVIEWER_COURSES } from "@/mock/reviewer-courses";
import ReviewerTable from "./-components/CourseTable";

export const Route = createFileRoute("/reviewer/")({
  head: () => ({
    meta: [{ title: "Pending Reviews | Content Reviewer | Learnify" }],
  }),
  component: ReviewerPendingPage,
});

const PENDING_COURSES = MOCK_REVIEWER_COURSES.filter(
  (c) => c.status === "Pending"
);

function ReviewerPendingPage() {
  return (
    <ReviewerTable title="Pending Course Reviews" courses={PENDING_COURSES} />
  );
}
