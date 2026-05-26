import "./blogs.scss";

import { seo } from "@/utils/seo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      ...seo({
        title: "Blogs | Learnify",
        description:
          "Insights, tutorials, and updates from the Learnify team on AI-powered education, 3D learning, and career development.",
      }),
    ],
  }),
}).lazy(() => import("./index.lazy").then((m) => m.Route));
