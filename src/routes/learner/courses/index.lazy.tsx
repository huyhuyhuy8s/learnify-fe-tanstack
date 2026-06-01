import "./courses.scss";

import Card from "@/components/Card";
import ErrorScene from "@/components/ErrorScene";
import Search from "@/components/Search";
import TetrisLoader from "@/components/TetrisLoader";
import TextButton from "@/components/TextButton";
import {
  useSuspenseGetAllCourses,
  type TBackendCourse,
} from "@/hooks/useCourses";
import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";

function CoursesErrorComponent() {
  const router = useRouter();
  const { t } = useTranslation();
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

export const Route = createLazyFileRoute("/learner/courses/")({
  errorComponent: CoursesErrorComponent,
  component: CoursesPage,
});

function CoursesPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data } = useSuspenseGetAllCourses(0);
  const isBackendSuccess = data?.isSuccess && data.courses.length > 0;

  const displayCourses = isBackendSuccess
    ? data.courses.map((course: TBackendCourse) => ({
        id: course.id,
        typeSpecial: "course" as const,
        title: course.courseName,
        description: course.abstract,
        duration: "45 mins",
        status: "default" as const,
        percentage: 0,
        badgeStatus: (course.status === "Published" ? "public" : "private") as
          | "public"
          | "private",
      }))
    : ([] as {
        id: string;
        typeSpecial: "course";
        title: string;
        description: string;
        duration: string;
        status: "default";
        percentage: number;
        badgeStatus: "public" | "private";
      }[]);

  return (
    <div className="courses-container">
      <Suspense fallback={<TetrisLoader />}>
        <div className="courses-container__title">
          <h2 className="courses-container__title-context medium">
            <Trans
              key={i18n.language}
              i18nKey="courses.title"
              components={{ Beauty: <span className="beauty" /> }}
            />
          </h2>
          <p className="courses-container__title-description regular">
            {t("courses.description")}
          </p>
        </div>
        <div className="courses-content">
          <Search
            onSearch={(query) =>
              navigate({ to: "/learner/courses", search: { q: query } })
            }
          />
          <div className="controls">
            <div className="filter">
              <TextButton
                text={t("courses.filter_course")}
                roundedCorner="roundedSquare"
                size="tiny"
                type="outlined"
                leftIcon={false}
                rightIcon
                icon="arrow_drop_down"
                onClick={() => navigate({ to: "/learner/courses" })}
              />
              <TextButton
                text={t("courses.filter_duration")}
                roundedCorner="roundedSquare"
                size="tiny"
                type="outlined"
                leftIcon={false}
                rightIcon
                icon="arrow_drop_down"
                onClick={() => navigate({ to: "/learner/courses" })}
              />
            </div>
            <p className="result">
              {t("courses.results", { count: displayCourses.length })}
            </p>
          </div>
          <div className="courses-list">
            {displayCourses.map((course) => (
              <Card
                key={course.id}
                typeSpecial={course.typeSpecial}
                title={course.title}
                description={course.description}
                duration={course.duration}
                status={course.status}
                percentage={course.percentage}
                badgeStatus={course.badgeStatus}
                onClick={() =>
                  navigate({
                    to: "/learner/courses/$courseId",
                    params: { courseId: course.id.toString() },
                  })
                }
              />
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
