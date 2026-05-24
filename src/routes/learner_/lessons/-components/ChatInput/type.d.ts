export type TChatInputProps = {
  onSendMessage: (message: string) => void;
  onAttachFile?: () => void;
  onVoiceInput?: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};
