import { useState, useRef, useCallback, useEffect } from "react";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import type { TTeacherAnimation } from "../-components/TeacherAnimation/type";
import type { TTeacherStatus } from "../-components/TeacherStatusIndicator/type";
import type { TChatMessageRef } from "../-components/ChatMessageWrapper";

const DEFAULT_VOICE_ID =
  import.meta.env.VITE_EDGETTS_VOICE_ID || "vi-VN-HoaiMyNeural";

const LOADING_MESSAGES = [
  "Loading 3D environment...",
  "Loading teacher model...",
  "Initializing animations...",
  "Ready!",
];

export type TTeacher = {
  animation: TTeacherAnimation;
  status: TTeacherStatus;
  isMuted: boolean;
  isSettingsOpen: boolean;
  selectedVoiceId: string;
  is3DMode: boolean;
  isModelReady: boolean;
  modelsReady: boolean;
  loadingMessageIndex: number;
  chatRef: React.RefObject<TChatMessageRef | null>;
  stopChat: () => void;
  handleModelReady: () => void;
  handleModelsReady: () => void;
  handlePause: () => void;
  handleResume: () => void;
  handleStop: () => void;
  handleSelectVoice: (voiceId: string) => void;
  handlePreviewVoice: (voiceId: string) => void;
  setAnimation: (animation: TTeacherAnimation) => void;
  setStatus: (status: TTeacherStatus) => void;
  setIsMuted: (muted: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
  toggle3DMode: (enabled: boolean) => void;
};

const useTeacher = (): TTeacher => {
  const [animation, setAnimation] = useState<TTeacherAnimation>("Idle");
  const [status, setStatus] = useState<TTeacherStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState(DEFAULT_VOICE_ID);

  const getInitial3DMode = (): boolean => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("learnify_3d_mode") !== "false";
  };
  const [is3DMode, setIs3DMode] = useState(getInitial3DMode);
  const [isModelReady, setIsModelReady] = useState(false);
  const [modelsReady, setModelsReady] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const chatRef = useRef<TChatMessageRef>(null);

  useEffect(() => {
    if (!isModelReady) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => {
          if (prev < LOADING_MESSAGES.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isModelReady]);

  const handleModelReady = useCallback(() => {
    setIsModelReady(true);
    setLoadingMessageIndex(LOADING_MESSAGES.length - 1);
  }, []);

  const handleModelsReady = useCallback(() => {
    setModelsReady(true);
  }, []);

  const { speak: previewSpeak } = useSpeechSynthesis();

  const handlePreviewVoice = useCallback(
    (voiceId: string) => {
      previewSpeak(
        "This is a test of the voice. The quick brown fox jumps over the lazy dog.",
        { rate: 1, pitch: 1, volume: 1, voiceId }
      );
    },
    [previewSpeak]
  );

  const handlePause = useCallback(() => chatRef.current?.pause(), []);
  const handleResume = useCallback(() => chatRef.current?.resume(), []);
  const handleStop = useCallback(() => chatRef.current?.stop(), []);
  const handleSelectVoice = useCallback(
    (voiceId: string) => setSelectedVoiceId(voiceId),
    []
  );
  const stopChat = useCallback(() => chatRef.current?.stop(), []);

  const toggle3DMode = useCallback((enabled: boolean) => {
    setIs3DMode(enabled);
    localStorage.setItem("learnify_3d_mode", String(enabled));
  }, []);

  return {
    animation,
    status,
    isMuted,
    isSettingsOpen,
    selectedVoiceId,
    is3DMode,
    isModelReady,
    modelsReady,
    loadingMessageIndex,
    chatRef,
    stopChat,
    handleModelReady,
    handleModelsReady,
    handlePause,
    handleResume,
    handleStop,
    handleSelectVoice,
    handlePreviewVoice,
    setAnimation,
    setStatus,
    setIsMuted,
    setIsSettingsOpen,
    toggle3DMode,
  };
};

export default useTeacher;
