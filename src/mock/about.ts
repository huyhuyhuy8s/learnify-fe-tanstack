import type { TAboutStatProps } from "@/routes/learner/about/-types/about";
import { COLORS } from "@/styles/colors";

export const ABOUT_VALUES = [
  {
    icon: "favorite",
    title: "Learner First",
    desc: "Every decision we make starts with the learner's experience in mind.",
    color: "#fce8e8",
    iconColor: "#e05b5b",
  },
  {
    icon: "bolt",
    title: "Innovation",
    desc: "We embrace AI and modern tech to make education more effective.",
    color: "#fff8e8",
    iconColor: "#e0a03b",
  },
  {
    icon: "public",
    title: "Accessibility",
    desc: "Quality learning should be available to everyone, everywhere.",
    color: "#e8f4ff",
    iconColor: "#3b82f6",
  },
  {
    icon: "group",
    title: "Community",
    desc: "Growing together through collaboration, sharing, and support.",
    color: "#eef3ee",
    iconColor: "#2d4a3e",
  },
];

export const ABOUT_STATS: Omit<TAboutStatProps, "index">[] = [
  { value: "10K+", color: COLORS.accentMinty, label: "Trusted Learners" },
  { value: "200+", color: COLORS.accentIndicolite, label: "Courses" },
  { value: "3", color: COLORS.accentClassicPink, label: "Members" },
  {
    value: "200",
    color: COLORS.accentSmoothingLime,
    label: "Trusted Partners",
  },
];
