import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import classNames from "classnames";

import ChatMessage from "../ChatMessage";
import type { TMessage } from "../ChatMessage/type";
import ChatInput from "../ChatInput";
import useChat from "@/hooks/useChat";
import useLessonPlayback from "@/hooks/useLessonPlayback";
import type { TTeacherAnimation } from "../TeacherAnimation/type";
import type { TTeacherStatus } from "../TeacherStatusIndicator/type";
import { logger } from "@/utils/logger";
import "./style.scss";

export type TChatMessageRef = {
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

type SectionItem = {
  id: string;
  urlPdf: string;
  content?: string;
  order: number;
  lecturer_segment: string[];
};

type TChatMessageWrapperProps = {
  onAnimationChange: (animation: TTeacherAnimation) => void;
  onStatusChange: (status: TTeacherStatus) => void;
  isMuted?: boolean;
  className?: string;
  mode?: "qa" | "lesson";
  sections?: SectionItem[];
  onLessonComplete?: () => void;
};

const ChatMessageWrapper = forwardRef<
  TChatMessageRef,
  TChatMessageWrapperProps
>((props, ref) => {
  const {
    onAnimationChange,
    onStatusChange,
    isMuted = false,
    className,
    mode = "qa",
    sections = [],
    onLessonComplete,
  } = props;
  const [messages, setMessages] = useState<TMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const playbackStartedRef = useRef(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);

  const scrollToBottom = useCallback(() => {
    if (isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const sentinel = messagesEndRef.current;
    const container = messagesContainerRef.current;
    if (!sentinel || !container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isNearBottomRef.current = entry.isIntersecting;
      },
      {
        root: container,
        rootMargin: "0px 0px 100px 0px",
      }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const chat = useChat({
    setMessages,
    onAnimationChange,
    onStatusChange,
    isMuted,
  });

  const {
    start: playbackStart,
    pause: playbackPause,
    resume: playbackResume,
    stop: playbackStop,
    messages: playbackMessages,
  } = useLessonPlayback({
    sections,
    onAnimationChange,
    onStatusChange,
    isMuted,
    onComplete: () => onLessonComplete?.(),
  });

  useEffect(() => {
    logger.debug(
      `[ChatMessageWrapper] effect | mode=${mode} | started=${playbackStartedRef.current} | sections.length=${sections.length}`
    );
    if (
      mode === "lesson" &&
      !playbackStartedRef.current &&
      sections.length > 0
    ) {
      playbackStartedRef.current = true;
      logger.debug("[ChatMessageWrapper] calling playbackStart()");
      playbackStart();
    }
    if (mode !== "lesson") {
      playbackStartedRef.current = false;
    }
  }, [mode, sections.length, playbackStart]);

  useImperativeHandle(ref, () => {
    if (mode === "lesson") {
      return {
        pause: playbackPause,
        resume: playbackResume,
        stop: playbackStop,
      };
    }
    return {
      pause: chat.pause,
      resume: chat.resume,
      stop: chat.stop,
    };
  }, [
    mode,
    playbackPause,
    playbackResume,
    playbackStop,
    chat.pause,
    chat.resume,
    chat.stop,
  ]);

  const displayMessages = mode === "lesson" ? playbackMessages : messages;

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      const newMessage: TMessage = {
        id: crypto.randomUUID(),
        content,
        sender: "user",
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, newMessage]);
      await chat.sendMessage(content);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chat.sendMessage]
  );

  return (
    <div className={classNames("chat-messages", className)}>
      <div className="chat-messages-list" ref={messagesContainerRef}>
        {displayMessages.length === 0 ? (
          <div className="chat-messages-empty">
            <span className="material-symbols-rounded">chat</span>
            <p className="chat-messages-empty-text">
              {mode === "lesson"
                ? "Preparing your lesson..."
                : "Start a conversation with your AI tutor"}
            </p>
          </div>
        ) : (
          displayMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      {mode === "qa" && (
        <ChatInput
          onSendMessage={handleSendMessage}
          placeholder="Ask your AI tutor anything..."
          disabled={chat.isLoading || chat.isSpeaking}
        />
      )}
    </div>
  );
});

export default ChatMessageWrapper;
