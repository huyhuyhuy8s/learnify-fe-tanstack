import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import Card from "@/components/Card";
import Search from "@/components/Search";
import TetrisLoader from "@/components/TetrisLoader";
import CategoryItem from "./-components/CategoryItem";
import { CATEGORIES } from "./-constants";
import { useSuspenseAllRoadmaps } from "@/hooks/useRoadmap";
import { createLearnerHead } from "@/utils";
import "./style.scss";

export const Route = createFileRoute("/learner/roadmaps/")({
  head: () => createLearnerHead("Roadmaps"),
  component: RoadmapsPage,
});

function RoadmapsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { data: roadmapData } = useSuspenseAllRoadmaps();

  const displayRoadmaps = useMemo(() => {
    if (!roadmapData?.roadmap) return [];

    return roadmapData.roadmap.map((item) => ({
      id: item.id,
      typeSpecial: "roadmap" as const,
      title: item.roadMapName,
      description: item.abstract,
      duration: "--",
      status: "default" as const,
      percentage: 0,
    }));
  }, [roadmapData]);

  return (
    <div className="roadmaps-container">
      <Suspense fallback={<TetrisLoader />}>
        <div className="roadmaps-container__title">
          <h2 className="medium">
            <Trans
              key={i18n.language}
              i18nKey="roadmaps.headline"
              components={{ Beauty: <span className="beauty" /> }}
            />
          </h2>
          <p className="regular">{t("roadmaps.description")}</p>
        </div>
        <div className="roadmaps-content">
          <Search
            onSearch={(query) =>
              navigate({ to: "/learner/roadmaps", search: { q: query } })
            }
          />
          <div className="roadmaps-container__categories-list">
            {CATEGORIES.map((item, index) => (
              <CategoryItem
                key={index}
                icon={item.icon}
                labelKey={item.labelKey}
                onClick={() => undefined}
              />
            ))}
          </div>

          <div className="roadmaps-container__list">
            {displayRoadmaps.map((roadmap) => (
              <Card
                key={roadmap.id}
                typeSpecial={roadmap.typeSpecial}
                title={roadmap.title}
                description={roadmap.description}
                duration={roadmap.duration}
                status={roadmap.status}
                percentage={roadmap.percentage}
                onClick={() =>
                  navigate({
                    to: "/learner/roadmaps/$roadmapId",
                    params: {
                      roadmapId: roadmap.id.toString(),
                    },
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
