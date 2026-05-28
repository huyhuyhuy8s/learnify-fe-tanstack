import { createFileRoute } from "@tanstack/react-router";
import { MOCK_REVIEWER_COURSES } from "@/mock/reviewer-courses";
import ReviewerTable from "../-components/CourseTable";

export const Route = createFileRoute("/reviewer/approved/")({
  head: () => ({
    meta: [{ title: "Approved Reviews | Content Reviewer | Learnify" }],
  }),
  component: ReviewerApprovedPage,
});

const APPROVED_COURSES = MOCK_REVIEWER_COURSES.filter(
  (c) => c.status === "Approved"
);

function ReviewerApprovedPage() {
  return (
    <ReviewerTable title="Approved Course Reviews" courses={APPROVED_COURSES} />
  );
}
