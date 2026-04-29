import { createFileRoute } from "@tanstack/react-router";
import { postQueryOptions } from "@/utils/posts";
import NotFound from "@/components/NotFound";
import PostErrorComponent from "@/components/PostErrorComponent";
import DecorationCard from "@/components/DecorationCard";
import TextButton from "@/components/TextButton";
import { COLORS } from "@/styles/colors";
import { MOCK_ROADMAP } from "@/mock/roadmap";
import { MOCK_COURSES } from "@/mock/course";
import Card from "@/components/Card";
import { MOCK_COMMENT } from "@/mock/comment";
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
    <div className="roadmapDetail-container">
      <div className="roadmapDetail-itemList">
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
        <div className="roadmapDetail-content">
          <div className="roadmapDetail-content-controls">
            <button>Send feedback</button>
          </div>
          <div className="roadmapDetail-list">
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
      <div className="roadmapDetail-comment">
        {MOCK_COMMENT.map((comment, idx) => (
          <div key={idx} className="roadmapDetail-commentItem">
            <div className="roadmapDetail-commentItem-head">
              <div className="comment-avatar"></div>
              <div className="comment-headInfor">
                <span>{comment.userName}</span>
                <p>{comment.time}</p>
              </div>
              <div className="comment-3dot">
                <span className="material-symbols-rounded icon">more_vert</span>
              </div>
            </div>
            <div className="roadmapDetail-commentItem-body">
              {comment.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
