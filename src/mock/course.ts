import type { TProgress, TSpecial, TStatusCard } from "@/types/global";

type MockCourse = {
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
    typeSpecial: "roadmap",
    title: "Gemini for Data Scientists and Analysts",
    description:
      "In this course, you learn how Gemini, a generative AI-powered collaborator from Google Cloud, helps analyze customer data, predict trends, and optimize workflows.",
    duration: "2 hours",
    status: "inProgress",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
    percentage: 14,
  },
  {
    id: 2,
    typeSpecial: "course",
    title: "Generative AI",
    description:
      "Learn the fundamentals of Generative AI, how it differs from traditional machine learning, and explore the core technologies behind large language models.",
    duration: "45 mins",
    status: "default",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 3,
    typeSpecial: "lab",
    title: "Advanced React with TanStack Hello World From Learnify",
    description:
      "Master routing, data fetching, and state management in modern React applications using the powerful TanStack ecosystem.",
    duration: "3.5 hours",
    status: "completed",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 4,
    typeSpecial: "lesson",
    title:
      "Advanced React with TanStack Advanced React with TanStack Hello World From Learnify",
    description:
      "Master routing, data fetching, and state management in modern React applications using the powerful TanStack ecosystem.",
    duration: "3.5 hours",
    status: "locked",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 5,
    typeSpecial: "lesson",
    title: "Course Survey",
    status: "default",
  },
];
