import { useTranslation } from "react-i18next";
import "./style.scss";

const DashboardStreakWidget = () => {
  const { t } = useTranslation();
  const days = t("dashboard.day_labels", { returnObjects: true }) as string[];

  return (
    <div className="streak-widget">
      <div className="streak-widget__top">
        <h1 className="streak-widget__top-number">0</h1>
        <div className="streak-widget__top-info">
          <span className="fire-icon">🔥</span>
          <span
            className="streak-text"
            dangerouslySetInnerHTML={{ __html: t("dashboard.current_streak") }}
          />
        </div>
      </div>
      <hr className="streak-widget__divider" />
      <div className="streak-widget__days">
        {days.map((day) => (
          <div key={day} className="streak-widget__days-item">
            <div className="circle" />
            <span>{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStreakWidget;
