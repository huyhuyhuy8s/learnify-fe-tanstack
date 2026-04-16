import TextButton from "@/components/TextButton";
import { COLORS } from "@/styles/colors";
import type { TProgress, TStatusCard } from "@/types/global";

type TDecorationCardStatusProps = {
  status: TStatusCard;
  percentage: TProgress;
  star: number;
};

const DecorationCardStatus = (props: TDecorationCardStatusProps) => {
  const { status, percentage, star } = props;

  const tooltipText =
    status === "locked"
      ? "This course is locked"
      : status === "inProgress"
        ? "Continue on your study journey"
        : "Start course";

  const iconButton = status === "completed" ? "check" : "arrow_right_alt";

  return (
    <div className="status">
      <TextButton
        text="start"
        size="medium"
        type="secondary"
        icon={iconButton}
        backgroundColor={COLORS.white}
        color={COLORS.navy400}
        onClick={() => {}}
        disabled={status === "locked"}
        tooltip={tooltipText}
      />
      <div className="progress" style={{ backgroundColor: COLORS.white }}>
        <div
          className="tracker"
          style={{ width: `${percentage}%` }}
          title={`${percentage}% completed`}
        ></div>
      </div>
      <TextButton
        text={star.toString()}
        size="tiny"
        type="secondary"
        icon="star"
        backgroundColor={COLORS.navy400}
        color={COLORS.white}
        tooltip={`${star} stars`}
        onClick={() => {}}
      />
    </div>
  );
};

export default DecorationCardStatus;
