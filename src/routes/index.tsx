import { getCurrentUserFn } from "@/server/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import LandingPage from "@/routes/-components/LandingPage";
import {
  MarketingErrorComponent,
  MarketingNotFoundComponent,
  MarketingPendingComponent,
} from "@/utils/marketing";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    if (user) {
      const target = user.role === "teacher" ? "/teacher" : "/learner";
      throw redirect({ to: target });
    }
  },
  errorComponent: MarketingErrorComponent,
  pendingComponent: MarketingPendingComponent,
  notFoundComponent: MarketingNotFoundComponent,
  head: () => ({
    meta: [
      ...seo({
        title: "Learnify | Smart Learning. Real Skills. Ready Careers.",
        description:
          "Learnify is an educational platform that combines AI-powered 3D lecturers with hands-on labs. Built for learners, teachers, and academic institutions.",
      }),
    ],
  }),
  component: LandingPage,
});
