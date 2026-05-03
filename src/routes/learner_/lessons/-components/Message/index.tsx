import classnames from "classnames";
import "./style.scss";
import type { TMessageProps } from "./type";

const Message = (props: TMessageProps) => {
  const { message, className } = props;
  const { content, sender, timestamp } = message;

  const cls = classnames("message", `message-${sender}`, className);

  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cls}>
      <div className="message-content">
        <p className="message-text">{content}</p>
        <small className="message-time">{formattedTime}</small>
      </div>
    </div>
  );
};

export default Message;
