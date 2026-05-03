import type { TCommentItemProps } from "./type.d.ts";
import "./style.scss";

const CommentItem = (props: TCommentItemProps) => {
  const { userName, time, content, rating } = props;

  return (
    <div className="comment-item">
      <div className="comment-item-head">
        <div className="comment-avatar"></div>
        <div className="comment-head-infor">
          <span>{userName}</span>
          <p>{time}</p>
          <div className="comment-head-infor-stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className="material-symbols-rounded icon"
                style={{
                  color: index < rating ? "#FFC107" : "#E0E0E0",
                  fontSize: "18px",
                  fontVariationSettings:
                    index < rating ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                star
              </span>
            ))}
          </div>
        </div>
        <div className="comment-3dot">
          <span className="material-symbols-rounded icon">more_vert</span>
        </div>
      </div>
      <div className="comment-item-body">{content}</div>
    </div>
  );
};

export default CommentItem;
