import { createFileRoute } from "@tanstack/react-router";
import { MOCK_COURSE_DETAILS } from "@/mock/reviewer-courses";
import CourseDetailHeader from "./-components/CourseDetailHeader";
import LessonSyllabus from "./-components/CourseSyllybus";
import ReviewActionPanel from "./-components/ReviewActionPanel";
import "./$courseId.scss";

export const Route = createFileRoute("/reviewer/$courseId")({
  head: ({ params }) => ({
    meta: [
      {
        title: `Course #${params.courseId} | Content Reviewer | Learnify`,
      },
    ],
  }),
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { courseId } = Route.useParams();

  const course = MOCK_COURSE_DETAILS.find((c) => String(c.id) === courseId);

  if (!course) {
    return (
      <div className="course-detail-page course-detail-page--not-found">
        <p className="course-detail-page__not-found-text">
          Course <strong>#{courseId}</strong> was not found.
        </p>
      </div>
    );
  }

  const handleApprove = () => {
    alert(`Course "${course.title}" approved! (mock)`);
  };

  const handleReject = () => {
    alert(`Course "${course.title}" rejected! (mock)`);
  };

  return (
    <div className="course-detail-page">
      <div className="course-detail-page__content">
        <CourseDetailHeader course={course} />
        <LessonSyllabus lessons={course.lessons} />
      </div>

      <ReviewActionPanel
        courseId={course.id}
        status={course.status}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
