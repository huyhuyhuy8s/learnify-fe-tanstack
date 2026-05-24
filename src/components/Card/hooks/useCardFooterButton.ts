import type { TStatusCard } from "@/types/global";

const useCardFooterButton = (
  status: TStatusCard
): {
  tooltip: string;
  icon: string;
} => {
  switch (status) {
    case "locked":
      return {
        tooltip:
          "This course is locked. Please complete the previous courses to unlock it.",
        icon: "lock",
      };
    case "completed":
      return {
        tooltip: "You have completed this course.",
        icon: "check",
      };
    default:
      return {
        tooltip: "Click to enter the course.",
        icon: "arrow_forward",
      };
  }
};
export default useCardFooterButton;
