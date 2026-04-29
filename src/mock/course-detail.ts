import type { TProgress, TSpecial, TStatusCard } from "@/types/global";

export type MockCourseDetail = {
  id: number;
  typeSpecial: TSpecial;
  title: string;
  description?: string;
  duration?: string;
  status?: TStatusCard;
  listFeature?: string[];
  percentage?: TProgress;
};

export const MOCK_COURSE_DETAILS: MockCourseDetail[] = [
  {
    id: 1,
    typeSpecial: "lesson",
    title:
      "Advanced React with TanStack Advanced React with TanStack Hello World From Learnify",
    description:
      "Master routing, data fetching, and state management in modern React applications using the powerful TanStack ecosystem.",
    duration: "3.5 hours",
    status: "completed",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 2,
    typeSpecial: "lab",
    title: "Advanced React with TanStack Hello World From Learnify",
    description:
      "Master routing, data fetching, and state management in modern React applications using the powerful TanStack ecosystem.",
    duration: "3.5 hours",
    status: "default",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 3,
    typeSpecial: "lesson",
    title: "Course Survey",
    status: "locked",
  },
];
