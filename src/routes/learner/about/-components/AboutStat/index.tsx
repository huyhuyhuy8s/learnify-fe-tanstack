import type { TAboutStatProps } from "@/routes/learner/about/-types/about";
import "./style.scss";

const AboutStat = (props: TAboutStatProps) => {
  const { label, value } = props;

  return (
    <div className="about-stat">
      <h1 className="about-stat-total">
        <b>{value}</b>
      </h1>
      <h3 className="about-stat-type">{label}</h3>
    </div>
  );
};
export default AboutStat;
