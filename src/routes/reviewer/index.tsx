import { createFileRoute } from "@tanstack/react-router";
import { type TReviewerCourse } from "@/mock/reviewer-courses"; // Đã bỏ MOCK_REVIEWER_COURSES
import ReviewerTable from "./-components/CourseTable";
import TetrisLoader from "@/components/TetrisLoader";
import { useGetCoursesStatus } from "@/hooks/useCourses";

export const Route = createFileRoute("/reviewer/")({
  head: () => ({
    meta: [{ title: "Pending Reviews | Content Reviewer | Learnify" }],
  }),
  component: ReviewerPendingPage,
});

function ReviewerPendingPage() {
  const { data, isLoading } = useGetCoursesStatus("Pending");

  if (isLoading) return <TetrisLoader />;

  // Bỏ check > 0. Chỉ cần data.courses tồn tại là tính success
  const isBackendSuccess = data?.isSuccess && Array.isArray(data.courses);

  const displayCourses: TReviewerCourse[] = isBackendSuccess
    ? data.courses.map((course) => ({
        id: course.id,
        title: course.courseName,
        instructorName: "AI Instructor (Auto)",
        dateSubmitted: new Date(Number(course.createdAt)).toLocaleDateString(),
        status: "Pending",
        thumbnail: "https://via.placeholder.com/40",
      }))
    : []; // Trả về mảng rỗng thay vì fallback mock data

  return (
    <ReviewerTable title="Pending Course Reviews" courses={displayCourses} />
  );
}
