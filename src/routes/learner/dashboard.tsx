import React, { Suspense } from "react";
import Card from "@/components/Card";
import { MOCK_COURSES } from "@/mock";
import { useNavigate, redirect } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { getCurrentUserFn } from "@/server/auth";
import DashboardBanner from "./-components/DashboardBanner";
import DashboardStreakWidget from "./-components/DashboardStreakWidget";
import DashboardAchievementsWidget from "./-components/DashboardAchievementsWidget";
import DashboardProgressWidget from "./-components/DashboardProgressWidget";
import "./dashboard.scss";
import { createLearnerHead } from "@/utils";
import {
  useSuspenseGetAllCourses,
  type TBackendCourse,
} from "@/hooks/useCourses";
import TetrisLoader from "@/components/TetrisLoader";
import { logger } from "@/utils/logger";

export const Route = createFileRoute("/learner/dashboard")({
  beforeLoad: async ({ location }) => {
    const { user } = await getCurrentUserFn();
    if (!user)
      throw redirect({
        to: "/learner/log-in",
        search: { redirect: location.pathname },
      });
  },
  head: () => ({
    ...createLearnerHead("Dashboard"),
  }),
  component: Dashboard,
});

function DashboardInner() {
  const { data } = useSuspenseGetAllCourses(0);
  const navigate = useNavigate();
  const isBackendSuccess = data?.isSuccess && data.courses.length > 0;

  const displayCourse = isBackendSuccess
    ? data.courses.map((course: TBackendCourse) => ({
        id: course.id,
        typeSpecial: "course" as const,
        title: course.courseName,
        description: course.abstract,
        duration: "45 mins",
        status: "default" as const,
        percentage: 0,
      }))
    : MOCK_COURSES;

  logger.info(data, isBackendSuccess, displayCourse);

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
                    to: "/learner/courses/$courseId",
                    params: { courseId: course.id.toString() },
                  })
                }
              />
              {(index + 1) % 3 === 0 && index !== displayCourse.length - 1 && (
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

function Dashboard() {
  return (
    <Suspense fallback={<TetrisLoader />}>
      <DashboardInner />
    </Suspense>
  );
}
