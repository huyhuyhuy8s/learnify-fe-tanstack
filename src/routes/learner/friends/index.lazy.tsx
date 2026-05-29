import { SplitPanel } from "@/components/SplitPanel";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import FriendDetail from "./-components/FriendDetail";
import FriendEmptyState from "./-components/FriendEmptyState";
import FriendItem from "./-components/FriendItem";
import FriendItemSkeleton from "./-components/FriendItemSkeleton";
import { useFriendsPage } from "./-hooks/useFriendsPage";
import "./friends.scss";

export const Route = createLazyFileRoute("/learner/friends/")({
  component: FriendsPage,
});

function FriendsPage() {
  const { user: currentUser } = Route.useRouteContext();

  const {
    t,
    typeFriend,
    setTypeFriend,
    selectedId,
    setSelectedId,
    displayList,
    friendDetailData,
    shouldShowAddFriendBtn,
    isLoading,
    isSendingRequest,
    handleRespondRequest,
    handleSendRequest,
    tabs,
  } = useFriendsPage(currentUser?.id);

  if (!currentUser) {
    return <FriendEmptyState />;
  }

  return (
    <Suspense fallback={<FriendItemSkeleton />}>
      <div className="friend-page">
        <SplitPanel
          levels={2}
          tabs={tabs}
          activeTab={typeFriend}
          onTabChange={(tab) => {
            setTypeFriend(tab as typeof typeFriend);
            setSelectedId(null);
          }}
          items={displayList}
          selectedId={selectedId}
          isLoading={isLoading}
          loader={<FriendItemSkeleton />}
          renderItem={(friend, idx) => (
            <FriendItem
              index={idx + 1}
              id={friend.id}
              name={friend.name}
              imgUrl={friend.imgUrl}
              typeFriendItem={friend.typeFriendItem}
              streaks={friend.streaks}
              isActive={selectedId === friend.id}
              onClick={() => setSelectedId(friend.id)}
              onAccept={() => handleRespondRequest(friend.id, true)}
              onDecline={() => handleRespondRequest(friend.id, false)}
            />
          )}
          renderDetail={() =>
            friendDetailData ? (
              <FriendDetail
                {...friendDetailData}
                showAddFriendBtn={shouldShowAddFriendBtn}
                isSendingRequest={isSendingRequest}
                onSendFriendRequest={() => handleSendRequest(selectedId!)}
              />
            ) : (
              <div className="friend-page__placeholder-profile">
                <h5>{t("friends.placeholder_heading")}</h5>
                <p>{t("friends.placeholder_text")}</p>
              </div>
            )
          }
          listClassName="friend-page__body-left"
          detailClassName="friend-page__body-right"
        />
      </div>
    </Suspense>
  );
}
