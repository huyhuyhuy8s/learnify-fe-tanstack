import classNames from "classnames";
import "./style.scss";
import type { TFriendItem } from "./type";
import FriendItemFooter from "./components/FriendFooter";

const FriendItem = (props: TFriendItem) => {
  const { name, onClick, imgUrl, typeFriendItem, streaks, index } = props;

  return (
    <button className="friend-item" onClick={onClick} tabIndex={0}>
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
