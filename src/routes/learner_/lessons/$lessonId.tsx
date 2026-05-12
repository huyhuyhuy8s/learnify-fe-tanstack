import { useState, useRef, useCallback } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import "./lessonId.scss";
import CourseContext from "./-components/CourseContext";
import TeacherContainer from "./-components/TeacherContainer";
import TeacherStatusIndicator from "./-components/TeacherStatusIndicator";
import TeacherController from "./-components/TeacherController";
import { graphqlClient } from "@/lib/graphql";
import { CURRENT_USER_QUERY } from "@/graphql/mutations";
import type { UserReturn } from "@/gql/graphql";
import type { RouterContext } from "@/router";
import type { TTeacherAnimation } from "./-components/TeacherAnimation/type";
import type { TTeacherStatus } from "./-components/TeacherStatusIndicator/type";
import ChatHeader from "./-components/ChatHeader";
import ChatMessageWrapper, {
  type TChatMessageRef,
} from "./-components/ChatMessageWrapper";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";

export const Route = createFileRoute("/learner_/lessons/$lessonId")({
  // beforeLoad: async ({ context, params }) => {
  //   const auth = (context as RouterContext).auth;
  //
  //   if (!auth?.isAuthenticated) {
  //     throw redirect({
  //       to: "/learner/log-in",
  //       search: (prev) => ({
  //         ...prev,
  //         redirect: `/learner/lessons/${params.lessonId}`,
  //       }),
  //     });
  //   }
  //
  //   try {
  //     const response = await graphqlClient.request<{
  //       currentUser: UserReturn;
  //     }>(CURRENT_USER_QUERY);
  //     if (
  //       !response.currentUser.isSuccess ||
  //       response.currentUser.users.length === 0
  //     ) {
  //       throw redirect({
  //         to: "/learner/log-in",
  //         search: (prev) => ({
  //           ...prev,
  //           redirect: `/learner/lessons/${params.lessonId}`,
  //         }),
  //       });
  //     }
  //   } catch {
  //     throw redirect({
  //       to: "/learner/log-in",
  //       search: (prev) => ({
  //         ...prev,
  //         redirect: `/learner/lessons/${params.lessonId}`,
  //       }),
  //     });
  //   }
  // },
  component: LessonDetail,
});

const DEFAULT_VOICE_ID =
  import.meta.env.VITE_ELEVENLABS_VOICE_ID || "eVItLK1UvXctxuaRV2Oq";

function LessonDetail() {
  const [animation, setAnimation] = useState<TTeacherAnimation>("Idle");
  const [status, setStatus] = useState<TTeacherStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState(DEFAULT_VOICE_ID);
  const chatRef = useRef<TChatMessageRef>(null);

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

  return (
    <div className="lesson-detail-page">
      <div className="chat-container">
        <ChatHeader />
        <ChatMessageWrapper
          ref={chatRef}
          onAnimationChange={setAnimation}
          onStatusChange={setStatus}
          isMuted={isMuted}
        />
      </div>
      <CourseContext />
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
