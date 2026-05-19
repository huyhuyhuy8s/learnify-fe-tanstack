import Icon from "@/components/Icon";
import type { TCommentItemProps } from "./type.d.ts";
import "./style.scss";

const CommentItem = (props: TCommentItemProps) => {
  const { userName, time, content } = props;

  return (
    <div className="comment-item">
      <div className="comment-item-head">
        <div className="comment-avatar"></div>
        <div className="comment-head-infor">
          <span>{userName}</span>
          <p>{time}</p>
        </div>
        <div className="comment-3dot">
          <Icon name="more_vert" className="icon" />
        </div>
      </div>
      <div className="comment-item-body">{content}</div>
    </div>
  );
};

export default CommentItem;
