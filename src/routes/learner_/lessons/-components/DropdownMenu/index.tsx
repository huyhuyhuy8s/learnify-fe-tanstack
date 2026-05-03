import classNames from "classnames";
import { Activity, useState } from "react";
import "./style.scss";

type TDropdownMenuOption = {
  value: string;
  label: string;
};

export type TDropdownMenuProps = {
  icon: string;
  title: string;
  options: TDropdownMenuOption[];
  iconOption: string;
  className?: string;
  style?: React.CSSProperties;
};

const DropdownMenu = (props: TDropdownMenuProps) => {
  const { icon, title, options, iconOption, className, style } = props;
  const [isVisible, setIsVisible] = useState(false);
  const dropdownMenuCls = classNames(
    "dropdown-menu",
    { visible: isVisible },
    className
  );

  return (
    <div className={dropdownMenuCls} style={style}>
      <button
        className="dropdown-menu-control-button"
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className="material-symbols-rounded">{icon}</span>
        <h6 className="medium">{title}</h6>
        <span
          className={classNames("material-symbols-rounded", {
            visible: isVisible,
          })}
        >
          keyboard_arrow_down
        </span>
      </button>
      <Activity mode={isVisible ? "visible" : "hidden"}>
        <div className="dropdown-menu-options">
          {options.map((option) => (
            <button key={option.value} className="dropdown-menu-option">
              <span className="material-symbols-rounded">{iconOption}</span>
              <h6 className="medium">{option.label}</h6>
              <span className="material-symbols-rounded">more_vert</span>
            </button>
          ))}
        </div>
      </Activity>
    </div>
  );
};

export default DropdownMenu;
