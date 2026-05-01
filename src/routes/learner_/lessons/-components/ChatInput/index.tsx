import classnames from "classnames";
import { useState, useRef } from "react";
import lodash from "lodash";
import type { TChatInputProps } from "./type";
import "./style.scss";

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

  const handleInputChange = lodash.debounce((value: string) => {
    setMessage(value);
  }, 300);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.value = "";
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
      <div className="chat-input-wrapper">
        {onAttachFile && (
          <button
            className="chat-input-action"
            onClick={onAttachFile}
            disabled={disabled}
            aria-label="Attach file"
          >
            <span className="material-symbols-rounded">attach_file</span>
          </button>
        )}
        <textarea
          ref={textareaRef}
          className="chat-input-field"
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          aria-label="Message input"
        />
        {onVoiceInput && (
          <button
            className="chat-input-action"
            onClick={onVoiceInput}
            disabled={disabled}
            aria-label="Voice input"
          >
            <span className="material-symbols-rounded">mic</span>
          </button>
        )}
        <button
          className={classnames("chat-input-send", {
            "chat-input-send-disabled": !message.trim() || disabled,
          })}
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          aria-label="Send message"
        >
          <span className="material-symbols-rounded">send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
