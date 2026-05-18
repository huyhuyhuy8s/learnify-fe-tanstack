import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import { useLesson } from "@/hooks/useLesson";
import useLessonFlow from "@/hooks/useLessonFlow";
import { useLayout } from "@/contexts/LayoutContext";
import { logger } from "@/utils/logger";
import TetrisLoader from "@/components/TetrisLoader";
import CourseContext from "./-components/CourseContext";
import TeacherContainer from "./-components/TeacherContainer";
import TeacherStatusIndicator from "./-components/TeacherStatusIndicator";
import TeacherController from "./-components/TeacherController";
import QuizPanel from "./-components/QuizPanel";
import type { TTeacherAnimation } from "./-components/TeacherAnimation/type";
import type { TTeacherStatus } from "./-components/TeacherStatusIndicator/type";
import ChatHeader from "./-components/ChatHeader";
import ChatMessageWrapper, {
  type TChatMessageRef,
} from "./-components/ChatMessageWrapper";
import "./lessonId.scss";
import { mockQuizQuestions } from "@/mock/quiz";
import NotFound from "@/components/NotFound";
import ErrorScene from "@/components/ErrorScene";
import TextButton from "@/components/TextButton";

function CourseErrorComponent() {
  const router = useRouter();
  return (
    <ErrorScene>
      <ErrorScene.Header>
        <ErrorScene.Title errorCode={500}>Server Error</ErrorScene.Title>
        <ErrorScene.Description>
          Something went wrong while loading this course. The server encountered
          an issue. Please try again or come back later.
        </ErrorScene.Description>
      </ErrorScene.Header>
      <ErrorScene.Content>
        <div className="error-scene__control">
          <TextButton
            text="Try Again"
            onClick={() => router.invalidate()}
            className="error-scene__btn"
            size="medium"
            icon="refresh"
          />
          <TextButton
            text="Go Back"
            onClick={() => window.history.back()}
            className="error-scene__btn error-scene__btn--secondary"
            size="medium"
            icon="arrow_back"
            type="outlined"
          />
        </div>
      </ErrorScene.Content>
    </ErrorScene>
  );
}

export const Route = createFileRoute("/learner_/lessons/$lessonId")({
  errorComponent: CourseErrorComponent,
  notFoundComponent: NotFound,
  pendingComponent: TetrisLoader,
  component: LessonDetail,
});

const DEFAULT_VOICE_ID =
  import.meta.env.VITE_EDGETTS_VOICE_ID || "vi-VN-HoaiMyNeural";

