import classnames from "classnames";
import { useState, useRef, useEffect } from "react";
import type { TChatInputProps } from "./type";
import "./style.scss";
import IconButton from "@/components/IconButton";
import debounce from "lodash/debounce";

const MIN_HEIGHT = 20;
const MAX_HEIGHT = 200;

const ChatInput = (props: TChatInputProps) => {
  const {
    onSendMessage,
    onAttachFile,
    onVoiceInput,
    disabled = false,
    placeholder = "Type your message...",
    className,
  } = props;

  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, MIN_HEIGHT), MAX_HEIGHT)}px`;
    }
  }, [message]);

  const handleInputChange = debounce((value: string) => {
    setMessage(value);
  }, 300);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.value = "";
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const cls = classnames("chat-input", className);

  return (
    <div className={cls}>
      <IconButton
        className={classnames("chat-input-action", { disabled: !onAttachFile })}
        onClick={onAttachFile}
        disabled={!onAttachFile}
        aria-label="Attach file"
        icon="attach_file"
        type="secondary"
        size="tiny"
        tooltip="Attach File"
      />
      <textarea
        ref={textareaRef}
        className="chat-input-field"
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Message input"
        rows={1}
      />
      <IconButton
        className={classnames("chat-input-action", { disabled: !onVoiceInput })}
        onClick={onVoiceInput}
        aria-label="Voice input"
        icon="mic"
        type="secondary"
        size="tiny"
        tooltip="Voice Input"
        disabled={!onVoiceInput}
      />
      <IconButton
        className={classnames("chat-input-send", {
          disabled: !message.trim() || disabled,
        })}
        size="tiny"
        type="secondary"
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        aria-label="Send message"
        icon="send"
        tooltip="Send Message"
      />
    </div>
  );
};

export default ChatInput;
