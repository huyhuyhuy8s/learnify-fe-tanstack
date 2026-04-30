import type { TSpecial } from "@/types/global";
export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MOCK_USER = {
  streak: 12,
  achievements: [1, 2, 3, 4, 5, 6],
  achievementTotal: 150,
  activeDays: [0, 1, 3, 5],
};

type TProgress = {
  typeSpecial: TSpecial;
  value: number;
};

export const MOCK_PROGRESS: TProgress[] = [
  {
    typeSpecial: "roadmap",
    value: 0,
  },
  {
    typeSpecial: "certificate",
    value: 0,
  },
  {
    typeSpecial: "course",
    value: 0,
  },
  {
    typeSpecial: "lesson",
    value: 0,
  },
  {
    typeSpecial: "lab",
    value: 0,
  },
];
