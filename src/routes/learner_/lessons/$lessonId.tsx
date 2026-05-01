import { createFileRoute } from "@tanstack/react-router";
import ChatContainer from "./-components/ChatContainer";
import "./lessonId.scss";

export const Route = createFileRoute("/learner_/lessons/$lessonId")({
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
      <ChatContainer />
    </div>
  );
}
