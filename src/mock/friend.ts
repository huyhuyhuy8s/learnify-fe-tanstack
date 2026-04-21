import type { TFriendDetail } from "@/routes/learner/friends/-components/FriendDetail/type";
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

export const mockFriends: TFriendDetail[] = [
  {
    id: 1,
    imgBackground:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80",
    imgUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phoneNumber: "0901234567",
    streak: 15,
    badges: 5,
    follower: 120,
    course: 3,
  },
  {
    id: 2,
    imgUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    streak: 42,
    badges: 12,
    follower: 850,
    course: 8,
  },
  {
    id: 3,
    imgBackground:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    imgUrl: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    name: "Lê Hoàng C",
    email: "lehoangc@example.com",
    phoneNumber: "0987654321",
    streak: 3,
    badges: 1,
    follower: 15,
    course: 1,
  },
  {
    id: 4,
    imgBackground:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    imgUrl: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    name: "Phạm Minh D",
    email: "phamminhd@example.com",
    streak: 365,
    badges: 45,
    follower: 12500,
    course: 24,
  },
  {
    id: 5,
    imgUrl: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    name: "Vũ Hải E",
    email: "vuhaie@example.com",
    phoneNumber: "0912345678",
    streak: 0,
    badges: 0,
    follower: 0,
    course: 0,
  },
];
