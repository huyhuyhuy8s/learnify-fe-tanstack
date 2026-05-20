import Card from "@/components/Card";
import ErrorScene from "@/components/ErrorScene";
import Search from "@/components/Search";
import TetrisLoader from "@/components/TetrisLoader";
import TextButton from "@/components/TextButton";
import {
  useSuspenseGetAllCourses,
  type TBackendCourse,
} from "@/hooks/useCourses";
import { MOCK_COURSES } from "@/mock";
import { createLearnerHead } from "@/utils";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Suspense } from "react";
import "./style.scss";

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

export const Route = createFileRoute("/learner/courses/")({
  head: () => createLearnerHead("Courses"),
  errorComponent: CoursesErrorComponent,
  component: CoursesPage,
});

function CoursesPage() {
  const navigate = useNavigate();
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
      }))
    : MOCK_COURSES;

  return (
    <Suspense fallback={<TetrisLoader />}>
      <div className="courses-container">
        <div className="courses-container__title">
          <h2 className="courses-container__title-context medium">
            Explore our <span className="beauty">Best courses</span> only for
            you
          </h2>
          <p className="courses-container__title-description regular">
            We offer a wide range of courses designed to help you achieve your
            learning goals. Whether you're looking to develop new skills,
            advance your career, or explore new interests, our courses are
            tailored to meet your needs. Browse through our course catalog and
            find the perfect course for you today!
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
                text="course"
                roundedCorner="roundedSquare"
                size="tiny"
                type="outlined"
                leftIcon={false}
                rightIcon
                icon="arrow_drop_down"
                onClick={() => navigate({ to: "/learner/courses" })}
              />
              <TextButton
                text="duration"
                roundedCorner="roundedSquare"
                size="tiny"
                type="outlined"
                leftIcon={false}
                rightIcon
                icon="arrow_drop_down"
                onClick={() => navigate({ to: "/learner/courses" })}
              />
            </div>
            <p className="result">{displayCourses.length} results</p>
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
      </div>
    </Suspense>
  );
}
