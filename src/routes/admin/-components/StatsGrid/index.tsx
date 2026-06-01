import Icon from "@/components/Icon";
import "./style.scss";

type StatsGridProps = {
  totalUsers: number;
  todaySubscribers: number;
};

type TStatCard = {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  colorMod: "blue" | "green" | "orange" | "red";
};

const StatsGrid = ({ totalUsers, todaySubscribers }: StatsGridProps) => {
  const STAT_CARDS: TStatCard[] = [
    {
      id: "stat-total-users",
      label: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: "group",
      trend: "+8.2% from last month",
      trendUp: true,
      colorMod: "blue",
    },
    {
      id: "stat-today-subscribers",
      label: "Today Subscriber",
      value: todaySubscribers.toLocaleString(),
      icon: "person_add",
      trend: "+12.5% from yesterday",
      trendUp: true,
      colorMod: "green",
    },
    {
      id: "stat-revenue",
      label: "Revenue",
      value: "$48,290",
      icon: "payments",
      trend: "+3.1% from last week",
      trendUp: true,
      colorMod: "orange",
    },
    {
      id: "stat-system-bugs",
      label: "System Bug",
      value: "7",
      icon: "bug_report",
      trend: "-2 from last week",
      trendUp: false,
      colorMod: "red",
    },
  ];

  return (
    <div className="admin-stats-grid">
      {STAT_CARDS.map((card) => (
        <div
          key={card.id}
          id={card.id}
          className={`admin-stats-grid__card admin-stats-grid__card--${card.colorMod}`}
        >
          <div className="admin-stats-grid__card-top">
            <div className="admin-stats-grid__icon-wrap">
              <Icon name={card.icon} size={22} />
            </div>
            <span className="admin-stats-grid__label">{card.label}</span>
          </div>
          <p className="admin-stats-grid__value">{card.value}</p>
          {card.trend && (
            <p
              className={`admin-stats-grid__trend ${
                card.trendUp
                  ? "admin-stats-grid__trend--up"
                  : "admin-stats-grid__trend--down"
              }`}
            >
              <Icon
                name={card.trendUp ? "trending_up" : "trending_down"}
                size={14}
              />
              {card.trend}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
