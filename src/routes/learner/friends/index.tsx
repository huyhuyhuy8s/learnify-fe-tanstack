import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import classNames from "classnames";
import { MOCK_FRIEND } from "@/mock/friend";
import FriendItem from "./-components/FriendItem";
import type { TTypeFriendItem } from "./-components/FriendItem/type";
import "./style.scss";

export const Route = createFileRoute("/learner/friends/")({
  component: FriendsPage,
});

function FriendsPage() {
  const [typeFriend, setTypeFriend] = useState<TTypeFriendItem>("leaderboard");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const tabs: { value: TTypeFriendItem; label: string; icon?: string }[] = [
    { value: "leaderboard", label: "Leaderboard" },
    { value: "friends", label: "Friends" },
    { value: "request", label: "Requests" },
  ];

  const filteredFriends = MOCK_FRIEND.filter(
    (friend) => friend.typeFriendItem === typeFriend
  );

  return (
    <div className="friend-page">
      <div className="friend-page-header">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setTypeFriend(tab.value);
              setSelectedIndex(null);
            }}
            className={classNames("friend-page-header-tab", {
              "friend-page-header-tab--active": typeFriend === tab.value,
            })}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="friend-page-body">
        <div className="friend-page-body-left">
          {filteredFriends.map((friend, index) => (
            <FriendItem
              key={index}
              name={friend.name}
              imgUrl={friend.imgUrl}
              typeFriendItem={friend.typeFriendItem}
              streaks={friend.streaks}
              index={index + 1}
              onClick={() => {
                friend.onClick();
                setSelectedIndex(index);
              }}
            />
          ))}
          {filteredFriends.length === 0 && (
            <p className="friend-page-body-left-empty">No items found.</p>
          )}
        </div>

        <div className="friend-page-body-right">
          {selectedIndex !== null ? (
            <div className="placeholder-profile">
              Đang hiển thị hồ sơ của: <strong>....</strong>
            </div>
          ) : (
            <div className="placeholder-profile">
              Chọn một người để xem thông tin chi tiết
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
