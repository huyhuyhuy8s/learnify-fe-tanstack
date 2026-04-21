import classNames from "classnames";
import "./style.scss";
import type { TFriendItem } from "./type";
import FriendItemFooter from "./components/FriendFooter";

type Props = TFriendItem & {
  isActive?: boolean;
};

const FriendItem = (props: Props) => {
  const { name, onClick, imgUrl, typeFriendItem, streaks, index, isActive } =
    props;

  return (
    <button
      className={classNames("friend-item", {
        "friend-item--active": isActive,
      })}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="friend-item-index">
        {index ? (
          <span>{index}</span>
        ) : (
          <span className="friend-item-index-star">⭐</span>
        )}
      </div>

      <div className="friend-item-info">
        <img className="friend-item-info-img" src={imgUrl} alt={name} />
        <p className="friend-item-info-name">{name}</p>
      </div>
      <FriendItemFooter
        typeItem={typeFriendItem}
        streaks={streaks}
        onClickAccept={(e) => {
          e.stopPropagation();
          alert("Accept Friend");
        }}
        onClickDecline={(e) => {
          e.stopPropagation();
          alert("Decline User");
        }}
      />
    </button>
  );
};

export default FriendItem;
