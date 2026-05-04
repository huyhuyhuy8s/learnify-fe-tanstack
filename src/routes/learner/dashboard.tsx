import React, { useLayoutEffect } from "react";
import Card from "@/components/Card";
import { MOCK_COURSES } from "@/mock";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import DashboardBanner from "./-components/DashboardBanner";
import DashboardStreakWidget from "./-components/DashboardStreakWidget";
import DashboardAchievementsWidget from "./-components/DashboardAchievementsWidget";
import DashboardProgressWidget from "./-components/DashboardProgressWidget";
import "./dashboard.scss";
import { useAuthStore } from "@/store";
import { createLearnerHead } from "@/utils";
import { useGetAllCourses, type TBackendCourse } from "@/hooks/useCourses";

export const Route = createFileRoute("/learner/dashboard")({
  head: () => ({
    ...createLearnerHead("Dashboard"),
  }),
  component: Dashboard,
});

function Dashboard() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllCourses(0);

  const getDisplayCourses = () => {
    if (!isLoading && !isError && data?.isSuccess && data.courses.length > 0) {
      return data.courses.map((course: TBackendCourse) => ({
        id: course.id,
        typeSpecial: "course" as const,
        title: course.courseName,
        description: course.abstract,
        duration: "45 mins",
        status: "default" as const,
        percentage: 0,
      }));
    }
    return MOCK_COURSES;
  };
  const displayCourse = getDisplayCourses();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/learner", replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <DashboardBanner />

        <div className="dashboard-main-courses">
          {displayCourse.map((course, index) => (
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
