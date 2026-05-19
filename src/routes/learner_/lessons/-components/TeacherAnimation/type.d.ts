import type { AnimationAction } from "three";

export type TTeacherAnimationDeg =
  | "metarig.001|mixamo.com|Layer0"
  | "metarig.001|mixamo.com|Layer0.001"
  | "Talking_4"
  | "Talking_4.001"
  | "Talking_5"
  | "Talking_7";

export type TTeacherAnimation =
  | TTeacherAnimationDeg
  | "Idle"
  | "Talking_1"
  | "Talking_2"
  | "Talking_3"
  | "Thinking";

export type TActions = Record<TTeacherAnimation, AnimationAction | null>;

export type TTeacherAnimationProps = {
  animation?: TTeacherAnimation;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onReady?: () => void;
};
