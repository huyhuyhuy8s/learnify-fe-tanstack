import type { TTeacherStatus } from "../TeacherStatusIndicator/type.d";

export type TTeacherControllerProps = {
  status: TTeacherStatus;
  isMuted: boolean;
  isSettingsOpen: boolean;
  selectedVoiceId: string;
  is3DMode: boolean;
  isLoading?: boolean;
  loadingMessage?: string;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onMute: () => void;
  onUnmute: () => void;
  onOpenSettings: () => void;
  onCloseSettings: () => void;
  onSelectVoice: (voiceId: string) => void;
  onPreviewVoice?: (voiceId: string) => void;
  onToggle3DMode: (enabled: boolean) => void;
  className?: string;
};
