import type { TIconProps } from "../../type";
import { COLORS } from "@/styles/colors";
import Icon from "@/components/Icon";
import {
  Circle,
  Sunny,
  Triangle,
  SidedCookie4,
  GhostIsh,
} from "@/components/Shapes";

const TextButtonIcon = (props: TIconProps) => {
  const { visible, type, typeSpecial, icon, color } = props;

  if (!visible) return null;

  const specialIconColor = color || COLORS.neutral800;

  if (type === "special") {
    switch (typeSpecial) {
      case "lesson":
        return <Circle color={specialIconColor} />;
      case "roadmap":
        return <Sunny color={specialIconColor} />;
      case "lab":
        return <Triangle color={specialIconColor} />;
      case "course":
        return <SidedCookie4 color={specialIconColor} />;
      case "check":
        return <GhostIsh color={specialIconColor} />;
      case "certificate":
        return <Icon name="verified" style={{ color: specialIconColor }} />;
      case "private":
        return <Icon name="lock" style={{ color: color || COLORS.white }} />;
      case "public":
        return <Icon name="public" style={{ color: color || COLORS.white }} />;
      case "starter":
        return <Icon name="sell" />;
      case "pro":
        return <Icon name="business_center" />;
      case "career":
        return <Icon name="star" />;
    }
  }

  if (!icon) return null;
  return <Icon name={icon} style={{ color }} />;
};
export default TextButtonIcon;
