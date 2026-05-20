import classNames from "classnames";
import type { TFriendItemFooter } from "../../type";
import "./style.scss";

const FriendItemFooter = (props: TFriendItemFooter) => {
  const { typeItem, streaks, onClickAccept, onClickDecline } = props;

  const friendItemFooterClassName = classNames(
    "friend-item-footer",
    `friend-item-footer--${typeItem}`
  );

  if (typeItem === "request") {
    return (
      <div className={friendItemFooterClassName}>
        <button
          onClick={onClickAccept}
          className="friend-item-footer-btn friend-item-footer-btn--accept"
        >
          Accept
        </button>
        <button
          onClick={onClickDecline}
          className="friend-item-footer-btn friend-item-footer-btn--decline"
        >
          Decline
        </button>
      </div>
    );
  }

  return (
    <div className={friendItemFooterClassName}>
      {streaks !== undefined &&
        (streaks >= 20 ? (
          <div className="friend-item-footer-streaks">{streaks} streaks</div>
        ) : (
          <div className="friend-item-footer-streaks friend-item-footer-lower-streaks">
            {streaks} streaks
          </div>
        ))}
    </div>
  );
};

export default FriendItemFooter;
