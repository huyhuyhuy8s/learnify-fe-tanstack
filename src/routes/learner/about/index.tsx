import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ABOUT_STATS, ABOUT_VALUES } from "@/mock/about";
import Footer from "@/components/Footer";

const TeamImage = lazy(() => import("@/components/TeamImage/index.tsx"));

export const Route = createFileRoute("/learner/about/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <></>
  )
}
