import Icon from "@/components/Icon";
import {
  Flower,
  Gem,
  LeafClover4,
  Pill,
  Semicircle,
  SidedCookie6,
  SoftBurst,
} from "@/components/Shapes";
import { COLORS } from "@/styles/colors";
import "./style.scss";

const DecorationShapes = () => {
  return (
    <section className="decoration-shapes">
      <div className="gem">
        <Icon name="psychology" className="icon" />
        <Gem size="20rem" color={COLORS.modeOrange} />
      </div>
      <div className="pill">
        <Pill
          size="10.625rem"
          color={COLORS.modeNavy}
          stroke={COLORS.modeYellow}
          strokeWidth={50}
        />
      </div>
      <div className="soft-burst">
        <SoftBurst
          size="240px"
          color={COLORS.modeSalmon}
          stroke={COLORS.modeGreen}
          strokeWidth={45}
        />
      </div>
      <div className="experiment">
        <Icon name="experiment" />
      </div>
      <div className="stylus_fountain_pen">
        <Icon name="stylus_fountain_pen" />
      </div>
      <div className="flower">
        <Flower
          size="300px"
          color={COLORS.modeGreen}
          stroke={COLORS.modeOrange}
          strokeWidth={35}
        />
      </div>
      <div className="school">
        <Icon name="school" className="icon" />
        <SidedCookie6 size="220px" color={COLORS.modeYellow} />
      </div>
      <div className="semicircle">
        <Semicircle size="150px" color={COLORS.modeBrown} />
        <Semicircle size="150px" color={COLORS.modeDarkGreen} />
      </div>
      <div className="clover">
        <Icon name="person" className="icon" />
        <LeafClover4
          size="200px"
          color={COLORS.modeYellow}
          stroke={COLORS.modeGreen}
          strokeWidth={40}
        />
      </div>
    </section>
  );
};

export default DecorationShapes;
