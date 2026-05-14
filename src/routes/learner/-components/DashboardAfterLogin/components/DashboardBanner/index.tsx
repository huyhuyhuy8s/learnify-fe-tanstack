import React from "react";
import "./style.scss";
import { Flower } from "@/components/Shapes/Flower";
import { COLORS } from "@/styles/colors";

const DashboardBanner = () => {
  return (
    <div className="dashboard-banner">
      <div className="dashboard-banner-icon">
        <Flower
          size="300px"
          color={COLORS.modeGreen}
          stroke={COLORS.modeOrange}
          strokeWidth={50}
        />
      </div>

      <div className="dashboard-banner-content">
        <h2 className="dashboard-banner-content-title">
          Plan your learning journey
        </h2>
        <p className="dashboard-banner-content-description">
          Start now to set your priorities and progress toward your goals with a
          clear, structured plan.
        </p>
      </div>

      <div className="dashboard-banner-action">
        <button>Explore courses</button>
      </div>
    </div>
  );
};

export default DashboardBanner;
