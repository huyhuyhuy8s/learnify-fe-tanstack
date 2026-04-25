import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "./home.scss";
import Search from "@/components/Search";
import TextButton from "@/components/TextButton";
import { SEARCH_SUGGESTIONS } from "@/mock/home";
import DecorationShapes from "./-components/DecorationShapes";

export const Route = createFileRoute("/learner/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <DecorationShapes />
      <div className="title">
        <h1 className="semibold">
          Unlock your <span className="beauty">Potential</span> for tomorrow,
          today
        </h1>
        <h5 className="regular">
          Discover expert-led course with personalized guidance from our
          interactive 3D AI Teachers
        </h5>
      </div>
      <Search />
      <div className="search-suggestions">
        {SEARCH_SUGGESTIONS.map((item) => (
          <TextButton
            key={item}
            text={item}
            type="outlined"
            icon="subdirectory_arrow_right"
            roundedCorner="exceptUpperRight"
            size="medium"
            onClick={() => {
              navigate({ to: "/learner/search", search: { q: item } });
            }}
          />
        ))}
      </div>
    </div>
  );
}
