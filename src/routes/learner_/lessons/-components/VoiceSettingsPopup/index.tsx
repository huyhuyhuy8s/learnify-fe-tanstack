import classnames from "classnames";
import { useTranslation } from "react-i18next";

import Icon from "@/components/Icon";
import type { TVoiceSettingsPopupProps } from "./type";

import "./style.scss";

const VOICE_OPTIONS = [
  { id: "21mAOkJ9QZ3WBdAmXlRS", label: "Aria" },
  { id: "XB0fDUnXU5powFXDhCwa", label: "Charlotte" },
  { id: "AZnzlk1XvdvUeBnXmlfg", label: "Domi" },
  { id: "pNInz6obpgDQGcFmaJgB", label: "Rachel" },
  { id: "EXAVITQu4vr4xnSDxMaL", label: "Sarah" },
] as const;

const VoiceSettingsPopup = (props: TVoiceSettingsPopupProps) => {
  const { t } = useTranslation();
  const { selectedVoiceId, onSelectVoice, onPreviewVoice, onClose, className } =
    props;

  const translatedVoices = t("voice_settings.voices", {
    returnObjects: true,
  }) as Array<{ label: string; description: string }>;

  return (
    <div className={classnames("voice-settings-popup", className)}>
      <div className="voice-settings-popup_header">
        <span className="voice-settings-popup_title">
          {t("voice_settings.title")}
        </span>
        <button className="voice-settings-popup_close" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      <div className="voice-settings-popup_options">
        {VOICE_OPTIONS.map((voice, index) => {
          const translated = translatedVoices[index];
          return (
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
                  {translated?.description}
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
                  <Icon name="play_arrow" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VoiceSettingsPopup;
