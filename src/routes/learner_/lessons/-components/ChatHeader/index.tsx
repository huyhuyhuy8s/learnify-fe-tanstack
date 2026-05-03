import classnames from "classnames";
import "./style.scss";
import IconButton from "@/components/IconButton";
import { COLORS } from "@/styles/colors";
import { useChatHeader } from "./-hooks/useChatHeader";

export type TChatHeaderProps = {
  className?: string;
  initialValue?: string;
  onUpdate?: (value: string) => void;
};

const ChatHeader = (props: TChatHeaderProps) => {
  const { className, initialValue, onUpdate } = props;
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
        <span className="material-symbols-rounded">chat</span>
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
            className="chat-header-context-dropdown"
          />
        </div>
      </div>
      <div className="chat-header-actions">
        <IconButton
          icon="last_page"
          onClick={() => undefined}
          size="tiny"
          color={COLORS.white}
          backgroundColor={COLORS.accentLilacVodka}
        />
        <IconButton
          icon="keyboard_double_arrow_right"
          onClick={() => undefined}
          size="tiny"
          color={COLORS.white}
          backgroundColor={COLORS.accentBlueCeleste}
        />
        <IconButton
          icon="stat_3"
          onClick={() => undefined}
          size="tiny"
          color={COLORS.white}
          backgroundColor={COLORS.accentPortage}
        />
        <IconButton
          icon="flag"
          onClick={() => undefined}
          size="tiny"
          color={COLORS.white}
          backgroundColor={COLORS.modeOrange}
        />
      </div>
    </form>
  );
};

export default ChatHeader;
