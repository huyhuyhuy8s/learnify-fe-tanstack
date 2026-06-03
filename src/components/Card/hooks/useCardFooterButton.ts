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
        tooltip: "locked",
        icon: "lock",
      };
    case "completed":
      return {
        tooltip: "completed",
        icon: "check",
      };
    default:
      return {
        tooltip: "default",
        icon: "arrow_forward",
      };
  }
};
export default useCardFooterButton;
