import { Suspense } from "react";
import Card from "@/components/Card";
import Search from "@/components/Search";
import { MOCK_ROADMAP } from "@/mock";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CategoryItem from "./-components/CategoryItem";
import { CATEGORIES } from "./-constants";
import "./style.scss";
import TetrisLoader from "@/components/TetrisLoader";

export const Route = createFileRoute("/learner/roadmaps/")({
  head: () => ({
    meta: [{ title: "Roadmaps | Learnify for Learner" }],
  }),
  component: RoadmapsPage,
});

function RoadmapsPage() {
  const navigate = useNavigate();

  return (
    <div className="roadmaps-container">
      <Suspense fallback={<TetrisLoader />}>
        <div className="title">
          <h3 className="medium">
            Shape <span className="beauty">your future</span> by yourself
          </h3>
          <p className="regular">
            Roadmaps are collections of learnings designed to build deep skills
            in a particular area. Whether you're looking to earn achievements,
            build a collection of skills badges, or prepare for a certification,
            there are paths right for you. When you're done, share your
            accomplishments on social media and hiring platforms like Linkedin
            and Credly!
          </p>
        </div>
        <div className="roadmaps-content">
          <Search
            onSearch={(query) =>
              navigate({ to: "/learner/roadmaps", search: { q: query } })
            }
          />
          <div className="controls">
            <div className="categories-list">
              {CATEGORIES.map((item, index) => (
                <CategoryItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => undefined}
                />
              ))}
            </div>
          </div>
          <div className="roadmaps-list">
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
