import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import { useLesson } from "@/hooks/useLesson";
import { useLayout } from "@/contexts/LayoutContext";
import TetrisLoader from "@/components/TetrisLoader";
import CourseContext from "./-components/CourseContext";
import TeacherContainer from "./-components/TeacherContainer";
import TeacherStatusIndicator from "./-components/TeacherStatusIndicator";
import TeacherController from "./-components/TeacherController";
import type { TTeacherAnimation } from "./-components/TeacherAnimation/type";
import type { TTeacherStatus } from "./-components/TeacherStatusIndicator/type";
import ChatHeader from "./-components/ChatHeader";
import ChatMessageWrapper, {
  type TChatMessageRef,
} from "./-components/ChatMessageWrapper";
import "./lessonId.scss";

export const Route = createFileRoute("/learner_/lessons/$lessonId")({
  component: LessonDetail,
});

const DEFAULT_VOICE_ID =
  import.meta.env.VITE_ELEVENLABS_VOICE_ID || "eVItLK1UvXctxuaRV2Oq";

function LessonDetail() {
  const { lessonId } = Route.useParams();
  const { data, isLoading } = useLesson(lessonId);
  const [animation, setAnimation] = useState<TTeacherAnimation>("Idle");
  const [status, setStatus] = useState<TTeacherStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState(DEFAULT_VOICE_ID);
  const chatRef = useRef<TChatMessageRef>(null);
  const { setLayoutConfigState, customTitle } = useLayout();

  const title =
    data?.course?.courseName || data?.lesson?.lessonName || customTitle;
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

  const handlePause = () => {
    chatRef.current?.pause();
  };

  const handleResume = () => {
    chatRef.current?.resume();
  };

  const handleStop = () => {
    chatRef.current?.stop();
  };

  const handleSelectVoice = (voiceId: string) => {
    setSelectedVoiceId(voiceId);
  };

  if (isLoading) return <TetrisLoader />;

  return (
    <div className="lesson-detail-page">
      <div className="chat-container">
        <ChatHeader initialValue={data?.lesson?.lessonName} />
        <ChatMessageWrapper
          ref={chatRef}
          onAnimationChange={setAnimation}
          onStatusChange={setStatus}
          isMuted={isMuted}
        />
      </div>
      <CourseContext
        references={sections?.references}
        documents={sections?.documents}
      />
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
    </div>
  );
}
