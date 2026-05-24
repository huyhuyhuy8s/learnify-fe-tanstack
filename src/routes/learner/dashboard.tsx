import Card from "@/components/Card";
import { useTranslation } from "react-i18next";
import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import React, { Suspense } from "react";
import ErrorScene from "@/components/ErrorScene";
import TetrisLoader from "@/components/TetrisLoader";
import TextButton from "@/components/TextButton";
import {
  useSuspenseGetAllCourses,
  type TBackendCourse,
} from "@/hooks/useCourses";
import { MOCK_COURSES } from "@/mock";
import { getCurrentUserFn } from "@/server/auth";
import { createLearnerHead } from "@/utils";
import DashboardAchievementsWidget from "./-components/DashboardAchievementsWidget";
import DashboardBanner from "./-components/DashboardBanner";
import DashboardProgressWidget from "./-components/DashboardProgressWidget";
import DashboardStreakWidget from "./-components/DashboardStreakWidget";
import "./dashboard.scss";

function CoursesErrorComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <ErrorScene>
      <ErrorScene.Header>
        <ErrorScene.Title errorCode={500}>
          {t("errors.server_error")}
        </ErrorScene.Title>
        <ErrorScene.Description>
          {t("errors.load_courses")}
        </ErrorScene.Description>
      </ErrorScene.Header>
      <ErrorScene.Content>
        <div className="error-scene__control">
          <TextButton
            text={t("errors.try_again")}
            onClick={() => router.invalidate()}
            className="error-scene__btn"
            size="medium"
            icon="refresh"
          />
          <TextButton
            text={t("errors.go_back")}
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
        <div className="dashboard__main">
          <DashboardBanner />
          <div className="dashboard__main-courses">
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
                    <hr className="dashboard__row-divider" />
                  )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="dashboard__sidebar">
          <div className="dashboard__sidebar-widget">
            <DashboardStreakWidget />
          </div>
          <div className="dashboard__sidebar-widget">
            <DashboardAchievementsWidget />
          </div>
          <div className="dashboard__sidebar-widget">
            <DashboardProgressWidget />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
