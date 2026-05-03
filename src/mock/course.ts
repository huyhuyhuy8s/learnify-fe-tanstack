import type { TProgress, TSpecial, TStatusCard } from "@/types/global";

export type MockCourse = {
  id: number;
  typeSpecial: TSpecial;
  title: string;
  description?: string;
  duration?: string;
  status?: TStatusCard;
  listFeature?: string[];
  percentage?: TProgress;
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
