import classnames from "classnames";
import Icon from "@/components/Icon";
import "./style.scss";

type TControllerProps = {
  className?: string;
  active: boolean;
  onClick: () => void;
};

const Controller = (props: TControllerProps) => {
  const { className, active, onClick } = props;

  return (
    <button
      className={classnames("left-nav-controller", className)}
      onClick={onClick}
      type="button"
      aria-label={
        active ? "Collapse left navigation" : "Expand left navigation"
      }
    >
      <Icon name={active ? "chevron_left" : "chevron_right"} />
    </button>
  );
};

export default Controller;
