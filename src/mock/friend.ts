import type { TFriendDetail } from "@/routes/learner/friends/-components/FriendDetail/type";
import type { TFriendItem } from "@/routes/learner/friends/-components/FriendItem/type"; // Nhớ import type của bạn

export const MOCK_FRIEND: TFriendItem[] = [
  {
    id: 1,
    name: "Do Duc Anh",
    imgUrl: "https://i.pravatar.cc/150?img=11",
    typeFriendItem: "leaderboard",
    streaks: 180,
    onClick: () => console.log("Click Do Duc Anh"),
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    imgUrl: "https://i.pravatar.cc/150?img=12",
    typeFriendItem: "leaderboard",
    streaks: 150,
    onClick: () => console.log("Click Nguyễn Văn A"),
  },
  {
    id: 3,
    name: "Trần Thị B",
    imgUrl: "https://i.pravatar.cc/150?img=5",
    typeFriendItem: "friends",
    streaks: 45,
    onClick: () => console.log("Click Trần Thị B"),
  },
  {
    id: 4,
    name: "Lê Văn C",
    imgUrl: "https://i.pravatar.cc/150?img=14",
    typeFriendItem: "request",
    onClick: () => console.log("Click Lê Văn C (Tổng)"),
  },
  {
    id: 5,
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
    imgUrl: "https://i.pravatar.cc/150?img=11",
    name: "Do Duc Anh",
    email: "doducanh@example.com",
    phoneNumber: "0901234567",
    streak: 180,
    badges: 5,
    follower: 120,
    course: 3,
  },
  {
    id: 2,
    imgUrl: "https://i.pravatar.cc/150?img=12",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    streak: 150,
    badges: 12,
    follower: 850,
    course: 8,
  },
  {
    id: 3,
    imgBackground:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    imgUrl: "https://i.pravatar.cc/150?img=5",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phoneNumber: "0987654321",
    streak: 45,
    badges: 1,
    follower: 15,
    course: 1,
  },
  {
    id: 4,
    imgBackground:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    imgUrl: "https://i.pravatar.cc/150?img=14",
    name: "Lê Văn C",
    email: "levanc@example.com",
    streak: 0, // Fallback về 0 vì ở list Lê Văn C không có trường streaks
    badges: 45,
    follower: 12500,
    course: 24,
  },
  {
    id: 5,
    imgUrl: "https://i.pravatar.cc/150?img=32",
    name: "Phạm D",
    email: "phamd@example.com",
    phoneNumber: "0912345678",
    streak: 12,
    badges: 0,
    follower: 0,
    course: 0,
  },
];
