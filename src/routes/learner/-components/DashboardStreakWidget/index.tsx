import "./style.scss";

const DashboardStreakWidget = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="streak-widget">
      <div className="streak-widget-top">
        <h1 className="streak-widget-top-number">0</h1>
        <div className="streak-widget-top-info">
          <span className="fire-icon">🔥</span>
          <span className="streak-text">
            Current
            <br />
            streak
          </span>
        </div>
      </div>
      <hr className="streak-widget-divider" />
      <div className="streak-widget-days">
        {days.map((day) => (
          <div key={day} className="streak-widget-days-item">
            <div className="circle" />
            <span>{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStreakWidget;
