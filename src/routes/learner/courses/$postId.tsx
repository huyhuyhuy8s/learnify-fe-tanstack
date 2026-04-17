import { createFileRoute } from "@tanstack/react-router";
import { postQueryOptions } from "@/utils/posts";
import NotFound from "@/components/NotFound";
import PostErrorComponent from "@/components/PostErrorComponent";
import { MOCK_COURSES } from "@/mock/course";
import DecorationCard from "@/components/DecorationCard";
import TextButton from "@/components/TextButton";
import { COLORS } from "@/styles/colors";

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
    <div className="course-container">
      <DecorationCard
        listBadge={
          <>
            <TextButton
              text="text"
              size="tiny"
              type="special"
              typeSpecial="course"
              backgroundColor={COLORS.navy300}
              color={COLORS.neutral100}
              onClick={() => {}}
            />
            <TextButton
              text="text"
              size="tiny"
              type="special"
              typeSpecial="course"
              backgroundColor={COLORS.navy300}
              color={COLORS.neutral100}
              onClick={() => {}}
            />
          </>
        }
        title={course.title ?? ""}
        status={course.status ?? "default"}
        listFeature={course.listFeature}
        percentage={course.percentage ?? 0}
      />
      <div className="content">
        <div className="description">{course?.description}</div>
        <div className="duration">Duration: {course?.duration}</div>
      </div>
    </div>
  );
}
