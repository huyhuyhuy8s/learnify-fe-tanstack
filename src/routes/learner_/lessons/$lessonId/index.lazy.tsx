import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import TetrisLoader from "@/components/TetrisLoader";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ChatArea from "../-components/ChatArea";
import CourseContext from "../-components/CourseContext";
import type { TCourseContextRef } from "../-components/CourseContext/type";
import TeacherPanel from "../-components/TeacherPanel";
import useLessonDetail from "../-hooks/useLessonDetail";
import useTeacher from "../-hooks/useTeacher";
import { graphqlClient } from "@/lib/graphql";
import {
  FIND_ENROLLMENT_QUERY,
  GET_LESSONS_BY_COURSE_ID_QUERY,
} from "@/graphql/course";
import { useAuthStore } from "@/store";

export const Route = createLazyFileRoute("/learner_/lessons/$lessonId/")({
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
    reset,
    handleComplete,
  } = useLessonDetail(lessonId);
  const {
    chatRef,
    stopRef,
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
    resetTeacher,
  } = useTeacher();
  const [ttsSpeed, setTtsSpeed] = useState(1);
  const [autoScroll, setAutoScroll] = useState(true);
  const courseContextRef = useRef<TCourseContextRef>(null);
  const isInitialMount = useRef(true);

  const onLessonChange = useEffectEvent(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    chatRef.current?.resetAndClear?.();
    reset();
    resetTeacher();
    courseContextRef.current?.reset();
  });

  useEffect(() => {
    onLessonChange();
  }, [lessonId]);

  useEffect(() => {
    return () => {
      stopRef.current?.();
    };
  }, []);

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
    handleComplete();
  }, [stopChat, completeLesson, handleComplete]);
  const handleLessonComplete = useCallback(() => {
    skipToQA();
  }, [skipToQA]);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const courseId = data?.lesson?.courseId;
  const userId = useAuthStore((s) => s.user?.id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: enrollmentData, isLoading: isCheckingEnrollment } = useQuery({
    queryKey: ["enrollment", courseId, userId],
    queryFn: async () => {
      if (!courseId || !userId) return null;
      return graphqlClient.request<{
        findEnrollment: { id: string } | null;
      }>(FIND_ENROLLMENT_QUERY, { courseId });
    },
    enabled: !!courseId && !!userId && !!data?.lesson,
  });

  const { data: courseLessons } = useQuery({
    queryKey: ["course-lessons-list", courseId],
    queryFn: async () => {
      if (!courseId) return [];
      const res = await graphqlClient.request<{
        getLessonsByCourseId: { lessons: { id: string; lessonName: string }[] };
      }>(GET_LESSONS_BY_COURSE_ID_QUERY, { id: courseId });
      return res.getLessonsByCourseId.lessons;
    },
    enabled: !!courseId,
  });

  const currentLessonIndex = useMemo(() => {
    if (!courseLessons) return -1;
    return courseLessons.findIndex((l) => l.id === lessonId);
  }, [courseLessons, lessonId]);

  const nextLesson = useMemo(() => {
    if (
      currentLessonIndex < 0 ||
      currentLessonIndex >= (courseLessons?.length ?? 0) - 1
    )
      return null;
    return courseLessons![currentLessonIndex + 1];
  }, [currentLessonIndex, courseLessons]);

  useEffect(() => {
    if (isCheckingEnrollment || !courseId) return;
    if (!enrollmentData?.findEnrollment) {
      toast.error(t("toast_enroll_first"));
      navigate({ to: "/learner/courses/$courseId", params: { courseId } });
    }
  }, [enrollmentData, isCheckingEnrollment, courseId, navigate, t]);

  const hasCourseId = !!courseId;
  const enrollmentChecked = !hasCourseId || !!enrollmentData;
  const isNotEnrolled =
    enrollmentChecked && hasCourseId && !enrollmentData?.findEnrollment;

  if (isLoading || isCheckingEnrollment || isNotEnrolled) {
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
        stopRef={stopRef}
        lessonId={lessonId}
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
        courseId={courseId ?? ""}
        nextLessonId={nextLesson?.id}
      />

      {showChatArea && (
        <CourseContext
          ref={courseContextRef}
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
        onReload={handleReload}
        ttsSpeed={ttsSpeed}
        onTtsSpeedChange={setTtsSpeed}
        autoScroll={autoScroll}
        onAutoScrollChange={setAutoScroll}
      />
    </div>
  );
}
