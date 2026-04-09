import classnames from "classnames";
import "./style.scss";

interface ControllerProps {
  className?: string;
  active: boolean;
  onClick: () => void;
}

const Controller = (props: ControllerProps) => {
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
      <span className="material-symbols-rounded">
        {active ? "chevron_left" : "chevron_right"}
      </span>
    </button>
  );
};

export default Controller;
