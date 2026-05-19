import { memo, useRef, useState, useLayoutEffect, useMemo } from "react";
import classnames from "classnames";
import { prepare, layout } from "@chenglou/pretext";
import Icon from "@/components/Icon";
import type { TMessageProps } from "./type";
import "./style.scss";

const FONT = '14px "Google Sans Flex", system-ui, sans-serif';
const LINE_HEIGHT = 21;
const BUBBLE_PAD = 24;
const MAX_BUBBLE_RATIO = 0.7;
const MIN_BUBBLE_HEIGHT = 36;

const ChatMessage = (props: TMessageProps) => {
  const { message, className } = props;
  const { content, sender, timestamp, type, imageUrl } = message;
  const bodyRef = useRef<HTMLDivElement>(null);
  const [bubbleHeight, setBubbleHeight] = useState<number | null>(null);

  const formattedTime = useMemo(
    () =>
      new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [timestamp]
  );

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const list = body.closest(".chat-messages-list");
    if (!list) return;

    const maxWidth = list.clientWidth * MAX_BUBBLE_RATIO - BUBBLE_PAD;
    const prepared = prepare(content, FONT);
    const { height } = layout(prepared, Math.max(maxWidth, 50), LINE_HEIGHT);

    setBubbleHeight(Math.max(height + BUBBLE_PAD, MIN_BUBBLE_HEIGHT));
  }, [content]);

  const cls = classnames("message", `message-${sender}`, className);

  return (
    <div className={cls}>
      <div className="message-avatar">
        <Icon name={sender === "teacher" ? "smart_toy" : "person"} />
      </div>
      <div
        className="message-body"
        ref={bodyRef}
        style={bubbleHeight ? { minHeight: bubbleHeight } : undefined}
      >
        <div className="message-bubble">
          {type === "image" && imageUrl ? (
            <img className="message-image" src={imageUrl} alt={content} />
          ) : (
            <p className="message-text">{content}</p>
          )}
        </div>
        <span className="message-time">{formattedTime}</span>
      </div>
    </div>
  );
};

export default memo(ChatMessage);
