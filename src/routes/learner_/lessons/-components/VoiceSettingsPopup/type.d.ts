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
  className?: string;
};
