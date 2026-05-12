export type TTeacherStatus = "idle" | "thinking" | "speaking" | "paused";

export type TTeacherStatusIndicatorProps = {
  status: TTeacherStatus;
  className?: string;
};
