import type { TIconProps } from "../../type";
import { COLORS } from "@/styles/colors";
import {
  Circle,
  Sunny,
  Triangle,
  SidedCookie4,
  GhostIsh,
} from "@/components/Shapes";

const Icon = (props: TIconProps) => {
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
        return (
          <span
            className="material-symbols-rounded"
            style={{ color: specialIconColor }}
          >
            verified
          </span>
        );
      case "private":
        return (
          <span
            className="material-symbols-rounded"
            style={{ color: color || COLORS.white }}
          >
            lock
          </span>
        );
      case "public":
        return (
          <span
            className="material-symbols-rounded"
            style={{ color: color || COLORS.white }}
          >
            public
          </span>
        );

      case "starter":
        return <span className="material-symbols-rounded">sell</span>;
      case "pro":
        return (
          <span className="material-symbols-rounded">business_center</span>
        );
      case "career":
        return <span className="material-symbols-rounded">star</span>;
    }
  }

  return (
    <span
      className="material-symbols-rounded"
      style={{
        color,
      }}
    >
      {icon}
    </span>
  );
};
export default Icon;
