import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import classNames from "classnames";
import { MOCK_FRIEND, mockFriends } from "@/mock/friend";
import FriendItem from "./-components/FriendItem";
import FriendDetail from "./-components/FriendDetail";
import type { TTypeFriendItem } from "./-components/FriendItem/type";
import "./style.scss";
import type { TFriendDetail } from "./-components/FriendDetail/type";

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

  const selectedFriend =
    selectedIndex !== null
      ? filteredFriends.find((friend) => friend.id === selectedIndex)
      : null;

  const baseDetail = selectedFriend
    ? mockFriends.find((f) => f.name === selectedFriend.name) || mockFriends[0]
    : null;

  const friendDetailData: TFriendDetail | null =
    selectedFriend && baseDetail
      ? {
          ...baseDetail,
        }
      : null;

  return (
    <div className="friend-page">
      <div className="friend-page-header">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setTypeFriend(tab.value);
              setSelectedIndex(null); // Reset detail khi chuyển tab
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
          {filteredFriends.map((friend, idx) => (
            <FriendItem
              id={friend.id}
              key={friend.id}
              name={friend.name}
              imgUrl={friend.imgUrl}
              typeFriendItem={friend.typeFriendItem}
              streaks={friend.streaks}
              index={idx + 1}
              isActive={selectedIndex === friend.id}
              onClick={() => {
                friend.onClick?.();
                setSelectedIndex(friend.id);
              }}
            />
          ))}
          {filteredFriends.length === 0 && (
            <p className="friend-page-body-left-empty">No items found.</p>
          )}
        </div>

        <div className="friend-page-body-right">
          {friendDetailData ? (
            <FriendDetail {...friendDetailData} />
          ) : (
            <div className="placeholder-profile">
              <h5>It's empty here</h5>
              <p>Click on any user to have a quick peak profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
