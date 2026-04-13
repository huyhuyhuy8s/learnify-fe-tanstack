import "./style.scss";
import type { TTextButtonProps } from "./type";
import Icon from "./components/Icon";
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
    <button style={style} className={buttonClassNames} title={toolTipContent}>
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
    </button>
  );
};

export default TextButton;
