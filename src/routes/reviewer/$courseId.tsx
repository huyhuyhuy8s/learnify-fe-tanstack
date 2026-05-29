import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  type MockCourseDetail,
  type MockLesson,
  type TReviewStatus,
} from "@/mock/reviewer-courses";
import {
  useGetCoursesById,
  usePublishCourse,
  useRejectCourse,
} from "@/hooks/useCourses";
import CourseDetailHeader from "./-components/CourseDetailHeader";
import LessonSyllabus from "./-components/CourseSyllybus";
import ReviewActionPanel from "./-components/ReviewActionPanel";
import TetrisLoader from "@/components/TetrisLoader";
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
  const navigate = useNavigate();

  const { data: rawData, isLoading } = useGetCoursesById(courseId);
  const { mutate: publishCourse } = usePublishCourse();
  const { mutate: rejectCourse } = useRejectCourse();

  if (isLoading) return <TetrisLoader />;

  const backendData = rawData as any;
  const courseData = backendData?.getCourseById;
  const lessonsData = backendData?.getLessonsByCourseId?.lessons || [];

  if (!courseData) {
    return (
      <div className="course-detail-page course-detail-page--not-found">
        <p className="course-detail-page__not-found-text">
          Course <strong>#{courseId}</strong> was not found or no data
          available.
        </p>
      </div>
    );
  }

  const mappedLessons: MockLesson[] = lessonsData.map(
    (lesson: any, index: number) => ({
      id: lesson.id,
      lessonName: lesson.lessonName,
      abstract: lesson.abstract || "No abstract available.",
      order: index + 1,
    })
  );

  const course: MockCourseDetail = {
    id: courseData.id,
    title: courseData.courseName,
    abstract: courseData.abstract || "No description available.",
    keyLearnings: courseData.keyLearnings || [],
    status: courseData.status as TReviewStatus,

    instructorName: "Unknown Instructor",
    creatorName: "Unknown Creator",
    dateSubmitted: courseData.createdAt
      ? new Date(courseData.createdAt).toLocaleDateString()
      : "Unknown Date",
    thumbnail: "https://placehold.co/40x40/4f46e5/ffffff?text=RC",
    lessons: mappedLessons,
  };

  const handleApprove = () => {
    publishCourse(courseId, {
      onSuccess: () => navigate({ to: "/reviewer/approved" }),
    });
  };

  const handleReject = () => {
    rejectCourse(courseId, {
      onSuccess: () => navigate({ to: "/reviewer/rejected" }),
    });
  };

  return (
    <div className="course-detail-page">
      <div className="course-detail-page__content">
        <CourseDetailHeader course={course} />
        <LessonSyllabus lessons={course.lessons} />
      </div>

      <ReviewActionPanel
        courseId={String(course.id)}
        status={course.status}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
