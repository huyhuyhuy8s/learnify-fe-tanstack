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
import type { TTeacherAnimation } from "../TeacherAnimation/type";
import type { TTeacherStatus } from "../TeacherStatusIndicator/type";
import "./style.scss";

export type TChatMessageRef = {
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

type TChatMessageWrapperProps = {
  onAnimationChange: (animation: TTeacherAnimation) => void;
  onStatusChange: (status: TTeacherStatus) => void;
  isMuted?: boolean;
  className?: string;
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
  } = props;
  const [messages, setMessages] = useState<TMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const { sendMessage, isLoading, isSpeaking, pause, resume, stop } = useChat({
    setMessages,
    onAnimationChange,
    onStatusChange,
    isMuted,
  });

  useImperativeHandle(
    ref,
    () => ({
      pause,
      resume,
      stop,
    }),
    [pause, resume, stop]
  );

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
      await sendMessage(content);
    },
    [sendMessage]
  );

  return (
    <div className={classNames("chat-messages", className)}>
      <div className="chat-messages-list">
        {messages.length === 0 ? (
          <div className="chat-messages-empty">
            <span className="material-symbols-rounded">chat</span>
            <p className="chat-messages-empty-text">
              Start a conversation with your AI tutor
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        placeholder="Ask your AI tutor anything..."
        disabled={isLoading || isSpeaking}
      />
    </div>
  );
});

export default ChatMessageWrapper;
