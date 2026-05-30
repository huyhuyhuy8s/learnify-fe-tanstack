import { useTranslation } from "react-i18next";
import TextButton from "@/components/TextButton";
import type { TSpecial } from "@/types/global";
import "./style.scss";

type TProgressPill = {
  typeSpecial: TSpecial;
  value: number;
};

type TDashboardProgressWidgetProps = {
  inProgress: number;
  completed: number;
};

const DashboardProgressWidget = ({
  inProgress,
  completed,
}: TDashboardProgressWidgetProps) => {
  const { t } = useTranslation();

  const pills: TProgressPill[] = [
    { typeSpecial: "roadmap", value: 0 },
    { typeSpecial: "certificate", value: completed },
    { typeSpecial: "course", value: inProgress },
    { typeSpecial: "lesson", value: 0 },
    { typeSpecial: "lab", value: 0 },
  ];

  return (
    <div className="progress-widget">
      <div className="progress-widget__header">
        <h3>{t("dashboard.progress")}</h3>
      </div>
      <div className="progress-widget__grid">
        {pills.map((pill, index) => (
          <div key={index} className="progress-widget__grid-pill">
            <TextButton
              onClick={() => {}}
              text="text"
              size="tiny"
              type="special"
              typeSpecial={pill.typeSpecial}
            />
            <span className="num">{pill.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardProgressWidget;
