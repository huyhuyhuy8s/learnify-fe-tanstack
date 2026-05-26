import "./style.scss";

import PillTopNav from "@/components/PillTopNav";
import { ABOUT_STATS, ABOUT_VALUES } from "@/mock/about";
import { Route } from "@/routes/__root";
import { SUBSCRIPTIONS } from "@/routes/learner/subscriptions/-constants";
import { useNavigate } from "@tanstack/react-router";
import HeroSection from "./-components/HeroSection";
import LandingAudience from "./-components/LandingAudience";
import LandingFooter from "./-components/LandingFooter";
import LandingHow from "./-components/LandingHow";
import LandingStats from "./-components/LandingStats";
import LandingSubs from "./-components/LandingSubs";
import LandingValues from "./-components/LandingValues";
import { AUDIENCES, HOW_IT_WORKS } from "./constants";

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme } = Route.useLoaderData();

  return (
    <div className="landing">
      <PillTopNav initialTheme={theme || "light"} />
      <HeroSection
        onLearnerClick={() => navigate({ to: "/learner" })}
        onTeacherClick={() => navigate({ to: "/teacher" })}
      />
      <LandingStats stats={ABOUT_STATS} />
      <LandingHow steps={HOW_IT_WORKS} />
      <LandingAudience audiences={AUDIENCES} />
      <LandingSubs subscriptions={SUBSCRIPTIONS} />
      <LandingValues values={ABOUT_VALUES} />
      <LandingFooter />
    </div>
  );
}
