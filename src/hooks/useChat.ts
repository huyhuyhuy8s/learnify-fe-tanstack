import { useCallback, useEffect, useRef, useState } from "react";
import type { TTeacherAnimation } from "@/routes/learner_/lessons/-components/TeacherAnimation/type";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import type { TMessage } from "@/routes/learner_/lessons/-components/ChatMessage/type";
import {
  MOCK_ANSWERS,
  TALKING_ANIMATIONS,
  THINKING_VARIANTS,
} from "@/mock/chats";

const randomFrom = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]!;

type TTeacherStatus = "idle" | "thinking" | "speaking" | "paused";

type TUseChatProps = {
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>;
  onAnimationChange: (animation: TTeacherAnimation) => void;
  onStatusChange: (status: TTeacherStatus) => void;
  isMuted?: boolean;
};

type TUseChatReturn = {
  sendMessage: (question: string) => Promise<void>;
  isLoading: boolean;
  isSpeaking: boolean;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

const useChat = (props: TUseChatProps): TUseChatReturn => {
  const {
    setMessages,
    onAnimationChange,
    onStatusChange,
    isMuted = false,
  } = props;
  const {
    speak,
    stop: stopSpeech,
    pause,
    resume,
    isSpeaking,
  } = useSpeechSynthesis();
  const [isLoading, setIsLoading] = useState(false);
  const isSpeakingRef = useRef(isSpeaking);
  const isMutedRef = useRef(isMuted);
  const statusRef = useRef<TTeacherStatus>("idle");

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const sendMessage = useCallback(
    async (question: string) => {
      setIsLoading(true);
      onStatusChange("thinking");
      onAnimationChange("Thinking");

      const thinkingId = Date.now().toString();
      const thinkingContent = randomFrom(THINKING_VARIANTS);

      const thinkingMessage: TMessage = {
        id: thinkingId,
        content: thinkingContent,
        sender: "teacher",
        timestamp: new Date(),
        type: "text",
      };

      setMessages((prev) => [...prev, thinkingMessage]);

      const delay = 2000 + Math.random() * 2000;

      await new Promise<void>((resolve) => setTimeout(resolve, delay));

      const answer = randomFrom(MOCK_ANSWERS);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId ? { ...msg, content: answer } : msg
        )
      );

      onAnimationChange(randomFrom(TALKING_ANIMATIONS));

      if (!isMutedRef.current) {
        onStatusChange("speaking");
        await speak(answer);
      } else {
        await new Promise<void>((resolve) => setTimeout(resolve, 3000));
      }

      onStatusChange("idle");
      onAnimationChange("Idle");
      setIsLoading(false);
    },
    [setMessages, onAnimationChange, onStatusChange, speak]
  );

  const handleStop = useCallback(() => {
    stopSpeech();
    onStatusChange("idle");
    onAnimationChange("Idle");
    setIsLoading(false);
  }, [stopSpeech, onStatusChange, onAnimationChange]);

  const handlePause = useCallback(() => {
    pause();
    onStatusChange("paused");
  }, [pause, onStatusChange]);

  const handleResume = useCallback(() => {
    resume();
    onStatusChange("speaking");
  }, [resume, onStatusChange]);

  return {
    sendMessage,
    isLoading,
    isSpeaking,
    pause: handlePause,
    resume: handleResume,
    stop: handleStop,
  };
};

export default useChat;
