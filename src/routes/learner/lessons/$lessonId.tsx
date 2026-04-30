import { createFileRoute } from "@tanstack/react-router";
import "./style.scss";

export const Route = createFileRoute("/learner/lessons/$lessonId")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Lesson Detail - Learnify",
      },
    ],
  }),
  component: LessonDetail,
});

function LessonDetail() {
  return (
    <div className="lesson-detail-page">
      <h1>Lesson Detail</h1>
      <p>Individual lesson page - coming soon</p>
    </div>
  );
}
