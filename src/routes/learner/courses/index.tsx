import { createFileRoute } from "@tanstack/react-router";
import { MOCK_COURSES } from "@/mock/course";
import "./style.scss";
import Card from "@/components/Card";
import { useNavigate } from "@tanstack/react-router";
import TextButton from "@/components/TextButton";
export const Route = createFileRoute("/learner/courses/")({
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  const navigate = useNavigate();

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
        <form aria-checked className="search">
          <input type="text" placeholder="Search for courses..." id="search" />
          <button>
            <span className="material-symbols-rounded">search</span>
          </button>
        </form>
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
          <p className="result">1200 results</p>
        </div>
        <div className="course-list">
          {MOCK_COURSES.map((course) => (
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
