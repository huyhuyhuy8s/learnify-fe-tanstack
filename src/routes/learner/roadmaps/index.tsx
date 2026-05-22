import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import Card from "@/components/Card";
import Search from "@/components/Search";
import TetrisLoader from "@/components/TetrisLoader";
import { MOCK_ROADMAP } from "@/mock";
import CategoryItem from "./-components/CategoryItem";
import { CATEGORIES } from "./-constants";
import "./style.scss";

export const Route = createFileRoute("/learner/roadmaps/")({
  head: () => ({
    meta: [{ title: "Roadmaps | Learnify for Learner" }],
  }),
  component: RoadmapsPage,
});

function RoadmapsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
            {MOCK_ROADMAP.map((roadmap) => (
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
