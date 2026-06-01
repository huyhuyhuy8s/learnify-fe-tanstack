import RouterComponentHolder from "@/components/RouterComponentHolder";
import "./courses.scss";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import NotFound from "@/components/NotFound";
import TetrisLoader from "@/components/TetrisLoader";

const searchSchema = z.object({
  courseId: z.string().optional(),
  tab: z.enum(["Pending", "Published", "Rejected", "All"]).optional(),
});

export const Route = createFileRoute("/reviewer/courses/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Manage Courses | Content Reviewer | Learnify" }],
  }),
  notFoundComponent: () => <RouterComponentHolder children={<NotFound />} />,
  pendingComponent: () => <RouterComponentHolder children={<TetrisLoader />} />,
}).lazy(() => import("./index.lazy").then((m) => m.Route));
