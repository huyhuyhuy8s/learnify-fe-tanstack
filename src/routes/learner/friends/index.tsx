import ErrorScene from "@/components/ErrorScene";
import TetrisLoader from "@/components/TetrisLoader";
import TextButton from "@/components/TextButton";
import { DEFAULT_AVATAR } from "@/constants/avatar";
import {
  useGetLeaderboard,
  useGetMyFriends,
  useGetPendingRequests,
  useRespondFriendRequest,
  useSendFriendRequest,
} from "@/hooks/useFriends";
import type { TBackendUser } from "@/hooks/useProfile";
import { getCurrentUserFn } from "@/server/auth";
import { createLearnerHead } from "@/utils";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import classNames from "classnames";
import { Suspense, useMemo, useState } from "react";
import FriendDetail from "./-components/FriendDetail";
import FriendEmptyState from "./-components/FriendEmptyState";
import type { TFriendDetail } from "./-components/FriendDetail/type";
import FriendItem from "./-components/FriendItem";
import type {
  TFriendItem,
  TTypeFriendItem,
} from "./-components/FriendItem/type";
import "./style.scss";

function FriendsErrorComponent() {
  const router = useRouter();
  return (
    <ErrorScene>
      <ErrorScene.Header>
        <ErrorScene.Title errorCode={500}>Server Error</ErrorScene.Title>
        <ErrorScene.Description>
          Unable to load friends at this time. This could be a network issue or
          a server problem. Please try again.
        </ErrorScene.Description>
      </ErrorScene.Header>
      <ErrorScene.Content>
        <div className="error-scene__control">
          <TextButton
            text="Try Again"
            onClick={() => router.invalidate()}
            className="error-scene__btn"
            size="medium"
            icon="refresh"
          />
          <TextButton
            text="Go Back"
            onClick={() => window.history.back()}
            className="error-scene__btn error-scene__btn--secondary"
            size="medium"
            icon="arrow_back"
            type="outlined"
          />
        </div>
      </ErrorScene.Content>
    </ErrorScene>
  );
}

export const Route = createFileRoute("/learner/friends/")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    return { user };
  },
  head: () => createLearnerHead("Friends"),
  errorComponent: FriendsErrorComponent,
  pendingComponent: TetrisLoader,
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

  const { user: currentUser } = Route.useRouteContext();

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

  if (!currentUser) {
    return <FriendEmptyState />;
  }

  return (
    <Suspense fallback={<TetrisLoader />}>
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
              <TetrisLoader size="md" speed="fast" />
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
    </Suspense>
  );
}
