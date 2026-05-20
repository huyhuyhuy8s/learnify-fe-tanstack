import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import useCardFooterButton from "../../hooks/useCardFooterButton";
import classNames from "classnames";
import type { TStatusCard } from "@/types/global";

type TCardFooterProps = {
  status?: TStatusCard;
  percentage?: number;
  duration?: string;
};

const CardFooter = (props: TCardFooterProps) => {
  const { status = "default", percentage = 0, duration } = props;

  const cardFooterClassName = classNames("card-footer", status);

  const { tooltip, icon } = useCardFooterButton(status);

  if (status === "inProgress") {
    return (
      <div className={cardFooterClassName}>
        <div className="progress">
          <div className="tracker" style={{ width: `${percentage}%` }}></div>
        </div>
        <small>{percentage}%</small>
      </div>
    );
  }

  return (
    <div className={cardFooterClassName}>
      <div className="duration">
        {duration && <Icon name="pace" />}
        <small>{duration}</small>
      </div>
      <IconButton
        className={status}
        icon={icon}
        size="small"
        type="outlined"
        onClick={() => {}}
        shape="circle"
        tooltip={tooltip}
      />
    </div>
  );
};

export default CardFooter;
