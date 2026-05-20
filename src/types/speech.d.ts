export type TSpeechSynthesisOptions = {
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceId?: string;
  muted?: boolean;
};

export type TSpeechSynthesisReturn = {
  speak: (
    text: string,
    options?: TSpeechSynthesisOptions
  ) => Promise<HTMLAudioElement | null>;
  prefetch: (text: string, options?: TSpeechSynthesisOptions) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
};
