import { createFileRoute } from "@tanstack/react-router";
import { postQueryOptions } from "@/utils/posts";
import NotFound from "@/components/NotFound";
import PostErrorComponent from "@/components/PostErrorComponent";
import { MOCK_COURSES } from "@/mock/course";
import DecorationCard from "@/components/DecorationCard";
import TextButton from "@/components/TextButton";
import { COLORS } from "@/styles/colors";
import Card from "@/components/Card";
import "./postId.scss";
import { MOCK_COURSE_DETAILS } from "@/mock/course-detail";
import { MOCK_COMMENT } from "@/mock/comment";

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
  const course = MOCK_COURSES.find((course) => course.id === Number(postId));

  if (!course) {
    return <NotFound />;
  }

  return (
    <div className="courseDetail-container">
      <div className="courseDetail-itemList">
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
          title={course.title ?? ""}
          status={course.status ?? "default"}
          listFeature={course.listFeature}
          percentage={course.percentage ?? 0}
        />
        <div className="courseDetail-content">
          <div className="courseDetail-content-controls">
            <button>Send feedback</button>
          </div>
          <div className="courseDetail-list">
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
      </div>
      <div className="courseDetail-comment">
        {MOCK_COMMENT.map((comment, idx) => (
          <div key={idx} className="courseDetail-commentItem">
            <div className="courseDetail-commentItem-head">
              <div className="comment-avatar"></div>
              <div className="comment-headInfor">
                <span>{comment.userName}</span>
                <p>{comment.time}</p>
              </div>
              <div className="comment-3dot">
                <span className="material-symbols-rounded icon">more_vert</span>
              </div>
            </div>
            <div className="courseDetail-commentItem-body">
              {comment.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
