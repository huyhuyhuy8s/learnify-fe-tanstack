import "./roadmapId.scss";

import { createFileRoute } from "@tanstack/react-router";
import { postQueryOptions } from "@/utils/posts";

export const Route = createFileRoute("/learner/roadmaps/$roadmapId")({
  loader: async ({ params: { roadmapId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      postQueryOptions(roadmapId)
    );
    return { title: data.title };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
}).lazy(() => import("./index.lazy").then((m) => m.Route));
