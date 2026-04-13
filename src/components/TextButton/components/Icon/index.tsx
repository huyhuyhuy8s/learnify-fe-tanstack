import { IIcon } from "../../type";
import SidedCookie4 from "@/components/Shapes/SidedCookie4";
import Triangle from "@/components/Shapes/Triangle";
import Sunny from "@/components/Shapes/Sunny";
import Circle from "@/components/Shapes/Circle";
import GhostIsh from "@/components/Shapes/GhostIsh";
import { colors } from "@/styles/colors";

const Icon = (props: IIcon) => {
  const { visible, type, typeSpecial, icon } = props;

  if (!visible) return null;

  if (type === "special") {
    switch (typeSpecial) {
      case "lesson":
        return <Circle color={colors.neutral800} />;
      case "roadmap":
        return <Sunny color={colors.neutral800} />;
      case "lab":
        return <Triangle color={colors.neutral800} />;
      case "course":
        return <SidedCookie4 color={colors.neutral800} />;
      case "check":
        return <GhostIsh color={colors.neutral800} />;
      case "certificate":
        return (
          <span
            className="material-symbols-rounded"
            style={{ color: colors.neutral800 }}
          >
            verified
          </span>
        );
      case "private":
        return (
          <span
            className="material-symbols-rounded"
            style={{ color: colors.white }}
          >
            lock
          </span>
        );
      case "public":
        return (
          <span
            className="material-symbols-rounded"
            style={{ color: colors.white }}
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

  return <span className="material-symbols-rounded">{icon}</span>;
};
export default Icon;
