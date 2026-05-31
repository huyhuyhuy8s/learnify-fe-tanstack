import { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";

import CubeLoader from "@/components/CubeLoader";
import type { TTeacherAnimation } from "../TeacherAnimation/type";
import type { TTeacherStatus } from "../TeacherStatusIndicator/type";
import TeacherAvatar2D from "../TeacherAvatar2D";
import TeacherStatusIndicator from "../TeacherStatusIndicator";
import TeacherController from "../TeacherController";
import "./style.scss";

const TeacherContainer = lazy(() => import("../TeacherContainer"));

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
  onReload?: () => void;
  ttsSpeed?: number;
  onTtsSpeedChange?: (speed: number) => void;
  autoScroll?: boolean;
  onAutoScrollChange?: (enabled: boolean) => void;
};

const TeacherPanel = (props: TTeacherPanelProps) => {
  const { t } = useTranslation();
  const LOADING_MESSAGES = [
    t("teacher_panel.loading_env"),
    t("teacher_panel.loading_model"),
    t("teacher_panel.loading_animations"),
    t("teacher_panel.ready"),
  ];
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
    onReload,
    ttsSpeed,
    onTtsSpeedChange,
    autoScroll,
    onAutoScrollChange,
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
    onReload,
    ttsSpeed,
    onTtsSpeedChange,
    autoScroll,
    onAutoScrollChange,
  };

  if (is3DMode) {
    return (
      <Suspense
        fallback={
          <div className="teacher-panel teacher-panel--fallback">
            <CubeLoader />
          </div>
        }
      >
        <TeacherContainer
          animation={animation}
          onModelReady={onModelReady}
          onModelsReady={onModelsReady}
          isLoading={!modelsReady}
          loadingMessage={
            state === "initial"
              ? t("teacher_panel.enriching")
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
    <div className="teacher-panel teacher-panel--2d-mode">
      <TeacherAvatar2D animation={animation} />
      <TeacherStatusIndicator status={status} />
      <TeacherController {...commonControllerProps} />
    </div>
  );
};

export default TeacherPanel;
