import classnames from "classnames";

import IconButton from "@/components/IconButton";
import { COLORS } from "@/styles/colors";
import VoiceSettingsPopup from "../VoiceSettingsPopup";
import type { TTeacherControllerProps } from "./type.d";

import "./style.scss";

const TeacherController = (props: TTeacherControllerProps) => {
  const {
    status,
    isMuted,
    isSettingsOpen,
    selectedVoiceId,
    is3DMode,
    isLoading = false,
    loadingMessage = "Loading...",
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
    className,
  } = props;

  const isIdle = status === "idle";
  const isPaused = status === "paused";
  const isSpeaking = status === "speaking";
  const isThinking = status === "thinking";

  return (
    <div className={classnames("teacher-controller", className)}>
      {isLoading && (
        <div className="teacher-controller_loading-overlay">
          <div className="teacher-controller_loading-spinner" />
          <span className="teacher-controller_loading-text">
            {loadingMessage}
          </span>
        </div>
      )}
      <div className="teacher-controller_buttons">
        <IconButton
          icon={isPaused ? "play_arrow" : "pause"}
          onClick={isPaused ? onResume : onPause}
          disabled={!isSpeaking && !isPaused}
          loading={isLoading}
          tooltip={isPaused ? "Resume" : "Pause"}
          size="tiny"
          type="secondary"
          color={COLORS.white}
          backgroundColor={COLORS.modeSalmon}
        />

        <IconButton
          icon="stop"
          onClick={onStop}
          disabled={isIdle || isThinking}
          loading={isLoading}
          tooltip="Stop"
          size="tiny"
          type="secondary"
          color={COLORS.white}
          backgroundColor={COLORS.modeOrange}
        />

        <IconButton
          icon={isMuted ? "volume_off" : "volume_up"}
          onClick={isMuted ? onUnmute : onMute}
          tooltip={isMuted ? "Unmute" : "Mute"}
          loading={isLoading}
          size="tiny"
          type="secondary"
          color={COLORS.white}
          backgroundColor={COLORS.modeNavy}
        />

        <IconButton
          icon="settings"
          onClick={isSettingsOpen ? onCloseSettings : onOpenSettings}
          tooltip="Settings"
          loading={isLoading}
          size="tiny"
          type="secondary"
          color={COLORS.white}
          backgroundColor={
            isSettingsOpen ? COLORS.modeDarkGreen : COLORS.neutral900
          }
        />

        <IconButton
          icon={is3DMode ? "image" : "view_in_ar"}
          onClick={() => onToggle3DMode(!is3DMode)}
          tooltip={is3DMode ? "Switch to 2D" : "Switch to 3D"}
          loading={isLoading}
          size="tiny"
          type="secondary"
          color={COLORS.white}
          backgroundColor={is3DMode ? COLORS.neutral900 : COLORS.modeDarkGreen}
        />
      </div>

      {isSettingsOpen && (
        <div
          className="teacher-controller_popup-overlay"
          onClick={onCloseSettings}
        >
          <div
            className="teacher-controller_popup"
            onClick={(e) => e.stopPropagation()}
          >
            <VoiceSettingsPopup
              selectedVoiceId={selectedVoiceId}
              onSelectVoice={onSelectVoice}
              onPreviewVoice={onPreviewVoice}
              onClose={onCloseSettings}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherController;
