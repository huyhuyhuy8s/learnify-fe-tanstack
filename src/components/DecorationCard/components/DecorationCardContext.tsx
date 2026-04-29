import type { TSpecial } from "@/types/global";
import "./style.scss";

type TDecorationCardContextProps = {
  listBadge: React.ReactNode;
  typeSpecial: TSpecial;
  listFeature: string[];
  title: string;
  shape: React.ReactNode;
};

const DecorationCardContext = (props: TDecorationCardContextProps) => {
  const { listBadge, listFeature, title, shape, typeSpecial } = props;

  return (
    <div className="decoration-card-context">
      <div className="information">
        <div className="badge">{listBadge}</div>
        <h4 className="medium">
          {typeSpecial == "roadmap" ? (
            <span className="white">{title}</span>
          ) : (
            <span className="black">{title}</span>
          )}
        </h4>
        <div className="list-feature">
          {listFeature.map((features, idx) => (
            <p key={idx} className="medium feature-name">
              {features}
            </p>
          ))}
        </div>
      </div>
      {shape}
    </div>
  );
};

export default DecorationCardContext;
