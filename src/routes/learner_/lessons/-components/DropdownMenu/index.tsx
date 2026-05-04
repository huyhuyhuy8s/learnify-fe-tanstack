import classNames from "classnames";
import { useState } from "react";
import "./style.scss";
import { COLORS } from "@/styles/colors";

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
  buttonBackgroundColor: string;
  buttonColor?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
};

const DropdownMenu = (props: TDropdownMenuProps) => {
  const {
    icon,
    title,
    options,
    iconOption,
    className,
    style,
    buttonBackgroundColor,
    buttonColor = COLORS.black,
    isOpen,
    onToggle,
  } = props;
  const [internalIsVisible, setInternalIsVisible] = useState(false);
  const isControlled = isOpen !== undefined;
  const isVisible = isControlled ? isOpen : internalIsVisible;
  const setIsVisible = isControlled
    ? (value: boolean) => onToggle?.(value)
    : setInternalIsVisible;
  const dropdownMenuCls = classNames(
    "dropdown-menu",
    { visible: isVisible },
    className
  );

  return (
    <div className={dropdownMenuCls} style={style}>
      <button
        className={classNames("dropdown-menu-control-button", {
          visible: isVisible,
        })}
        onClick={() => setIsVisible(!isVisible)}
        style={{ backgroundColor: buttonBackgroundColor, color: buttonColor }}
      >
        <div className="dropdown-menu-control-button-context">
          <span className="material-symbols-rounded">{icon}</span>
          <h6 className="medium">{title}</h6>
        </div>
        <span
          className={classNames(
            "material-symbols-rounded",
            { visible: isVisible },
            "arrow"
          )}
        >
          keyboard_arrow_down
        </span>
      </button>
      <div
        className={classNames("dropdown-menu-options", { visible: isVisible })}
      >
        <div className="dropdown-menu-options-inner">
          {options.map((option) => (
            <button key={option.value} className="dropdown-menu-option">
              <div className="dropdown-menu-option-context">
                <span className="material-symbols-rounded">{iconOption}</span>
                <h6 className="medium">{option.label}</h6>
              </div>
              <span className="material-symbols-rounded">more_vert</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
