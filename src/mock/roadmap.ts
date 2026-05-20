import type { TProgress, TSpecial, TStatusCard } from "@/types/global";

export type MockRoadmap = {
  id: number;
  typeSpecial: TSpecial;
  title: string;
  description?: string;
  duration?: string;
  status?: TStatusCard;
  listFeature?: string[];
  percentage?: TProgress;
};

export const MOCK_ROADMAP: MockRoadmap[] = [
  {
    id: 1,
    typeSpecial: "roadmap",
    title: "Gemini for Data Scientists and Analysts",
    description:
      "In this course, you learn how Gemini, a generative AI-powered collaborator from Google Cloud, helps analyze customer data, predict trends, and optimize workflows.",
    duration: "14 hours",
    status: "default",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 2,
    typeSpecial: "roadmap",
    title: "Gemini for Data Scientists and Analysts",
    description:
      "In this course, you learn how Gemini, a generative AI-powered collaborator from Google Cloud, helps analyze customer data, predict trends, and optimize workflows.",
    duration: "15 hours",
    status: "default",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
  },
  {
    id: 3,
    typeSpecial: "roadmap",
    title: "Gemini for Data Scientists and Analysts",
    description:
      "In this course, you learn how Gemini, a generative AI-powered collaborator from Google Cloud, helps analyze customer data, predict trends, and optimize workflows.",
    duration: "16 hours",
    status: "inProgress",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
    percentage: 14,
  },
  {
    id: 4,
    typeSpecial: "roadmap",
    title: "Gemini for Data Scientists and Analysts",
    description:
      "In this course, you learn how Gemini, a generative AI-powered collaborator from Google Cloud, helps analyze customer data, predict trends, and optimize workflows.",
    duration: "17 hours",
    status: "inProgress",
    listFeature: ["Data Analysis", "Trend Prediction", "Workflow Optimization"],
    percentage: 14,
  },
];
