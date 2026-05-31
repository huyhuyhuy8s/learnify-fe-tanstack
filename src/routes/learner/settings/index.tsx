import "./settings.scss";

import { useTranslation } from "react-i18next";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentUserFn } from "@/server/auth";
import { createLearnerHead } from "@/utils";
import { useThemeStore } from "@/store/themeStore";
import Icon from "@/components/Icon";

export const Route = createFileRoute("/learner/settings/")({
  beforeLoad: async ({ location }) => {
    const { user } = await getCurrentUserFn();
    if (!user)
      throw redirect({
        to: "/auth/log-in",
        search: { redirect: location.pathname },
      });
  },
  head: () => ({
    ...createLearnerHead("Settings"),
  }),
  component: Settings,
});

function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="settings-page">
      <h1 className="settings-page_title">{t("settings.title")}</h1>

      <div className="settings-page_section">
        <div className="settings-page_row">
          <div className="settings-page_row-left">
            <Icon name={theme === "dark" ? "dark_mode" : "light_mode"} />
            <span>{t("settings.theme")}</span>
          </div>
          <button className="settings-page_btn" onClick={toggleTheme}>
            {theme === "dark" ? t("settings.dark") : t("settings.light")}
          </button>
        </div>

        <div className="settings-page_row">
          <div className="settings-page_row-left">
            <Icon name="language" />
            <span>{t("settings.language")}</span>
          </div>
          <button
            className="settings-page_btn"
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "vi" : "en")
            }
          >
            {i18n.language === "en" ? "EN" : "VI"}
          </button>
        </div>
      </div>
    </div>
  );
}