function LessonDetail() {
  const { lessonId } = Route.useParams();
  const { data, isLoading } = useLesson(lessonId);
  const { state, startLesson, skipToQA, skipToQuiz, completeLesson } =
    useLessonFlow();
  const [animation, setAnimation] = useState<TTeacherAnimation>("Idle");
  const [status, setStatus] = useState<TTeacherStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState(DEFAULT_VOICE_ID);
  const chatRef = useRef<TChatMessageRef>(null);
  const { setLayoutConfigState } = useLayout();

  const title = data?.course?.courseName || data?.lesson?.lessonName;
  useEffect(() => {
    if (title)
      setLayoutConfigState((prev) => ({ ...prev, customTitle: title }));
  }, [title, setLayoutConfigState]);

  const sections = useMemo(() => {
    if (!data?.sections) return undefined;
    const refs = data.sections
      .filter((s) => s.content)
      .map((s) => ({ value: s.id, label: s.content! }));
    const docs = data.sections
      .filter((s) => s.urlPdf)
      .map((s) => ({
        value: s.id,
        label: s.urlPdf.split("/").pop() || "Document",
      }));
    return { references: refs, documents: docs };
  }, [data]);

  const { speak: previewSpeak } = useSpeechSynthesis();

  const handlePreviewVoice = useCallback(
    (voiceId: string) => {
      previewSpeak(
        "This is a test of the voice. The quick brown fox jumps over the lazy dog.",
        { rate: 1, pitch: 1, volume: 1, voiceId }
      );
    },
    [previewSpeak]
  );

  const handlePause = () => chatRef.current?.pause();
  const handleResume = () => chatRef.current?.resume();
  const handleStop = () => chatRef.current?.stop();
  const handleSelectVoice = (voiceId: string) => setSelectedVoiceId(voiceId);

  const handleLessonComplete = useCallback(() => {
    skipToQA();
  }, [skipToQA]);

  const handleSkipLesson = useCallback(() => {
    chatRef.current?.stop();
    skipToQA();
  }, [skipToQA]);

  const handleSkipQA = useCallback(() => {
    chatRef.current?.stop();
    skipToQuiz();
  }, [skipToQuiz]);

  const handleSkipQuiz = useCallback(() => {
    chatRef.current?.stop();
    completeLesson();
  }, [completeLesson]);

  if (isLoading) return <TetrisLoader />;

  return (
    <div className="lesson-detail-page">
      <div className="chat-container">
        {state !== "initial" && state !== "complete" && (
          <ChatHeader
            initialValue={data?.lesson?.lessonName}
            state={state}
            onSkipLesson={handleSkipLesson}
            onSkipQA={handleSkipQA}
            onSkipQuiz={handleSkipQuiz}
          />
        )}

        {state === "initial" && (
          <div className="lesson-detail-welcome">
            <h2 className="lesson-detail-welcome-title">
              {data?.lesson?.lessonName || "Lesson"}
            </h2>
            {data?.lesson?.abstract && (
              <p className="lesson-detail-welcome-abstract">
                {data.lesson.abstract}
              </p>
            )}
            <p className="lesson-detail-welcome-sections">
              {data?.sections?.length || 0} sections to cover
            </p>
            <button
              className="lesson-detail-welcome-start"
              onClick={startLesson}
            >
              Start Lesson
            </button>
          </div>
        )}

        {state === "lesson" &&
          (logger.info(
            `[lesson] rendering ChatMessageWrapper with ${data?.sections?.length || 0} sections, lecturer_segment samples:`,
            data?.sections?.map((s) => ({
              id: s.id,
              order: s.order,
              segCount: Array.isArray(s.lecturer_segment)
                ? s.lecturer_segment.length
                : typeof s.lecturer_segment,
            }))
          ),
          (
            <ChatMessageWrapper
              ref={chatRef}
              mode="lesson"
              sections={data?.sections || []}
              onLessonComplete={handleLessonComplete}
              onAnimationChange={setAnimation}
              onStatusChange={setStatus}
              isMuted={isMuted}
            />
          ))}

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
          <QuizPanel
            questions={mockQuizQuestions}
            onComplete={completeLesson}
          />
        )}

        {state === "complete" && (
          <div className="lesson-detail-complete">
            <span className="lesson-detail-complete-icon material-symbols-rounded">
              check_circle
            </span>
            <h2 className="lesson-detail-complete-title">Lesson Complete!</h2>
            <p className="lesson-detail-complete-text">
              You have finished this lesson. Great work!
            </p>
            <Link
              to="/learner/dashboard"
              className="lesson-detail-complete-back"
            >
              Back to Dashboard
            </Link>
          </div>
        )}
      </div>

      {state !== "initial" && state !== "complete" && (
        <CourseContext
          references={sections?.references}
          documents={sections?.documents}
        />
      )}

      {state !== "initial" && state !== "complete" && (
        <TeacherContainer animation={animation}>
          <TeacherStatusIndicator status={status} />
          <TeacherController
            status={status}
            isMuted={isMuted}
            isSettingsOpen={isSettingsOpen}
            selectedVoiceId={selectedVoiceId}
            onPause={handlePause}
            onResume={handleResume}
            onStop={handleStop}
            onMute={() => setIsMuted(true)}
            onUnmute={() => setIsMuted(false)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onCloseSettings={() => setIsSettingsOpen(false)}
            onSelectVoice={handleSelectVoice}
            onPreviewVoice={handlePreviewVoice}
          />
        </TeacherContainer>
      )}
    </div>
  );
}
