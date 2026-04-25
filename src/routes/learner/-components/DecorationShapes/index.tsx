import { COLORS } from "@/styles/colors";
import {
  Gem,
  Pill,
  SoftBurst,
  Flower,
  SidedCookie6,
  Semicircle,
  LeafClover4,
} from "@/components/Shapes";
import "./style.scss";

const DecorationShapes = () => {
  return (
    <section className="decoration-shapes">
      <div className="gem">
        <span className="material-symbols-rounded">psychology</span>
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
        <span className="material-symbols-rounded">experiment</span>
      </div>
      <div className="stylus_fountain_pen">
        <span className="material-symbols-rounded">stylus_fountain_pen</span>
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
        <span className="material-symbols-rounded">school</span>
        <SidedCookie6 size="220px" color={COLORS.modeYellow} />
      </div>
      <div className="semicircle">
        <Semicircle size="150px" color={COLORS.modeBrown} />
        <Semicircle size="150px" color={COLORS.modeDarkGreen} />
      </div>
      <div className="clover">
        <span className="material-symbols-rounded">school</span>
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
