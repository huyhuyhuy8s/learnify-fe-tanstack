import { createFileRoute } from "@tanstack/react-router";
import NotFound from "@/components/NotFound";
import PostErrorComponent from "@/components/PostErrorComponent";
import DecorationCard from "@/components/DecorationCard";
import TextButton from "@/components/TextButton";
import { COLORS } from "@/styles/colors";
import Card from "@/components/Card";
import CommentItem from "./-components/CommentItem";
import "./postId.scss";
import { MOCK_COMMENT, MOCK_COURSE_DETAILS, MOCK_COURSES } from "@/mock";
import { useMemo } from "react";
import { useCourseDetail } from "@/hooks/useCourseDetail";
import Loader from "@/components/Loader";
import type { TProgress } from "@/types/global";
import { formatDate } from "@/utils";

export const Route = createFileRoute("/learner/courses/$postId")({
  head: () => ({
    meta: [{ title: "Course Details | Learnify" }],
  }),
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <NotFound />;
  },
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  const { data, isLoading, isError } = useCourseDetail(postId);
  const mockCourse = useMemo(
    () => MOCK_COURSES.find((course) => course.id === Number(1)),
    [postId]
  );

  const courseDisplay = useMemo(() => {
    if (!isLoading && !isError && data?.getCourseById) {
      return {
        title: data.getCourseById.courseName,
        status: data.getCourseById.status || "default",
        listFeature: data.getCourseById.keyLearnings || [],
        percentage: 0 as TProgress,
      };
    }
    return mockCourse || null;
  }, [data, isLoading, isError, mockCourse]);

  const lessonsDisplay = useMemo(() => {
    if (!isLoading && !isError && data?.getLessonsByCourseId?.isSuccess) {
      return data.getLessonsByCourseId.lessons.map((lesson) => ({
        id: lesson.id,
        typeSpecial: "lesson" as const,
        title: lesson.lessonName,
        description: lesson.abstract,
        duration: "45 mins",
        status: "default" as const,
        percentage: 0,
      }));
    }
    return MOCK_COURSE_DETAILS;
  }, [data, isLoading, isError]);

  const commentDisplay = useMemo(() => {
    if (!isLoading && !isError && data?.getReviewsByCourse?.isSuccess) {
      return data.getReviewsByCourse.reviews.map((review) => ({
        id: review.id,
        userName: review.user.username,
        time: formatDate(review.createdAt),
        rating: review.rating,
        content: review.content,
      }));
    }
    return MOCK_COMMENT;
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <Loader />;
  }

  if (!courseDisplay) {
    return <NotFound />;
  }

  return (
    <div className="course-detail-container">
      <div className="course-detail-item-list">
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
          status={courseDisplay.status as any}
          listFeature={courseDisplay.listFeature}
          percentage={courseDisplay.percentage ?? 0}
        />
        <TextButton
          text="Send feedback"
          size="small"
          icon="feedback"
          type="outlined"
          typeSpecial="course"
          onClick={() => {}}
        />
        <div className="course-detail-list">
          {lessonsDisplay.map((lesson) => (
            <Card
              key={lesson.id}
              typeSpecial={lesson.typeSpecial}
              title={lesson.title}
              description={lesson.description}
              duration={lesson.duration}
              status={lesson.status}
              percentage={lesson.percentage}
              onClick={() => alert("hello")}
            />
          ))}
        </div>
      </div>
      <div className="course-detail-comment">
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
    </div>
  );
}
