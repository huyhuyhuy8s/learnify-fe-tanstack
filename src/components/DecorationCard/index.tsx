import "./style.scss";
import { COLORS } from "@/styles/colors";
import type { TProgress, TSpecial, TStatusCard } from "@/types/global";
import DecorationCardContext from "./components/DecorationCardContext";
import DecorationCardStatus from "./components/DecorationCardStatus";
import { Arrow } from "@/components/Shapes";

export type TDecorationCardProps = {
  className?: string;
  title: string;
  typeSpecial: TSpecial;
  listFeature?: string[];
  listBadge: React.ReactNode;
  backgroundColor?: string;
  status?: TStatusCard;
  percentage?: TProgress;
  star?: number;
  shape?: React.ReactNode;
};

const DecorationCard = (props: TDecorationCardProps) => {
  const {
    title,
    typeSpecial,
    listBadge,
    backgroundColor = COLORS.navyPastel100,
    listFeature = [],
    status = "default",
    percentage = 0,
    star = 0,
    shape = <Arrow size="150px" color={COLORS.modeSalmon} />,
  } = props;

  return (
    <div className="decoration-card">
      <div className="decoration-card-content" style={{ backgroundColor }}>
        <DecorationCardContext
          listBadge={listBadge}
          typeSpecial={typeSpecial}
          listFeature={listFeature}
          shape={shape}
          title={title}
        />
        <DecorationCardStatus
          status={status}
          percentage={percentage}
          star={star}
        />
      </div>
      <div className="modifier" style={{ backgroundColor }}>
        <div className="modifier-left">
          <div className="modifier-item"></div>
          <div className="modifier-item"></div>
        </div>
        <div className="modifier-right">
          <div className="modifier-item" style={{ backgroundColor }}></div>
          <div className="modifier-item" style={{ backgroundColor }}></div>
        </div>
      </div>
    </div>
  );
};
export default DecorationCard;
