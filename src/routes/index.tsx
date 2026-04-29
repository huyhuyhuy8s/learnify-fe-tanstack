import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import "@/styles/_global.scss";
import { MOCK_COURSES, MOCK_USER, WEEK_DAYS } from "@/mock/dashboard";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    throw redirect({
      to: "/learner",
    });
  },
  component: HomePage,
});

function HomePage() {
  const featuredCourses = MOCK_COURSES.slice(0, 3);
  const streak = MOCK_USER.streak;
  const achievements = MOCK_USER.achievements;
  const achievementCount = achievements.length;
  const achievementTotal = MOCK_USER.achievementTotal;
  const activeDays = MOCK_USER.activeDays;

  return <div className=""></div>;
}
