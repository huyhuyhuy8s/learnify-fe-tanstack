import { createFileRoute } from "@tanstack/react-router";
import {
  type TReviewerCourse,
  type TReviewStatus,
} from "@/mock/reviewer-courses";
import ReviewerTable from "../-components/CourseTable";
import { useGetCoursesStatus } from "@/hooks/useCourses";
import TetrisLoader from "@/components/TetrisLoader";

export const Route = createFileRoute("/reviewer/rejected/")({
  head: () => ({
    meta: [{ title: "Rejected Reviews | Content Reviewer | Learnify" }],
  }),
  component: ReviewerRejectedPage,
});

function ReviewerRejectedPage() {
  const { data, isLoading } = useGetCoursesStatus("Rejected");

  if (isLoading) return <TetrisLoader />;

  const isBackendSuccess = data?.isSuccess && Array.isArray(data.courses);

  const displayCourses: TReviewerCourse[] = isBackendSuccess
    ? data.courses.map((course) => ({
        id: course.id,
        title: course.courseName,
        instructorName: "Unknown Instructor",
        dateSubmitted: new Date(course.createdAt).toLocaleDateString(),
        status: "Rejected" as TReviewStatus,
        thumbnail: "https://placehold.co/40x40/dc2626/ffffff?text=RJ",
      }))
    : [];

  return (
    <ReviewerTable title="Rejected Course Reviews" courses={displayCourses} />
  );
}
