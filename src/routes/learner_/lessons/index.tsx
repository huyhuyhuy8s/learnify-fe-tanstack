import { createFileRoute } from "@tanstack/react-router";
import "./style.scss";

export const Route = createFileRoute("/learner_/lessons/")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "All Lessons - Learnify",
      },
    ],
  }),
  component: LessonsIndex,
});

function LessonsIndex() {
  return (
    <div className="lessons-page">
      <h1>All Lessons</h1>
      <p>Lesson listing page - coming soon</p>
    </div>
  );
}
