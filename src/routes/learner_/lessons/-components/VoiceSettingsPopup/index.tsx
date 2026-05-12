import classnames from "classnames";

import type { TVoiceSettingsPopupProps } from "./type.d";

import "./style.scss";

const VOICE_OPTIONS = [
  {
    id: "21mAOkJ9QZ3WBdAmXlRS",
    label: "Aria",
    description: "African American",
  },
  { id: "XB0fDUnXU5powFXDhCwa", label: "Charlotte", description: "British" },
  { id: "AZnzlk1XvdvUeBnXmlfg", label: "Domi", description: "American" },
  { id: "pNInz6obpgDQGcFmaJgB", label: "Rachel", description: "American" },
  { id: "EXAVITQu4vr4xnSDxMaL", label: "Sarah", description: "Soft Female" },
] as const;

const VoiceSettingsPopup = (props: TVoiceSettingsPopupProps) => {
  const { selectedVoiceId, onSelectVoice, onPreviewVoice, onClose, className } =
    props;

  return (
    <div className={classnames("voice-settings-popup", className)}>
      <div className="voice-settings-popup_header">
        <span className="voice-settings-popup_title">Voice Settings</span>
        <button className="voice-settings-popup_close" onClick={onClose}>
          <span className="material-symbols-rounded">close</span>
        </button>
      </div>
      <div className="voice-settings-popup_options">
        {VOICE_OPTIONS.map((voice) => (
          <div
            key={voice.id}
            className={classnames("voice-settings-popup_option", {
              "voice-settings-popup_option--selected":
                voice.id === selectedVoiceId,
            })}
            onClick={() => onSelectVoice(voice.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelectVoice(voice.id)}
          >
            <div className="voice-settings-popup_option-info">
              <span className="voice-settings-popup_option-label">
                {voice.label}
              </span>
              <span className="voice-settings-popup_option-desc">
                {voice.description}
              </span>
            </div>
            {onPreviewVoice && (
              <button
                className="voice-settings-popup_option-play"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreviewVoice(voice.id);
                }}
              >
                <span className="material-symbols-rounded">play_arrow</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceSettingsPopup;
