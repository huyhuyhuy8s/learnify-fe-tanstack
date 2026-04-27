import React from "react";
import "./style.scss";
import Card from "@/components/Card";
import { MOCK_COURSES } from "@/mock/dashboard";
import { useNavigate } from "@tanstack/react-router";
import DashboardBanner from "./components/DashboardBanner";
import StreakWidget from "./components/StreakWidget";
import AchievementsWidget from "./components/AchievementsWidget";
import ProgressWidget from "./components/ProgressWidget";

const DashboardAfterLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <DashboardBanner />

        <div className="dashboard-main-courses">
          {MOCK_COURSES.map((course, index) => (
            <React.Fragment key={course.id}>
              <Card
                typeSpecial={course.typeSpecial}
                title={course.title}
                description={course.description}
                duration={course.duration}
                status={course.status}
                percentage={course.percentage}
                onClick={() =>
                  navigate({
                    to: "/learner/courses/$postId",
                    params: { postId: course.id.toString() },
                  })
                }
              />
              {(index + 1) % 3 === 0 && index !== MOCK_COURSES.length - 1 && (
                <hr className="course-row-divider" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-widget">
          <StreakWidget />
        </div>

        <div className="dashboard-sidebar-widget">
          <AchievementsWidget />
        </div>

        <div className="dashboard-sidebar-widget">
          <ProgressWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardAfterLogin;
