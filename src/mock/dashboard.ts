import type { TSpecial } from "@/types/global";
import type { MockCourse } from "./course";

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MOCK_USER = {
  streak: 12,
  achievements: [1, 2, 3, 4, 5, 6],
  achievementTotal: 150,
  activeDays: [0, 1, 3, 5],
};

export const MOCK_COURSES: MockCourse[] = [
  {
    id: 1,
    typeSpecial: "course",
    title: "Làm chủ ReactJS & TanStack",
    description:
      "Khóa học từ cơ bản đến nâng cao về hệ sinh thái TanStack, bao gồm Router, Query và Start.",
    duration: "45 mins",
    status: "default",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 2,
    typeSpecial: "course",
    title: "UI/UX Thực chiến cho Developer",
    description:
      "Học cách thiết kế giao diện đẹp mắt và tối ưu trải nghiệm người dùng với TailwindCSS.",
    duration: "45 mins",
    status: "default",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 3,
    typeSpecial: "course",
    title: "NestJS Backend API",
    description:
      "Xây dựng hệ thống API mạnh mẽ, mở rộng tốt với NestJS và TypeScript.",
    duration: "45 mins",
    status: "default",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 4,
    typeSpecial: "course",
    title: "Basic database",
    description: "Xây dựng hệ thống Database mạnh mẽ, tối ưu.",
    duration: "45 mins",
    status: "default",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 5,
    typeSpecial: "course",
    title: "NestJS Backend API",
    description:
      "Xây dựng hệ thống API mạnh mẽ, mở rộng tốt với NestJS và TypeScript.",
    duration: "45 mins",
    status: "default",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
];
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
