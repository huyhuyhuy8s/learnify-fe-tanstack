import type { TAboutStatProps } from "@/routes/learner/about/-types/about";
import "./style.scss";

const AboutStat = (props: TAboutStatProps) => {
  const { label, value, color, index } = props;

  return (
    <div className={`about-stat ${label}`} style={{ backgroundColor: color }}>
      <h5 className="regular">/{index < 10 ? `0${index}` : index}</h5>
      <div className="about-stat-context">
        <h1 className="about-stat-total semibold">{value}</h1>
        <h6 className="about-stat-type">{label}</h6>
      </div>
    </div>
  );
};
export default AboutStat;
