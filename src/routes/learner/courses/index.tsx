import { createFileRoute } from "@tanstack/react-router";
import { MOCK_COURSES } from "@/mock";
import "./style.scss";
import Card from "@/components/Card";
import { useNavigate } from "@tanstack/react-router";
import TextButton from "@/components/TextButton";
import Search from "@/components/Search";
import { useGetAllCourses, type TBackendCourse } from "@/hooks/useCourses";
export const Route = createFileRoute("/learner/courses/")({
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
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

  const displayCourses = getDisplayCourses();

  return (
    <div className="course-container">
      <div className="title">
        <h3 className="medium">
          Explore our <span className="beauty">Best courses</span> only for you
        </h3>
        <p className="regular">
          We offer a wide range of courses designed to help you achieve your
          learning goals. Whether you're looking to develop new skills, advance
          your career, or explore new interests, our courses are tailored to
          meet your needs. Browse through our course catalog and find the
          perfect course for you today!
        </p>
      </div>
      <div className="course-content">
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
          <p className="result">{MOCK_COURSES.length ?? 0} results</p>
        </div>
        <div className="course-list">
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
                  to: "/learner/courses/$postId",
                  params: { postId: course.id.toString() },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
