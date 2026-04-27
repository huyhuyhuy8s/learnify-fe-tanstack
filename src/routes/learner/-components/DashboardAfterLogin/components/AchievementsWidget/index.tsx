import React from "react";
import "./style.scss";

const AchievementsWidget = () => {
  return (
    <div className="achievements-widget">
      <div className="achievements-widget-header">
        <h3>Achievements</h3>
        <span className="count">50 / 150</span>
      </div>
      <div className="achievements-widget-badges">
        <div className="badge-mock yellow">
          <div className="inner-shape"></div>
          <span className="label">Path Enroll</span>
        </div>
        <div className="badge-mock red">
          <div className="inner-shape"></div>
          <span className="label">First Lab</span>
        </div>
      </div>
      <div className="achievements-widget-action">
        <button className="btn-more">More &rarr;</button>
      </div>
    </div>
  );
};

export default AchievementsWidget;
