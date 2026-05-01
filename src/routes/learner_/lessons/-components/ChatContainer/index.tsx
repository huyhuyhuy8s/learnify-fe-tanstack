import classnames from "classnames";
import ChatHeader from "../ChatHeader";
import "./style.scss";
import ChatMessageWrapper from "../ChatMessageWrapper";

export type TChatContainerProps = {
  className?: string;
};

const ChatContainer = (props: TChatContainerProps) => {
  const { className } = props;
  const cls = classnames("chat-container", className);

  return (
    <div className={cls}>
      <ChatHeader />
      <ChatMessageWrapper />
    </div>
  );
};

export default ChatContainer;
