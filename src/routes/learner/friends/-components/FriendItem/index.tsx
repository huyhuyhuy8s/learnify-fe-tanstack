import classNames from "classnames";
import FriendItemFooter from "./components/FriendFooter";
import "./style.scss";
import type { TFriendItem } from "./type";

type Props = TFriendItem & {
  isActive?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
};

const FriendItem = (props: Props) => {
  const {
    index,
    name,
    onClick,
    imgUrl,
    typeFriendItem,
    streaks,
    isActive,
    onAccept,
    onDecline,
  } = props;

  return (
    <button
      className={classNames("friend-item", {
        "friend-item--active": isActive,
      })}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="friend-item-index">{index}</div>

      <div className="friend-item-info">
        <img className="friend-item-info-img" src={imgUrl} alt={name} />
        <p className="friend-item-info-name semibold">{name}</p>
      </div>
      <FriendItemFooter
        typeItem={typeFriendItem}
        streaks={streaks}
        onClickAccept={(e) => {
          e.stopPropagation();
          onAccept?.();
        }}
        onClickDecline={(e) => {
          e.stopPropagation();
          onDecline?.();
        }}
      />
    </button>
  );
};

export default FriendItem;
