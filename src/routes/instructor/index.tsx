import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getCurrentUserFn } from "@/server/auth";
import Search from "@/components/Search";
import TextButton from "@/components/TextButton";
import "./style.scss";

export const Route = createFileRoute("/instructor/")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    return { user };
  },
  component: InstructorHome,
});

function InstructorHome() {
  const navigate = useNavigate();

  return (
    <div className="instructor-home">
      <div className="instructor-home__hero">
        <h1 className="instructor-home__title semibold">
          Welcome to the <span className="beauty">Instructor Dashboard</span>
        </h1>
        <p className="instructor-home__subtitle regular">
          Create courses, manage students, and track learning progress.
        </p>
      </div>
      <Search placeholder="Search your courses..." />
      <div className="instructor-home__actions">
        <TextButton
          text="Create Course"
          size="medium"
          icon="add"
          onClick={() => {}}
        />
        <TextButton
          text="Manage Courses"
          size="medium"
          type="outlined"
          icon="book"
          onClick={() =>
            navigate({
              to: "/learner/courses",
            })
          }
        />
        <TextButton
          text="Switch to Learner"
          size="medium"
          type="outlined"
          icon="school"
          onClick={() =>
            navigate({
              to: "/learner",
            })
          }
        />
      </div>
    </div>
  );
}
