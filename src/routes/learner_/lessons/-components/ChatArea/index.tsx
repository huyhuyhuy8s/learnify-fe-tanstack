import classnames from "classnames";
import ChatHeader from "../ChatHeader";
import LessonWelcome from "../LessonWelcome";
import ChatMessageWrapper from "../ChatMessageWrapper";
import QuizPanel from "../QuizPanel";
import LessonComplete from "../LessonComplete";
import { mockQuizQuestions } from "@/mock/quiz";
import type { TTeacherAnimation } from "../TeacherAnimation/type";
import type { TTeacherStatus } from "../TeacherStatusIndicator/type";
import type { TChatMessageRef } from "../ChatMessageWrapper";
type TSectionItem = {
  id: string;
  urlPdf: string;
  content?: string;
  order: number;
  lecturer_segment: string[];
};

type TChatAreaProps = {
  className?: string;
  state: string;
  lessonName?: string;
  abstract?: string;
  sectionCount?: number;
  sections: TSectionItem[];
  chatRef: React.RefObject<TChatMessageRef | null>;
  isMuted: boolean;
  isModelReady: boolean;
  modelsReady: boolean;
  startLesson: () => void;
  onSkipLesson: () => void;
  onSkipQA: () => void;
  onSkipQuiz: () => void;
  handleLessonComplete: () => void;
  setAnimation: (animation: TTeacherAnimation) => void;
  setStatus: (status: TTeacherStatus) => void;
};

const ChatArea = (props: TChatAreaProps) => {
  const {
    className,
    state,
    lessonName,
    abstract,
    sectionCount,
    sections,
    chatRef,
    isMuted,
    isModelReady,
    modelsReady,
    startLesson,
    onSkipLesson,
    onSkipQA,
    onSkipQuiz,
    handleLessonComplete,
    setAnimation,
    setStatus,
  } = props;

  const showChatArea = state !== "initial" && state !== "complete";

  return (
    <div className={classnames("chat-container", className)}>
      {showChatArea && (
        <ChatHeader
          initialValue={lessonName}
          state={state}
          onSkipLesson={onSkipLesson}
          onSkipQA={onSkipQA}
          onSkipQuiz={onSkipQuiz}
        />
      )}

      {state === "initial" && (
        <LessonWelcome
          lessonName={lessonName}
          abstract={abstract}
          sectionCount={sectionCount}
          modelsReady={modelsReady}
          onStart={startLesson}
        />
      )}

      {state === "lesson" && (
        <ChatMessageWrapper
          ref={chatRef}
          mode="lesson"
          sections={sections}
          onLessonComplete={handleLessonComplete}
          onAnimationChange={setAnimation}
          onStatusChange={setStatus}
          isMuted={isMuted}
          isModelReady={isModelReady}
        />
      )}

      {state === "qa" && (
        <ChatMessageWrapper
          ref={chatRef}
          mode="qa"
          onAnimationChange={setAnimation}
          onStatusChange={setStatus}
          isMuted={isMuted}
        />
      )}

      {state === "quiz" && (
        <QuizPanel questions={mockQuizQuestions} onComplete={onSkipQuiz} />
      )}

      {state === "complete" && <LessonComplete />}
    </div>
  );
};

export default ChatArea;
