import type { TFriendItem } from "@/routes/learner/friends/-components/FriendItem/type"; // Nhớ import type của bạn

export const MOCK_FRIEND: TFriendItem[] = [
  {
    name: "Do Duc Anh",
    imgUrl: "https://i.pravatar.cc/150?img=11",
    typeFriendItem: "leaderboard",
    streaks: 180,
    onClick: () => console.log("Click Do Duc Anh"),
  },
  {
    name: "Nguyễn Văn A",
    imgUrl: "https://i.pravatar.cc/150?img=12",
    typeFriendItem: "leaderboard",
    streaks: 150,
    onClick: () => console.log("Click Nguyễn Văn A"),
  },
  {
    name: "Trần Thị B",
    imgUrl: "https://i.pravatar.cc/150?img=5",
    typeFriendItem: "friends",
    streaks: 45,
    onClick: () => console.log("Click Trần Thị B"),
  },
  {
    name: "Lê Văn C",
    imgUrl: "https://i.pravatar.cc/150?img=14",
    typeFriendItem: "request",
    onClick: () => console.log("Click Lê Văn C (Tổng)"),
  },
  {
    name: "Phạm D",
    imgUrl: "https://i.pravatar.cc/150?img=32",
    typeFriendItem: "leaderboard",
    streaks: 12,
    onClick: () => console.log("Click Phạm D"),
  },
];
