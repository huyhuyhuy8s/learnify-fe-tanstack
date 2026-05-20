import type React from "react";

export type TTypeFriendItem = "leaderboard" | "friends" | "request";

export type TFriendItem = {
  id: string;
  name: string;
  onClick: () => void;
  imgUrl: string;
  typeFriendItem: TTypeFriendItem;
  streaks?: number;
  index?: number;
};

export type TFriendItemFooter = {
  typeItem: TTypeFriendItem;
  streaks?: number;
  onClickAccept?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDecline?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
