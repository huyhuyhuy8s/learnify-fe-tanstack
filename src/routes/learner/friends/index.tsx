import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import classNames from "classnames";
import FriendItem from "./-components/FriendItem";
import FriendDetail from "./-components/FriendDetail";
import type { TTypeFriendItem } from "./-components/FriendItem/type";
import type { TFriendDetail } from "./-components/FriendDetail/type";
import {
  useGetMyFriends,
  useGetPendingRequests,
  useGetLeaderboard,
  useRespondFriendRequest,
  useSendFriendRequest,
} from "@/hooks/useFriends";
import { DEFAULT_AVATAR } from "@/constants/avatar";
import type { TBackendUser } from "@/hooks/useProfile";
import type { TFriendItem } from "./-components/FriendItem/type";
import { useAuthStore } from "@/store/authStore";
import "./style.scss";

export const Route = createFileRoute("/learner/friends/")({
  component: FriendsPage,
});

type TDisplayFriend = Omit<TFriendItem, "id" | "onClick"> & {
  id: string;
  rawUser?: TBackendUser;
  onClick?: () => void;
};

function FriendsPage() {
  const [typeFriend, setTypeFriend] = useState<TTypeFriendItem>("leaderboard");
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);

  const currentUser = useAuthStore((state) => state.user);

  const { data: friendsData, isLoading: isLoadingFriends } = useGetMyFriends();
  const { data: pendingData, isLoading: isLoadingPending } =
    useGetPendingRequests();
  const { data: leaderboardData, isLoading: isLoadingLeaderboard } =
    useGetLeaderboard();

  const respondMutation = useRespondFriendRequest();
  const sendRequestMutation = useSendFriendRequest();

  const tabs: { value: TTypeFriendItem; label: string; icon?: string }[] = [
    { value: "leaderboard", label: "Leaderboard" },
    { value: "friends", label: "Friends" },
    { value: "request", label: "Requests" },
  ];

  const displayList: TDisplayFriend[] = useMemo(() => {
    if (typeFriend === "leaderboard" && leaderboardData?.isSuccess) {
      return leaderboardData.users.map((user) => ({
        id: user.id,
        name: user.username,
        imgUrl: DEFAULT_AVATAR,
        typeFriendItem: "leaderboard" as TTypeFriendItem,
        streaks: user.currentSteak || 0,
        rawUser: user,
      }));
    }

    if (typeFriend === "friends" && friendsData?.isSuccess) {
      return friendsData.users.map((user) => ({
        id: user.id,
        name: user.username,
        imgUrl: DEFAULT_AVATAR,
        typeFriendItem: "friends" as TTypeFriendItem,
        streaks: user.currentSteak || 0,
        rawUser: user,
      }));
    }

    if (typeFriend === "request" && pendingData?.isSuccess) {
      return pendingData.users.map((user) => ({
        id: user.id,
        name: user.username,
        imgUrl: DEFAULT_AVATAR,
        typeFriendItem: "request" as TTypeFriendItem,
        streaks: user.currentSteak || 0,
        rawUser: user,
      }));
    }
    return [];
  }, [typeFriend, friendsData, pendingData, leaderboardData]);

  const selectedFriend =
    selectedIndex !== null
      ? displayList.find((friend) => friend.id === selectedIndex)
      : null;

  let friendDetailData: TFriendDetail | null = null;
  if (selectedFriend && selectedFriend.rawUser) {
    const user = selectedFriend.rawUser;
    friendDetailData = {
      id: user.id,
      name: user.username,
      email: user.email,
      imgUrl: DEFAULT_AVATAR,
      imgBackground: undefined,
      phoneNumber: user.phoneNumber,
      streak: user.currentSteak || 0,
      badges: 0,
      follower: 0,
      course: 0,
    };
  }

  let shouldShowAddFriendBtn = false;
  if (typeFriend === "leaderboard" && selectedFriend) {
    const isSelf = currentUser?.id === selectedFriend.id;

    const isAlreadyFriend = friendsData?.users?.some(
      (u) => u.id === selectedFriend.id
    );

    const isPending = pendingData?.users?.some(
      (u) => u.id === selectedFriend.id
    );
    shouldShowAddFriendBtn = !isSelf && !isAlreadyFriend && !isPending;
  }

  const handleRespondRequest = (requesterId: string, isAccepted: boolean) => {
    respondMutation.mutate(
      { requesterId, isAccepted },
      {
        onSuccess: (res) => {
          if (res.respondFriendRequest.isSuccess) {
            alert(
              isAccepted ? "Accepted successfully!" : "Declined successfully!"
            );
            if (selectedIndex === requesterId) setSelectedIndex(null);
          } else {
            alert(res.respondFriendRequest.message);
          }
        },
      }
    );
  };

  const handleSendRequest = (targetUserId: string) => {
    sendRequestMutation.mutate(
      { targetUserId },
      {
        onSuccess: (res) => {
          if (res.sendFriendRequest.isSuccess) {
            alert("Friend request sent successfully!");
          } else {
            alert(res.sendFriendRequest.message);
          }
        },
      }
    );
  };

  const isLoading =
    (typeFriend === "friends" && isLoadingFriends) ||
    (typeFriend === "request" && isLoadingPending) ||
    (typeFriend === "leaderboard" && isLoadingLeaderboard);

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
            <p className="regular">{tab.label}</p>
          </button>
        ))}
      </div>

      <div className="friend-page-body">
        <div className="friend-page-body-left">
          {isLoading ? (
            <p className="friend-page-body-left-empty">Loading...</p>
          ) : displayList.length > 0 ? (
            displayList.map((friend, idx) => (
              <FriendItem
                id={friend.id}
                key={friend.id}
                name={friend.name}
                imgUrl={friend.imgUrl}
                typeFriendItem={friend.typeFriendItem}
                streaks={friend.streaks}
                index={idx + 1}
                isActive={selectedIndex === friend.id}
                onClick={() => setSelectedIndex(friend.id)}
                onAccept={() =>
                  handleRespondRequest(friend.id.toString(), true)
                }
                onDecline={() =>
                  handleRespondRequest(friend.id.toString(), false)
                }
              />
            ))
          ) : (
            <p className="friend-page-body-left-empty">No items found.</p>
          )}
        </div>

        <div className="friend-page-body-right">
          {friendDetailData && selectedFriend ? (
            <FriendDetail
              {...friendDetailData}
              showAddFriendBtn={shouldShowAddFriendBtn}
              isSendingRequest={sendRequestMutation.isPending}
              onSendFriendRequest={() =>
                handleSendRequest(selectedFriend.id.toString())
              }
            />
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

export default FriendsPage;
