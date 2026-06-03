import "./roadmaps.scss";

import Card from "@/components/Card";
import ErrorScene from "@/components/ErrorScene";
import Search from "@/components/Search";
import TetrisLoader from "@/components/TetrisLoader";
import TextButton from "@/components/TextButton";
import { useSuspenseAllRoadmaps } from "@/hooks/useRoadmap";
import { createLearnerHead } from "@/utils";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Suspense, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import CategoryItem from "./-components/CategoryItem";
import { CATEGORIES } from "./-constants";

function RoadmapsErrorComponent() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <ErrorScene>
      <ErrorScene.Header>
        <ErrorScene.Title errorCode={500}>
          {t("errors.server_error")}
        </ErrorScene.Title>
        <ErrorScene.Description>
          {t("errors.load_roadmaps")}
        </ErrorScene.Description>
      </ErrorScene.Header>
      <ErrorScene.Content>
        <div className="error-scene__control">
          <TextButton
            text={t("errors.try_again")}
            onClick={() => router.invalidate()}
            className="error-scene__btn"
            size="medium"
            icon="refresh"
          />
          <TextButton
            text={t("errors.go_back")}
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

export const Route = createFileRoute("/learner/roadmaps/")({
  head: () => createLearnerHead("Roadmaps"),
  errorComponent: RoadmapsErrorComponent,
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
      duration: undefined,
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
