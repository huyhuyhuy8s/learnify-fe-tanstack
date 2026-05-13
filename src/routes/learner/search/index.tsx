import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { logger } from "@/utils/logger";

const searchSchema = z.object({
  q: z.string().catch(""),
});

export const Route = createFileRoute("/learner/search/")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  const { q } = Route.useSearch();

  logger.debug("Search query:", q);

  return <div>Showing results for: {q}</div>;
}
