import "./style.scss";
import type { TTextButtonProps } from "./type";
import Icon from "./components/Icon";
import { Tooltip } from "react-tooltip";
import { useButton } from "./hooks/useButton";

const TextButton = (props: TTextButtonProps) => {
  const {
    icon = "search",
    leftIcon = true,
    rightIcon = false,
    text = "Button",
    type = "primary",
    roundedCorner = "rounded",
    size = "large",
    typeSecondary = "default",
    shape = "circular",
    typeSpecial = "lesson",
    tooltip = "",
    style,
  } = props;

  const { buttonClassNames, iconLabel, toolTipContent } = useButton({
    type,
    roundedCorner,
    size,
    typeSecondary,
    shape,
    typeSpecial,
    text,
    tooltip,
  });

  return (
    <button style={style} className={buttonClassNames}>
      <Icon
        visible={leftIcon}
        type={type}
        typeSpecial={typeSpecial}
        icon={icon}
      />
      <span className="text">{iconLabel}</span>
      <Icon
        visible={rightIcon}
        type={type}
        typeSpecial={typeSpecial}
        icon={icon}
      />
      {toolTipContent && (
        <Tooltip
          anchorSelect={`.${buttonClassNames.split(" ").join(".")}`}
          content={toolTipContent}
          className="tooltip"
        />
      )}
    </button>
  );
};

export default TextButton;
