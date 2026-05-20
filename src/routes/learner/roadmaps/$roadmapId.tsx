import Card from "@/components/Card";
import DecorationCard from "@/components/DecorationCard";
import NotFound from "@/components/NotFound";
import TextButton from "@/components/TextButton";
import { MOCK_COMMENT, MOCK_COURSES, MOCK_ROADMAP } from "@/mock";
import { COLORS } from "@/styles/colors";
import { postQueryOptions } from "@/utils/posts";
import { createFileRoute } from "@tanstack/react-router";
import CommentItem from "./-components/CommentItem";
import "./roadmapId.scss";

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
  component: RoadmapItem,
});

function RoadmapItem() {
  const { roadmapId } = Route.useParams();
  const roadmap = MOCK_ROADMAP.find(
    (roadmap) => roadmap.id === Number(roadmapId)
  );

  if (!roadmap) {
    return <NotFound />;
  }

  return (
    <div className="roadmap__container">
      <div className="roadmap__item-list">
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
        <div className="roadmap__content">
          <TextButton
            text="Send feedback"
            size="small"
            icon="feedback"
            type="outlined"
            typeSpecial="course"
            onClick={() => {}}
          />
          <div className="roadmap__list">
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
      <div className="roadmap__comment">
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
