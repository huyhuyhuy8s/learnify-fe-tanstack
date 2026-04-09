import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/learner/courses/")({
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  return <div>Select a post.</div>;
}
