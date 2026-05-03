import React from "react";
import Card from "@/components/Card";
import { MOCK_COURSES } from "@/mock";
import { useNavigate, redirect } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import DashboardBanner from "./-components/DashboardBanner";
import DashboardStreakWidget from "./-components/DashboardStreakWidget";
import DashboardAchievementsWidget from "./-components/DashboardAchievementsWidget";
import DashboardProgressWidget from "./-components/DashboardProgressWidget";
import "./dashboard.scss";
import { useAuthStore } from "@/store";
import { createLearnerHead } from "@/utils";

export const Route = createFileRoute("/learner/dashboard")({
  beforeLoad: () => {
    const { isAuthenticated, isHydrated } = useAuthStore.getState();
    if (isHydrated && !isAuthenticated) {
      throw redirect({
        to: "/learner",
      });
    }
  },
  head: () => ({
    ...createLearnerHead("Dashboard"),
  }),
  component: Dashboard,
});

function Dashboard() {
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
          <DashboardStreakWidget />
        </div>

        <div className="dashboard-sidebar-widget">
          <DashboardAchievementsWidget />
        </div>

        <div className="dashboard-sidebar-widget">
          <DashboardProgressWidget />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
