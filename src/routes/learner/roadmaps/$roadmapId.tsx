import { createFileRoute } from "@tanstack/react-router";
import { postQueryOptions } from "@/utils/posts";
import NotFound from "@/components/NotFound";
import PostErrorComponent from "@/components/PostErrorComponent";
import DecorationCard from "@/components/DecorationCard";
import TextButton from "@/components/TextButton";
import Card from "@/components/Card";
import CommentItem from "./-components/CommentItem";
import "./roadmapId.scss";
import { MOCK_COMMENT, MOCK_COURSES, MOCK_ROADMAP } from "@/mock";
import { COLORS } from "@/styles/colors";

export const Route = createFileRoute("/learner/roadmaps/$roadmapId")({
  loader: async ({ params: { roadmapId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      postQueryOptions(roadmapId)
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
  component: RoadmapComponent,
});

function RoadmapComponent() {
  const { roadmapId } = Route.useParams();
  const roadmap = MOCK_ROADMAP.find(
    (roadmap) => roadmap.id === Number(roadmapId)
  );

  if (!roadmap) {
    return <NotFound />;
  }

  return (
    <div className="roadmap-detail-container">
      <div className="roadmap-detail-item-list">
        <DecorationCard
          listBadge={
            <TextButton
              text="text"
              size="tiny"
              type="special"
              typeSpecial="roadmap"
              backgroundColor={COLORS.navy300}
              color={COLORS.neutral100}
              onClick={() => {}}
            />
          }
          typeSpecial="roadmap"
          backgroundColor={COLORS.modeGreen}
          title={roadmap.title ?? ""}
          status={roadmap.status ?? "default"}
          listFeature={roadmap.listFeature}
          percentage={roadmap.percentage ?? 0}
        />
        <div className="roadmap-detail-content">
          <TextButton
            text="Send feedback"
            size="small"
            icon="feedback"
            type="outlined"
            typeSpecial="course"
            onClick={() => {}}
          />
          <div className="roadmap-detail-list">
            {MOCK_COURSES.map((course) => (
              <Card
                key={course.id}
                typeSpecial={course.typeSpecial}
                title={course.title}
                description={course.description}
                duration={course.duration}
                status={course.status}
                percentage={course.percentage}
                onClick={() => alert("hello")}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="roadmap-detail-comment">
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
