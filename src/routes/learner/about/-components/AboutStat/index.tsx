import { AboutStatProps } from "@/routes/learner/about/-types/about";
import "./style.scss";

const AboutStat = (props: AboutStatProps) => {
  const { label, value } = props;

  return (
    <div className="container-stat">
      <p className="total">{value}</p>
      <h3 className="type">{label}</h3>
    </div>
  );
};
export default AboutStat;
