import classnames from "classnames";
import { useTranslation } from "react-i18next";

import Icon from "@/components/Icon";
import { useThemeStore } from "@/store/themeStore";
import type { TVoiceSettingsPopupProps } from "./type";

import "./style.scss";

const VOICE_OPTIONS = [
  { id: "hpp4J3VqNfWAUOO0d1Us", label: "Default" },
] as const;

const VoiceSettingsPopup = (props: TVoiceSettingsPopupProps) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const {
    selectedVoiceId,
    onSelectVoice,
    onPreviewVoice,
    onClose,
    ttsSpeed = 1,
    onTtsSpeedChange,
    autoScroll = true,
    onAutoScrollChange,
    className,
  } = props;

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

      <div className="voice-settings-popup_section">
        <span className="voice-settings-popup_section-title">
          {t("voice_settings.voice_label")}
        </span>
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

      {onTtsSpeedChange && (
        <div className="voice-settings-popup_section">
          <span className="voice-settings-popup_section-title">
            {t("voice_settings.speed_label")}
          </span>
          <div className="voice-settings-popup_slider-row">
            <span className="voice-settings-popup_slider-label">0.5x</span>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={ttsSpeed}
              onChange={(e) => onTtsSpeedChange(parseFloat(e.target.value))}
              className="voice-settings-popup_slider"
            />
            <span className="voice-settings-popup_slider-label">2x</span>
            <span className="voice-settings-popup_slider-value">
              {ttsSpeed.toFixed(1)}x
            </span>
          </div>
        </div>
      )}

      {onAutoScrollChange && (
        <div className="voice-settings-popup_section">
          <div className="voice-settings-popup_toggle-row">
            <span className="voice-settings-popup_section-title">
              {t("voice_settings.auto_scroll_label")}
            </span>
            <button
              className={classnames("voice-settings-popup_toggle", {
                "voice-settings-popup_toggle--on": autoScroll,
              })}
              onClick={() => onAutoScrollChange(!autoScroll)}
            >
              <div className="voice-settings-popup_toggle-knob" />
            </button>
          </div>
        </div>
      )}

      <div className="voice-settings-popup_section">
        <div className="voice-settings-popup_action-row">
          <div className="voice-settings-popup_action-row-left">
            <Icon name={theme === "dark" ? "dark_mode" : "light_mode"} />
            <span>{t("voice_settings.theme_label")}</span>
          </div>
          <button
            className="voice-settings-popup_action-btn"
            onClick={toggleTheme}
          >
            {theme === "dark"
              ? t("voice_settings.dark")
              : t("voice_settings.light")}
          </button>
        </div>
      </div>

      <div className="voice-settings-popup_section">
        <div className="voice-settings-popup_action-row">
          <div className="voice-settings-popup_action-row-left">
            <Icon name="language" />
            <span>{t("voice_settings.language_label")}</span>
          </div>
          <button
            className="voice-settings-popup_action-btn"
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "vi" : "en")
            }
          >
            {i18n.language === "en" ? "EN" : "VI"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettingsPopup;
