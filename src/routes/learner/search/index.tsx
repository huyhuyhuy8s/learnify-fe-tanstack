import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().catch(""),
});

export const Route = createFileRoute("/learner/search/")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  const { q } = Route.useSearch();

  console.log("Search query:", q);

  return <div>Hello "/learner/search/"!</div>;
}
