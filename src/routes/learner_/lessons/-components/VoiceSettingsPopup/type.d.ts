export type TVoiceOption = {
  id: string;
  label: string;
  description: string;
};

export type TVoiceSettingsPopupProps = {
  selectedVoiceId: string;
  onSelectVoice: (voiceId: string) => void;
  onPreviewVoice?: (voiceId: string) => void;
  onClose: () => void;
  ttsSpeed?: number;
  onTtsSpeedChange?: (speed: number) => void;
  autoScroll?: boolean;
  onAutoScrollChange?: (enabled: boolean) => void;
  className?: string;
};
