import { useTranslation } from "react-i18next";
import "./style.scss";

type ChartSectionProps = {
  labels: string[];
  dataPoints: number[];
};

const ChartSection = ({ labels, dataPoints }: ChartSectionProps) => {
  const { t } = useTranslation();
  const maxVal = Math.max(...dataPoints, 10);
  const minVal = 0;
  const range = maxVal - minVal || 1;
  const W = 600;
  const H = 160;
  const PAD = 24;
  const plotW = W - PAD * 2;
  const plotH = H - PAD * 2;

  const points = dataPoints
    .map((val, i) => {
      const x = PAD + (i / (dataPoints.length - 1 || 1)) * plotW;
      const y = PAD + ((maxVal - val) / range) * plotH;
      return `${x},${y}`;
    })
    .join(" ");

  const firstX = PAD;
  const lastX = PAD + plotW;
  const baseY = PAD + plotH;
  const fillPoints = `${firstX},${baseY} ${points} ${lastX},${baseY}`;

  const yLabels = [
    maxVal,
    Math.round(maxVal * 0.75),
    Math.round(maxVal * 0.5),
    Math.round(maxVal * 0.25),
    0,
  ];

  return (
    <div className="admin-chart">
      <div className="admin-chart__header">
        <h2 className="admin-chart__title">{t("admin.chart.title")}</h2>
        <span className="admin-chart__badge">Last 7 Days</span>
      </div>

      <div className="admin-chart__body">
        <div className="admin-chart__y-labels">
          {yLabels.map((v, i) => (
            <span key={i} className="admin-chart__y-label">
              {v}
            </span>
          ))}
        </div>

        <div className="admin-chart__svg-wrap">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="admin-chart__svg"
            aria-label={t("admin.chart.aria_label")}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4361ee" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4361ee" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {[0.25, 0.5, 0.75, 1].map((frac) => (
              <line
                key={frac}
                x1={PAD}
                y1={PAD + frac * plotH}
                x2={PAD + plotW}
                y2={PAD + frac * plotH}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            ))}

            <polygon points={fillPoints} fill="url(#chartGradient)" />

            <polyline
              points={points}
              fill="none"
              stroke="#4361ee"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {dataPoints.map((val, i) => {
              const x = PAD + (i / (dataPoints.length - 1 || 1)) * plotW;
              const y = PAD + ((maxVal - val) / range) * plotH;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#fff"
                  stroke="#4361ee"
                  strokeWidth="2.5"
                />
              );
            })}
          </svg>

          <div className="admin-chart__x-labels">
            {labels.map((d, i) => (
              <span key={i} className="admin-chart__x-label">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
