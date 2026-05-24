import { useTranslation } from "react-i18next";
import TextButton from "@/components/TextButton";
import { MOCK_PROGRESS } from "@/mock";
import "./style.scss";

const DashboardProgressWidget = () => {
  const { t } = useTranslation();

  return (
    <div className="progress-widget">
      <div className="progress-widget__header">
        <h3>{t("dashboard.progress")}</h3>
      </div>
      <div className="progress-widget-grid">
        {MOCK_PROGRESS.map((progress, index) => (
          <div key={index} className="progress-widget__grid-pill">
            <TextButton
              onClick={() => {}}
              text="text"
              size="tiny"
              type="special"
              typeSpecial={progress.typeSpecial}
            />
            <span className="num">{progress.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardProgressWidget;
