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
    onPause,
    onResume,
    onStop,
    onMute,
    onUnmute,
    onOpenSettings,
    onCloseSettings,
    onSelectVoice,
    onPreviewVoice,
    className,
  } = props;

  const isIdle = status === "idle";
  const isPaused = status === "paused";
  const isSpeaking = status === "speaking";
  const isThinking = status === "thinking";

  return (
    <div className={classnames("teacher-controller", className)}>
      <div className="teacher-controller_buttons">
        <IconButton
          icon={isPaused ? "play_arrow" : "pause"}
          onClick={isPaused ? onResume : onPause}
          disabled={!isSpeaking && !isPaused}
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
          tooltip="Stop"
          size="tiny"
          type="secondary"
          color={COLORS.white}
          backgroundColor={COLORS.modeOrange}
        />

        <IconButton
          icon={isMuted ? "volume_off" : "volume_up"}
          onClick={isMuted ? onUnmute : onMute}
          disabled={isThinking || isSpeaking || isPaused}
          tooltip={isMuted ? "Unmute" : "Mute"}
          size="tiny"
          type="secondary"
          color={COLORS.white}
          backgroundColor={COLORS.modeNavy}
        />

        <IconButton
          icon="settings"
          onClick={isSettingsOpen ? onCloseSettings : onOpenSettings}
          tooltip="Settings"
          size="tiny"
          type="secondary"
          color={COLORS.white}
          backgroundColor={
            isSettingsOpen ? COLORS.modeDarkGreen : COLORS.neutral900
          }
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
