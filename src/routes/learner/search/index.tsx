import Card from "@/components/Card";
import Empty from "@/components/Empty";
import ErrorScene from "@/components/ErrorScene";
import Icon from "@/components/Icon";
import TetrisLoader from "@/components/TetrisLoader";
import TextButton from "@/components/TextButton";
import {
  useSuspenseGetAllCourses,
  type TBackendCourse,
} from "@/hooks/useCourses";
import { createLearnerHead } from "@/utils";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Suspense, useMemo } from "react";
import { z } from "zod";
import "./style.scss";

const searchSchema = z.object({
  q: z.string().catch(""),
});

function SearchErrorComponent() {
  const router = useRouter();
  return (
    <ErrorScene>
      <ErrorScene.Header>
        <ErrorScene.Title errorCode={500}>Server Error</ErrorScene.Title>
        <ErrorScene.Description>
          Something went wrong while searching. Please try again.
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

export const Route = createFileRoute("/learner/search/")({
  validateSearch: searchSchema,
  errorComponent: SearchErrorComponent,
  head: () => createLearnerHead("Search"),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const { data } = useSuspenseGetAllCourses(0);

  const filteredCourses = useMemo(() => {
    if (!data?.isSuccess || !q.trim()) return [];
    const query = q.toLowerCase().trim();
    return data.courses.filter(
      (course: TBackendCourse) =>
        course.courseName.toLowerCase().includes(query) ||
        course.abstract?.toLowerCase().includes(query)
    );
  }, [data, q]);

  const displayCourses = filteredCourses.map((course: TBackendCourse) => ({
    id: course.id,
    typeSpecial: "course" as const,
    title: course.courseName,
    description: course.abstract,
    duration: 45,
    status: "default" as const,
    percentage: 0,
  }));

  return (
    <Suspense fallback={<TetrisLoader />}>
      <div className="search-page">
        <div className="search-page__header">
          <h2 className="medium">
            {q.trim()
              ? `Showing results for "${q.trim()}"`
              : "Search for courses"}
          </h2>
          <p className="regular">{displayCourses.length} course(s) found</p>
        </div>
        {displayCourses.length > 0 ? (
          <div className="search-page__list">
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
        ) : q.trim() ? (
          <Empty>
            <Empty.Header>
              <Empty.Media variant="icon">
                <Icon name="search_off" />
              </Empty.Media>
              <Empty.Title>No results found</Empty.Title>
              <Empty.Description>
                Try a different search term or browse courses.
              </Empty.Description>
            </Empty.Header>
          </Empty>
        ) : null}
      </div>
    </Suspense>
  );
}
