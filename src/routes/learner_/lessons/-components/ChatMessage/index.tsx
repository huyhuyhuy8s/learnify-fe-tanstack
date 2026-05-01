import classnames from "classnames";
import type { TChatMessageProps } from "./type";
import "./style.scss";

const ChatMessage = (props: TChatMessageProps) => {
  const { message, className } = props;
  const { content, sender, timestamp } = message;

  const cls = classnames("chat-message", `chat-message-${sender}`, className);

  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cls}>
      <div className="chat-message-content">
        <p className="chat-message-text">{content}</p>
        <small className="chat-message-time">{formattedTime}</small>
      </div>
    </div>
  );
};

export default ChatMessage;
