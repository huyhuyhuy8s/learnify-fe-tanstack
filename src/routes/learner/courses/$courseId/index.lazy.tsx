import Card from "@/components/Card";
import DecorationCard from "@/components/DecorationCard";
import Empty from "@/components/Empty";
import Icon from "@/components/Icon";
import NotFound from "@/components/NotFound";
import TextButton from "@/components/TextButton";
import { useLayout } from "@/contexts/LayoutContext";
import {
  useCourseProgress,
  useCreateReview,
  useEnrollCourse,
  useUserEnrollments,
} from "@/hooks/useCourseDetail";
import { MOCK_COMMENT } from "@/mock";
import { useAuthStore } from "@/store/authStore";
import { COLORS } from "@/styles/colors";
import type { TProgress, TStatusCard } from "@/types/global";
import { formatDate } from "@/utils";
import { courseQueryOptions } from "@/utils/courses";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Activity, Suspense, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import CommentForm from "../-components/CommentForm";
import CommentItem from "../-components/CommentItem";
import TetrisLoader from "@/components/TetrisLoader";

export const Route = createLazyFileRoute("/learner/courses/$courseId/")({
  component: CourseComponent,
});

function CourseComponent() {
  const navigate = useNavigate();
  const { courseId } = Route.useParams();
  const { t } = useTranslation();

  const currentUser = useAuthStore((state) => state.user);
  const userId = currentUser?.id;

  const { data } = useSuspenseQuery(courseQueryOptions(courseId));
  const { getCourseById, getLessonsByCourseId, getReviewsByCourse } = data;
  const { setLayoutConfigState } = useLayout();

  useEffect(() => {
    if (getCourseById?.courseName) {
      setLayoutConfigState((prev) => ({
        ...prev,
        customTitle: getCourseById.courseName,
      }));
    }
  }, [getCourseById?.courseName, setLayoutConfigState]);

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
          description: lesson.abstract ?? t("course_detail.no_description"),
          duration: "45 mins",
          status,
          percentage,
        };
      });
    }
    return null;
  }, [getLessonsByCourseId, isEnrolled, progressData, t]);

  const commentDisplay = useMemo(() => {
    if (getReviewsByCourse?.isSuccess) {
      return getReviewsByCourse.reviews.map((review) => ({
        id: review.id,
        userName: review.user.username,
        time: formatDate(review.createdAt),
        rating: review.rating,
        content: review.content || t("course_detail.no_description"),
        isOptimistic: review.id.startsWith("optimistic-"),
      }));
    }
    return MOCK_COMMENT;
  }, [getReviewsByCourse, t]);

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
      abstract: getCourseById.abstract ?? null,
      status: currentStatus,
      listFeature: getCourseById.keyLearnings ?? [],
      percentage: currentProgressPercentage as TProgress,
    };
  }, [getCourseById, currentProgressPercentage, isEnrolled]);

  const handleEnrollCourse = () => {
    if (!userId) {
      toast.error(t("course_detail.toast_login_enroll"));
      return;
    }
    enrollCourseMutation.mutate({ courseId, userId });
  };

  const handleLessonClick = (lessonId: string, isLocked: boolean) => {
    if (!isEnrolled) {
      toast.warning(t("course_detail.toast_enroll_first"));
      return;
    }
    if (isLocked) {
      toast.warning(t("course_detail.toast_unlock_lesson"));
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
            <Icon name="sell" />
          </Empty.Media>
          <Empty.Title>{t("course_detail.empty_title")}</Empty.Title>
          <Empty.Description>
            {t("course_detail.empty_description")}
          </Empty.Description>
        </Empty.Header>
        <Empty.Content>
          <TextButton
            text={t("course_detail.empty_create")}
            icon="add"
            size="medium"
            onClick={() => {}}
          />
        </Empty.Content>
      </Empty>
    );

  return (
    <div className="course__container">
      <Suspense fallback={<TetrisLoader />}>
        <div className="course__item-list">
          <DecorationCard
            listBadge={
              <TextButton
                text={t("course_detail.badge_text")}
                size="tiny"
                type="special"
                typeSpecial="course"
                backgroundColor={COLORS.navy500}
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
          {courseDisplay.abstract && (
            <p className="course__abstract">{courseDisplay.abstract}</p>
          )}
          <div className="course__controller">
            {!isEnrolled && (
              <TextButton
                text={
                  enrollCourseMutation.isPending
                    ? t("course_detail.processing")
                    : t("course_detail.enroll")
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
              text={t("course_detail.show_feedback")}
              size="small"
              icon="feedback"
              type="outlined"
              typeSpecial="course"
              onClick={() => setShowComment((prev) => !prev)}
            />
          </div>
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
                onClick={() =>
                  handleLessonClick(lesson.id, lesson.status === "locked")
                }
                disabled={lesson.status === "locked"}
              />
            ))}
          </div>
        </div>
      </Suspense>
      <Activity mode={showComment ? "visible" : "hidden"}>
        <div className="course__comment">
          <TextButton
            text={t("course_detail.send_feedback")}
            size="small"
            icon="add"
            type="outlined"
            typeSpecial="course"
            className="course__send-btn"
            onClick={() => {
              if (!currentUser) {
                toast.warning(t("course_detail.toast_login_feedback"));
                return;
              }
              setShowCommentForm((prev) => !prev);
            }}
          />
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
