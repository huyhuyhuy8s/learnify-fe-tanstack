import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import LessonError from "./-components/LessonError";
import CourseContext from "./-components/CourseContext";
import TeacherPanel from "./-components/TeacherPanel";
import ChatArea from "./-components/ChatArea";
import useLessonDetail from "./-hooks/useLessonDetail";
import useTeacher from "./-hooks/useTeacher";
import TetrisLoader from "@/components/TetrisLoader";
import CubeLoader from "@/components/CubeLoader";
import NotFound from "@/components/NotFound";
import "./lessonId.scss";

export const Route = createFileRoute("/learner_/lessons/$lessonId")({
  errorComponent: LessonError,
  pendingComponent: CubeLoader,
  notFoundComponent: NotFound,
  component: LessonDetail,
});

function LessonDetail() {
  const { lessonId } = Route.useParams();
  const {
    data,
    isLoading,
    state,
    sections,
    startLesson,
    skipToQA,
    skipToQuiz,
    completeLesson,
  } = useLessonDetail(lessonId);
  const {
    chatRef,
    isMuted,
    isModelReady,
    modelsReady,
    animation,
    status,
    isSettingsOpen,
    selectedVoiceId,
    is3DMode,
    loadingMessageIndex,
    stopChat,
    handleModelReady,
    handleModelsReady,
    handlePause,
    handleResume,
    handleStop,
    handleSelectVoice,
    handlePreviewVoice,
    setAnimation,
    setStatus,
    setIsMuted,
    setIsSettingsOpen,
    toggle3DMode,
  } = useTeacher();

  const handleSkipLesson = useCallback(() => {
    stopChat();
    skipToQA();
  }, [stopChat, skipToQA]);
  const handleSkipQA = useCallback(() => {
    stopChat();
    skipToQuiz();
  }, [stopChat, skipToQuiz]);
  const handleSkipQuiz = useCallback(() => {
    stopChat();
    completeLesson();
  }, [stopChat, completeLesson]);
  const handleLessonComplete = useCallback(() => {
    skipToQA();
  }, [skipToQA]);

  if (isLoading && !data) {
    return (
      <div className="lesson-detail-page lesson-detail-page_loading">
        <TetrisLoader />
      </div>
    );
  }

  const showChatArea = state !== "initial" && state !== "complete";

  return (
    <div className="lesson-detail-page">
      <ChatArea
        state={state}
        lessonName={data?.lesson?.lessonName}
        abstract={data?.lesson?.abstract}
        sectionCount={data?.sections?.length}
        sections={data?.sections || []}
        chatRef={chatRef}
        isMuted={isMuted}
        isModelReady={isModelReady}
        modelsReady={modelsReady}
        startLesson={startLesson}
        onSkipLesson={handleSkipLesson}
        onSkipQA={handleSkipQA}
        onSkipQuiz={handleSkipQuiz}
        handleLessonComplete={handleLessonComplete}
        setAnimation={setAnimation}
        setStatus={setStatus}
      />

      {showChatArea && (
        <CourseContext
          references={sections?.references}
          documents={sections?.documents}
        />
      )}

      <TeacherPanel
        state={state}
        is3DMode={is3DMode}
        animation={animation}
        status={status}
        isMuted={isMuted}
        isSettingsOpen={isSettingsOpen}
        selectedVoiceId={selectedVoiceId}
        isModelReady={isModelReady}
        modelsReady={modelsReady}
        loadingMessageIndex={loadingMessageIndex}
        onModelReady={handleModelReady}
        onModelsReady={handleModelsReady}
        onPause={handlePause}
        onResume={handleResume}
        onStop={handleStop}
        onMute={() => setIsMuted(true)}
        onUnmute={() => setIsMuted(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onCloseSettings={() => setIsSettingsOpen(false)}
        onSelectVoice={handleSelectVoice}
        onPreviewVoice={handlePreviewVoice}
        onToggle3DMode={toggle3DMode}
      />
    </div>
  );
}
