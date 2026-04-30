import { createFileRoute } from "@tanstack/react-router";
import { postQueryOptions } from "@/utils/posts";
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

export const Route = createFileRoute("/learner/courses/$postId")({
  loader: async ({ params: { postId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      postQueryOptions(postId)
    );

    return {
      title: data.title,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <NotFound />;
  },
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  const course = useMemo(
    () => MOCK_COURSES.find((course) => course.id === Number(postId)),
    [postId]
  );

  if (!course) {
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
          title={course.title}
          status={course.status}
          listFeature={course.listFeature}
          percentage={course.percentage ?? 0}
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
          {MOCK_COURSE_DETAILS.map((courseDetail) => (
            <Card
              key={courseDetail.id}
              typeSpecial={courseDetail.typeSpecial}
              title={courseDetail.title}
              description={courseDetail.description}
              duration={courseDetail.duration}
              status={courseDetail.status}
              percentage={courseDetail.percentage}
              onClick={() => alert("hello")}
            />
          ))}
        </div>
      </div>
      <div className="course-detail-comment">
        {MOCK_COMMENT.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            userName={comment.userName}
            time={comment.time}
            content={comment.content}
          />
        ))}
      </div>
    </div>
  );
}
