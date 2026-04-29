import Card from "@/components/Card";
import Search from "@/components/Search";
import TextButton from "@/components/TextButton";
import { MOCK_ROADMAP } from "@/mock/roadmap";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "./style.scss";

export const Route = createFileRoute("/learner/roadmaps/")({
  component: RoadmapsPage,
});

function RoadmapsPage() {
  const navigate = useNavigate();

  const CATEGORIES = [
    { icon: "smart_toy", label: "AI / LLM" },
    { icon: "calculate", label: "Calculus" },
    { icon: "code", label: "Program" },
    { icon: "bar_chart", label: "Data" },
    { icon: "brush", label: "Design" },
    { icon: "language", label: "Language" },
  ];
  return (
    <div className="roadmap-container">
      <div className="title">
        <h3 className="medium">
          Shape <span className="beauty">your future</span> by yourself
        </h3>
        <p className="regular">
          Roadmaps are collections of learnings designed to build deep skills in
          a particular area. Whether you’re looking to earn achievements, build
          a collection of skills badges, or prepare for a certification, there
          are paths right for you. When you’re done, share your accomplishments
          on social media and hiring platforms like Linkedin and Credly!
        </p>
      </div>
      <div className="roadmap-content">
        <Search
          onSearch={(query) =>
            navigate({ to: "/learner/roadmaps", search: { q: query } })
          }
        />
        <div className="controls">
          <div className="categories-list">
            {CATEGORIES.map((item, index) => (
              <div
                className="category-item"
                key={index}
                onClick={() => console.log(`Maps to ${item.label}`)}
              >
                <span className="material-symbols-rounded icon">
                  {item.icon}
                </span>
                <span className="label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="roadmap-list">
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
                  params: { roadmapId: roadmap.id.toString() },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
