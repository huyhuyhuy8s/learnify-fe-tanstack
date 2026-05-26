import "./lessonId.scss";

import CubeLoader from "@/components/CubeLoader";
import NotFound from "@/components/NotFound";
import { createFileRoute } from "@tanstack/react-router";
import LessonError from "../-components/LessonError";

export const Route = createFileRoute("/learner_/lessons/$lessonId")({
  errorComponent: LessonError,
  pendingComponent: CubeLoader,
  notFoundComponent: NotFound,
}).lazy(() => import("./index.lazy").then((m) => m.Route));
