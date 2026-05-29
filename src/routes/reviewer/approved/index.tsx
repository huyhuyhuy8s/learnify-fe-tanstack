import { createFileRoute } from "@tanstack/react-router";
import {
  type TReviewerCourse,
  type TReviewStatus,
} from "@/mock/reviewer-courses";
import ReviewerTable from "../-components/CourseTable";
import { useGetCoursesStatus } from "@/hooks/useCourses";
import TetrisLoader from "@/components/TetrisLoader";

export const Route = createFileRoute("/reviewer/approved/")({
  head: () => ({
    meta: [{ title: "Published Reviews | Content Reviewer | Learnify" }],
  }),
  component: ReviewerApprovedPage,
});

function ReviewerApprovedPage() {
  const { data, isLoading } = useGetCoursesStatus("Published");

  if (isLoading) return <TetrisLoader />;

  const isBackendSuccess = data?.isSuccess && Array.isArray(data.courses);

  const displayCourses: TReviewerCourse[] = isBackendSuccess
    ? data.courses.map((course) => ({
        id: course.id,
        title: course.courseName,
        instructorName: "Unknown Instructor",
        dateSubmitted: new Date(course.createdAt).toLocaleDateString(),
        status: "Published" as TReviewStatus,
        thumbnail: "https://placehold.co/40x40/16a34a/ffffff?text=PB",
      }))
    : [];

  return (
    <ReviewerTable title="Published Course Reviews" courses={displayCourses} />
  );
}
