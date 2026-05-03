import { createFileRoute } from "@tanstack/react-router";
import ChatContainer from "./-components/ChatContainer";
import "./lessonId.scss";
import CourseContext from "./-components/CourseContext";
import TutorContainer from "./-components/TutorContainer";

export const Route = createFileRoute("/learner_/lessons/$lessonId")({
  component: LessonDetail,
});

function LessonDetail() {
  return (
    <div className="lesson-detail-page">
      <ChatContainer />
      <CourseContext />
      <TutorContainer />
    </div>
  );
}
