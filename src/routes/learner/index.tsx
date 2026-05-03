import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import "./home.scss";
import Search from "@/components/Search";
import TextButton from "@/components/TextButton";
import { SEARCH_SUGGESTIONS } from "@/mock";
import DecorationShapes from "./-components/DecorationShapes";
import { useAuthStore } from "@/store";

export const Route = createFileRoute("/learner/")({
  component: RouteComponent,
  beforeLoad: () => {
    const { isAuthenticated, isHydrated } = useAuthStore.getState();
    if (isHydrated && isAuthenticated) {
      throw redirect({
        to: "/learner/dashboard",
      });
    }
  },
});

function RouteComponent() {
  return <Unauthorized />;
}

function Unauthorized() {
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
