import { createFileRoute } from "@tanstack/react-router";
import { MOCK_REVIEWER_COURSES } from "@/mock/reviewer-courses";
import ReviewerTable from "../-components/CourseTable";

export const Route = createFileRoute("/reviewer/rejected/")({
  head: () => ({
    meta: [{ title: "Rejected Reviews | Content Reviewer | Learnify" }],
  }),
  component: ReviewerRejectedPage,
});

const REJECTED_COURSES = MOCK_REVIEWER_COURSES.filter(
  (c) => c.status === "Rejected"
);

function ReviewerRejectedPage() {
  return (
    <ReviewerTable title="Rejected Course Reviews" courses={REJECTED_COURSES} />
  );
}
