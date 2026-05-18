import classnames from "classnames";
import "./style.scss";
import IconButton from "@/components/IconButton";
import { COLORS } from "@/styles/colors";
import { useChatHeader } from "./-hooks/useChatHeader";
import type { TChatHeaderProps } from "./type";

const ChatHeader = (props: TChatHeaderProps) => {
  const {
    className,
    initialValue,
    onUpdate,
    onSkipLesson,
    onSkipQA,
    onSkipQuiz,
    onFlag,
    state,
  } = props;
  const { inputRef, wrapperRef, handleInputChange, handleSubmit } =
    useChatHeader({
      placeholder: "New Conversation",
      initialValue,
      onUpdate,
    });

  const cls = classnames("chat-header", className);

  return (
    <form className={cls} onSubmit={handleSubmit}>
      <div className="chat-header-context" ref={wrapperRef}>
        <span
          className="material-symbols-rounded"
          style={{ pointerEvents: "none" }}
        >
          chat
        </span>
        <div>
          <input
            id="chat-header-input"
            ref={inputRef}
            className="chat-header-context-title medium"
            placeholder="New Conversation"
            onChange={handleInputChange}
          />
          <IconButton
            icon="arrow_drop_down"
            type="secondary"
            size="tiny"
            tooltip="Change topic"
            className="chat-header-context-dropdown"
          />
        </div>
      </div>
      <div className="chat-header-actions">
        {state && state !== "initial" && state !== "complete" && (
          <>
            {state === "lesson" && (
              <IconButton
                icon="last_page"
                onClick={onSkipLesson}
                size="tiny"
                color={COLORS.white}
                backgroundColor={COLORS.accentLilacVodka}
                tooltip="Skip to Q&A"
              />
            )}
            {state === "qa" && (
              <IconButton
                icon="keyboard_double_arrow_right"
                onClick={onSkipQA}
                size="tiny"
                color={COLORS.white}
                backgroundColor={COLORS.accentBlueCeleste}
                tooltip="Skip to Quiz"
              />
            )}
            {state === "quiz" && (
              <IconButton
                icon="stat_3"
                onClick={onSkipQuiz}
                size="tiny"
                color={COLORS.white}
                backgroundColor={COLORS.accentPortage}
                tooltip="Complete lesson"
              />
            )}
            <IconButton
              icon="flag"
              onClick={onFlag}
              size="tiny"
              color={COLORS.white}
              backgroundColor={COLORS.modeOrange}
              tooltip="Report issue"
            />
          </>
        )}
      </div>
    </form>
  );
};

export default ChatHeader;
