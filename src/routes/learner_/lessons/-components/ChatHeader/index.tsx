import { useLayoutEffect, useRef } from "react";
import classnames from "classnames";
import { prepareWithSegments, walkLineRanges } from "@chenglou/pretext";
import "./style.scss";
import IconButton from "@/components/IconButton";
import { COLORS } from "@/styles/colors";
import _ from "lodash";

export type TChatHeaderProps = {
  className?: string;
};

const ChatHeader = (props: TChatHeaderProps) => {
  const { className } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const adjustWidth = () => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    if (_.isEmpty(input.value)) input.value = "New Conversation";
    const font = "500 25px Google Sans Flex";

    if (font) {
      try {
        const screenWidth = document.querySelector(
          "body > section > div > div > div.chat-header > div.chat-header-context"
        );
        const prepared = prepareWithSegments(input.value, font, {
          whiteSpace: "pre-wrap",
        });
        let maxW = 0;
        walkLineRanges(
          prepared,
          screenWidth ? screenWidth.clientWidth - 100 : 300,
          (line) => {
            if (line.width > maxW) maxW = line.width;
          }
        );
        input.style.width = `${Math.ceil(maxW) + 2}px`;
      } catch (error) {
        console.error("Failed to measure text width with pretext:", error);
      }
    }
  };

  useLayoutEffect(() => {
    adjustWidth();
  }, []);

  const cls = classnames("chat-header", className);

  return (
    <form className={cls}>
      <div className="chat-header-context">
        <span className="material-symbols-rounded">chat</span>
        <input
          id="chat-header-input"
          ref={inputRef}
          className="chat-header-context-title medium"
          onChange={adjustWidth}
        />
        <IconButton
          icon="arrow_drop_down"
          type="secondary"
          size="tiny"
          className="chat-header-context-dropdown"
        />
      </div>
      <div className="chat-header-actions">
        <IconButton
          icon="last_page"
          onClick={() => {}}
          size="tiny"
          color={COLORS.white}
          backgroundColor={COLORS.accentLilacVodka}
        />
        <IconButton
          icon="keyboard_double_arrow_right"
          onClick={() => {}}
          size="tiny"
          color={COLORS.white}
          backgroundColor={COLORS.accentBlueCeleste}
        />
        <IconButton
          icon="stat_3"
          onClick={() => {}}
          size="tiny"
          color={COLORS.white}
          backgroundColor={COLORS.accentPortage}
        />
        <IconButton
          icon="flag"
          onClick={() => {}}
          size="tiny"
          color={COLORS.white}
          backgroundColor={COLORS.modeOrange}
        />
      </div>
    </form>
  );
};

export default ChatHeader;
