import { createFileRoute } from "@tanstack/react-router";
import "./roadmaps.scss";

export const Route = createFileRoute("/learner/roadmaps/")({
  component: RoadmapsPage,
});

function RoadmapsPage() {
  return (
    <div className="roadmaps">
      <div className="roadmaps__container">
        <header className="roadmaps__header">
          <div className="roadmaps__header-left">
            <div>
              <h1 className="roadmaps__title">Mind Map</h1>
              <p className="roadmaps__subtitle">Mind map storage</p>
            </div>
          </div>

          <div className="roadmaps__actions">
            <button className="roadmaps__action-btn" title="Tải mindmap">
              <span className="roadmaps__action-text">Export</span>
            </button>

            <button
              className="roadmaps__action-btn"
              title="Làm mới"
              onClick={() => window.location.reload()}
            >
              <span className="roadmaps__action-text">Reload</span>
            </button>
          </div>
        </header>

        <main className="roadmaps__main">
          <h1 className="roadmaps__main-title">
            In Progress, Wait for releasing
          </h1>
        </main>
      </div>
    </div>
  );
}
