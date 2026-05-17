import React, { Suspense } from "react";
import Card from "@/components/Card";
import { MOCK_COURSES } from "@/mock";
import { useNavigate, redirect, useRouter } from "@tanstack/react-router";
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
import ErrorScene from "@/components/ErrorScene";
import TextButton from "@/components/TextButton";

function CoursesErrorComponent() {
  const router = useRouter();
  return (
    <ErrorScene>
      <ErrorScene.Header>
        <ErrorScene.Title errorCode={500}>Server Error</ErrorScene.Title>
        <ErrorScene.Description>
          Unable to load courses at this time. This could be a network issue or
          a server problem. Please try again.
        </ErrorScene.Description>
      </ErrorScene.Header>
      <ErrorScene.Content>
        <div className="error-scene__control">
          <TextButton
            text="Try Again"
            onClick={() => router.invalidate()}
            className="error-scene__btn"
            size="medium"
            icon="refresh"
          />
          <TextButton
            text="Go Back"
            onClick={() => window.history.back()}
            className="error-scene__btn error-scene__btn--secondary"
            size="medium"
            icon="arrow_back"
            type="outlined"
          />
        </div>
      </ErrorScene.Content>
    </ErrorScene>
  );
}

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
  errorComponent: CoursesErrorComponent,
  component: Dashboard,
});

function Dashboard() {
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

  return (
    <div className="dashboard">
      <Suspense fallback={<TetrisLoader size="md" />}>
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
                {(index + 1) % 3 === 0 &&
                  index !== displayCourse.length - 1 && (
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
      </Suspense>
    </div>
  );
}
