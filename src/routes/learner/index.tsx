import { useTranslation, Trans } from "react-i18next";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import Search from "@/components/Search";
import TextButton from "@/components/TextButton";
import { getCurrentUserFn } from "@/server/auth";
import DecorationShapes from "./-components/DecorationShapes";
import "./home.scss";

export const Route = createFileRoute("/learner/")({
  beforeLoad: async ({ location }) => {
    const { user } = await getCurrentUserFn();
    if (user)
      throw redirect({
        to: "/learner/dashboard",
        search: { redirect: location.pathname },
      });
    return { user };
  },
  component: Home,
});

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const suggestions = t("home.search_suggestions", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="home">
      <DecorationShapes />
      <div className="home__title">
        <h1 className="home__title-main semibold">
          <Trans
            key={i18n.language}
            i18nKey="home.title"
            components={{ Beauty: <span className="beauty" /> }}
          />
        </h1>
        <p className="home__title-sub regular">{t("home.subtitle")}</p>
      </div>
      <Search />
      <div className="search-suggestions">
        {suggestions.map((item) => (
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
