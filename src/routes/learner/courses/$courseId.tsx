import { Activity, useMemo, useState } from "react";
import {
  createFileRoute,
  notFound,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { COLORS } from "@/styles/colors";
import NotFound from "@/components/NotFound";
import DecorationCard from "@/components/DecorationCard";
import TextButton from "@/components/TextButton";
import Card from "@/components/Card";
import CommentItem from "./-components/CommentItem";
import CommentForm from "./-components/CommentForm";
import {
  useCreateReview,
  useUserEnrollments,
  useCourseProgress,
  useEnrollCourse,
} from "@/hooks/useCourseDetail";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import type { TProgress, TStatusCard } from "@/types/global";
import { formatDate } from "@/utils";
import { MOCK_COMMENT } from "@/mock";
import TetrisLoader from "@/components/TetrisLoader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { courseQueryOptions } from "@/utils/courses";
import { logger } from "@/utils/logger";
import Empty from "@/components/Empty";
import ErrorScene from "@/components/ErrorScene";
import "./courseId.scss";

function CourseErrorComponent() {
  const router = useRouter();
  return (
    <ErrorScene>
      <ErrorScene.Header>
        <ErrorScene.Code errorCode={500} />
        <ErrorScene.Title>Server Error</ErrorScene.Title>
        <ErrorScene.Description>
          Something went wrong while loading this course. The server encountered
          an issue. Please try again or come back later.
        </ErrorScene.Description>
      </ErrorScene.Header>
      <ErrorScene.Content>
        <div className="error-scene__control">
          <TextButton
            text="Try Again"
            onClick={() => router.invalidate()}
            className="error-scene__btn"
            size="medium"
            icon="refresh"
          />
          <TextButton
            text="Go Back"
            onClick={() => window.history.back()}
            className="error-scene__btn error-scene__btn--secondary"
            size="medium"
            icon="arrow_back"
            type="outlined"
          />
        </div>
      </ErrorScene.Content>
    </ErrorScene>
  );
}

export const Route = createFileRoute("/learner/courses/$courseId")({
  loader: async ({ params: { courseId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      courseQueryOptions(courseId)
    );
    logger.debug("data", data);
    if (!data.getCourseById) throw notFound();
    return { title: data.getCourseById?.courseName };
  },
  head: () => ({
    meta: [{ title: "Course Details | Learnify" }],
  }),
  errorComponent: CourseErrorComponent,
  pendingComponent: TetrisLoader,
  notFoundComponent: NotFound,
  component: CourseComponent,
});

function CourseComponent() {
  const navigate = useNavigate();
  const { courseId } = Route.useParams();

  const currentUser = useAuthStore((state) => state.user);
  const userId = currentUser?.id;

  const { data } = useSuspenseQuery(courseQueryOptions(courseId));
  const { getCourseById, getLessonsByCourseId, getReviewsByCourse } = data;

  const createReview = useCreateReview();
  const enrollCourseMutation = useEnrollCourse();

  const { data: enrollments } = useUserEnrollments(userId);
  const { data: progressData } = useCourseProgress(userId, courseId);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const isEnrolled = useMemo(() => {
    if (!enrollments) return false;
    return enrollments.some((enrollment) => enrollment.courseId === courseId);
  }, [enrollments, courseId]);

  const currentProgressPercentage = useMemo(() => {
    if (
      !isEnrolled ||
      !progressData ||
      !progressData.isSuccess ||
      !progressData.progress
    ) {
      return 0;
    }
    const firstProgress = progressData.progress[0];
    if (!firstProgress) {
      return 0;
    }

    return firstProgress.percentage;
  }, [isEnrolled, progressData]);

  const lessonsDisplay = useMemo(() => {
    if (getLessonsByCourseId?.isSuccess) {
      return getLessonsByCourseId.lessons.map((lesson, idx) => {
        let status: "default" | "locked" | "completed" = "locked";
        let percentage: number = 0;

        if (isEnrolled) {
          if (progressData?.isSuccess && progressData.progress?.[0]) {
            const p = progressData.progress[0];
            if (idx < p.completedLessons) {
              status = "completed";
              percentage = 100;
            } else if (idx === p.completedLessons) {
              status = "default";
              percentage = p.percentage;
            } else {
              status = "locked";
            }
          } else {
            status = "default";
          }
        }

        return {
          id: lesson.id,
          typeSpecial: "lesson" as const,
          title: lesson.lessonName,
          description: lesson.abstract ?? "No description",
          duration: "45 mins",
          status,
          percentage,
        };
      });
    }
    return null;
  }, [getLessonsByCourseId, isEnrolled, progressData]);

  const commentDisplay = useMemo(() => {
    if (getReviewsByCourse?.isSuccess) {
      return getReviewsByCourse.reviews.map((review) => ({
        id: review.id,
        userName: review.user.username,
        time: formatDate(review.createdAt),
        rating: review.rating,
        content: review.content || "No description",
      }));
    }
    return MOCK_COMMENT;
  }, [getReviewsByCourse]);

  const courseDisplay = useMemo(() => {
    if (!getCourseById?.id) return null;
    let currentStatus = getCourseById.status as unknown as TStatusCard;
    if (!isEnrolled) {
      currentStatus = "locked";
    } else if (
      currentProgressPercentage > 0 &&
      currentProgressPercentage < 100
    ) {
      currentStatus = "inProgress";
    } else if (currentProgressPercentage === 100) {
      currentStatus = "completed";
    }

    return {
      title: getCourseById.courseName,
      status: currentStatus,
      listFeature: getCourseById.keyLearnings ?? [],
      percentage: currentProgressPercentage as TProgress,
    };
  }, [getCourseById, currentProgressPercentage, isEnrolled]);

  const handleEnrollCourse = () => {
    if (!userId) {
      toast.error("Please log in to enroll in this course");
      return;
    }
    enrollCourseMutation.mutate({ courseId, userId });
  };

  const handleLessonClick = (lessonId: string) => {
    if (!isEnrolled) {
      toast.warning(
        "You need to enroll in the course before accessing lessons!"
      );
      return;
    }
    navigate({
      to: "/learner/lessons/$lessonId",
      params: { lessonId },
    });
  };

  if (!courseDisplay) return <NotFound />;

  if (!lessonsDisplay)
    return (
      <Empty>
        <Empty.Header>
          <Empty.Media variant="icon">
            <span className="material-symbols-rounded">sell</span>
          </Empty.Media>
          <Empty.Title>No products found</Empty.Title>
          <Empty.Description>No products match your search</Empty.Description>
        </Empty.Header>
        <Empty.Content>
          <TextButton
            text="Create a course"
            icon="add"
            size="medium"
            onClick={() => {}}
          />
        </Empty.Content>
      </Empty>
    );

  return (
    <div className="course__container">
      <div className="course__item-list">
        <DecorationCard
          listBadge={
            <TextButton
              text="text"
              size="tiny"
              type="special"
              typeSpecial="course"
              backgroundColor={COLORS.navy300}
              color={COLORS.neutral100}
              onClick={() => {}}
            />
          }
          typeSpecial="course"
          title={courseDisplay.title}
          status={courseDisplay.status}
          listFeature={courseDisplay.listFeature}
          percentage={courseDisplay.percentage}
        />
        <div className="course__controller">
          {!isEnrolled && (
            <TextButton
              text={
                enrollCourseMutation.isPending
                  ? "Processing..."
                  : "Enroll Course"
              }
              size="small"
              icon="school"
              type="primary"
              typeSpecial="course"
              onClick={handleEnrollCourse}
              disabled={enrollCourseMutation.isPending}
            />
          )}

          <TextButton
            text="Send feedback"
            size="small"
            icon="add"
            type="outlined"
            typeSpecial="course"
            onClick={() => setShowCommentForm((prev) => !prev)}
          />
          <TextButton
            text="Show feedback"
            size="small"
            icon="feedback"
            type="outlined"
            typeSpecial="course"
            onClick={() => setShowComment((prev) => !prev)}
          />
        </div>

        <Activity mode={showCommentForm ? "visible" : "hidden"}>
          <CommentForm
            onSubmit={(rating, content) => {
              createReview.mutate(
                { courseId: courseId, rating, content },
                {
                  onSuccess: () => setShowCommentForm(false),
                }
              );
            }}
            onCancel={() => setShowCommentForm(false)}
            isLoading={createReview.isPending}
          />
        </Activity>
        <div className="course__list">
          {lessonsDisplay.map((lesson) => (
            <Card
              key={lesson.id}
              typeSpecial={lesson.typeSpecial}
              title={lesson.title}
              description={lesson.description}
              duration={lesson.duration}
              status={lesson.status}
              percentage={lesson.percentage}
              onClick={() => handleLessonClick(lesson.id)}
            />
          ))}
        </div>
      </div>
      <Activity mode={showComment ? "visible" : "hidden"}>
        <div className="course__comment">
          {commentDisplay.map((comment) => (
            <CommentItem
              key={comment.id}
              userName={comment.userName}
              time={comment.time}
              rating={comment.rating}
              content={comment.content}
            />
          ))}
        </div>
      </Activity>
    </div>
  );
}
