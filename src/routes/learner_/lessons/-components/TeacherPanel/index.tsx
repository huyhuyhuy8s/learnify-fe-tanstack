import { Suspense, lazy } from "react";
import type { TTeacherAnimation } from "../TeacherAnimation/type";
import type { TTeacherStatus } from "../TeacherStatusIndicator/type";
import TeacherAvatar2D from "../TeacherAvatar2D";
import TeacherStatusIndicator from "../TeacherStatusIndicator";
import TeacherController from "../TeacherController";

const TeacherContainer = lazy(() => import("../TeacherContainer"));

const LOADING_MESSAGES = [
  "Loading 3D environment...",
  "Loading teacher model...",
  "Initializing animations...",
  "Ready!",
];

type TTeacherPanelProps = {
  state: string;
  is3DMode: boolean;
  animation: TTeacherAnimation;
  status: TTeacherStatus;
  isMuted: boolean;
  isSettingsOpen: boolean;
  selectedVoiceId: string;
  isModelReady: boolean;
  modelsReady: boolean;
  loadingMessageIndex: number;
  onModelReady: () => void;
  onModelsReady: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onMute: () => void;
  onUnmute: () => void;
  onOpenSettings: () => void;
  onCloseSettings: () => void;
  onSelectVoice: (voiceId: string) => void;
  onPreviewVoice: (voiceId: string) => void;
  onToggle3DMode: (enabled: boolean) => void;
};

const TeacherPanel = (props: TTeacherPanelProps) => {
  const {
    state,
    is3DMode,
    animation,
    status,
    isMuted,
    isSettingsOpen,
    selectedVoiceId,
    isModelReady,
    modelsReady,
    loadingMessageIndex,
    onModelReady,
    onModelsReady,
    onPause,
    onResume,
    onStop,
    onMute,
    onUnmute,
    onOpenSettings,
    onCloseSettings,
    onSelectVoice,
    onPreviewVoice,
    onToggle3DMode,
  } = props;

  if (state === "complete") return null;

  const commonControllerProps = {
    status,
    isMuted,
    isSettingsOpen,
    selectedVoiceId,
    is3DMode,
    onPause,
    onResume,
    onStop,
    onMute,
    onUnmute,
    onOpenSettings,
    onCloseSettings,
    onSelectVoice,
    onPreviewVoice,
    onToggle3DMode,
  };

  if (is3DMode) {
    return (
      <Suspense fallback={null}>
        <TeacherContainer
          animation={animation}
          onModelReady={onModelReady}
          onModelsReady={onModelsReady}
          isLoading={!modelsReady}
          loadingMessage={
            state === "initial"
              ? "Enriching your 3D lessons"
              : LOADING_MESSAGES[loadingMessageIndex]
          }
        >
          {isModelReady && <TeacherStatusIndicator status={status} />}
          <TeacherController
            {...commonControllerProps}
            isLoading={!isModelReady}
            loadingMessage={LOADING_MESSAGES[loadingMessageIndex]}
          />
        </TeacherContainer>
      </Suspense>
    );
  }

  return (
    <div className="tutor-container tutor-container_2d-mode">
      <TeacherAvatar2D animation={animation} />
      <TeacherStatusIndicator status={status} />
      <TeacherController {...commonControllerProps} />
    </div>
  );
};

export default TeacherPanel;
