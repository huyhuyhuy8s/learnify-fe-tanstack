import classNames from "classnames";
import "./style.scss";

const FriendItemSkeleton = () => {
  return (
    <div className={classNames("friend-item", "friend-item-skeleton")}>
      <div className="friend-item-index">
        <div className="skeleton-shape friend-item-skeleton__index"></div>
      </div>
      <div className="friend-item-info">
        <div className="skeleton-shape friend-item-skeleton__avatar"></div>
        <div className="skeleton-shape friend-item-skeleton__name"></div>
      </div>
      <div className="skeleton-shape friend-item-skeleton__action"></div>
    </div>
  );
};

export default FriendItemSkeleton;
