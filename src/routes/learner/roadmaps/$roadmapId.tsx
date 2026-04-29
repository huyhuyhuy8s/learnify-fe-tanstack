import { createFileRoute } from "@tanstack/react-router";
import { postQueryOptions } from "@/utils/posts";
import NotFound from "@/components/NotFound";
import PostErrorComponent from "@/components/PostErrorComponent";
import DecorationCard from "@/components/DecorationCard";
import TextButton from "@/components/TextButton";
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
  return <>Hello</>;
}
