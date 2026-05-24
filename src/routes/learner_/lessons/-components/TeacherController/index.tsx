import IconButton from "@/components/IconButton";
import { COLORS } from "@/styles/colors";
import classnames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import VoiceSettingsPopup from "../VoiceSettingsPopup";
import "./style.scss";
import type { TTeacherControllerProps } from "./type";

const TeacherController = (props: TTeacherControllerProps) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    status,
    isMuted,
    isSettingsOpen,
    selectedVoiceId,
    is3DMode,
    isLoading = false,
    loadingMessage = t("teacher_controller.loading"),
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

  const renderButtons = (className: string) => (
    <div className={className}>
      <IconButton
        icon={isPaused ? "play_arrow" : "pause"}
        onClick={isPaused ? onResume : onPause}
        disabled={!isSpeaking && !isPaused}
        loading={isLoading}
        tooltip={
          isPaused
            ? t("teacher_controller.resume")
            : t("teacher_controller.pause")
        }
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
        tooltip={t("teacher_controller.stop")}
        size="tiny"
        type="secondary"
        color={COLORS.white}
        backgroundColor={COLORS.modeOrange}
      />

      <IconButton
        icon={isMuted ? "volume_off" : "volume_up"}
        onClick={isMuted ? onUnmute : onMute}
        tooltip={
          isMuted
            ? t("teacher_controller.unmute")
            : t("teacher_controller.mute")
        }
        loading={isLoading}
        size="tiny"
        type="secondary"
        color={COLORS.white}
        backgroundColor={COLORS.modeNavy}
      />

      <IconButton
        icon="settings"
        onClick={isSettingsOpen ? onCloseSettings : onOpenSettings}
        tooltip={t("teacher_controller.settings")}
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
        tooltip={
          is3DMode
            ? t("teacher_controller.switch_2d")
            : t("teacher_controller.switch_3d")
        }
        loading={isLoading}
        size="tiny"
        type="secondary"
        color={COLORS.white}
        backgroundColor={is3DMode ? COLORS.neutral900 : COLORS.modeDarkGreen}
      />
    </div>
  );

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

      {renderButtons("teacher-controller_buttons")}

      <IconButton
        icon="more_vert"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        tooltip={t("teacher_controller.menu")}
        size="tiny"
        type="secondary"
        color={COLORS.white}
        backgroundColor={COLORS.neutral900}
        className="teacher-controller_mobile-toggle"
      />

      {isMobileMenuOpen && renderButtons("teacher-controller_mobile-menu")}

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
