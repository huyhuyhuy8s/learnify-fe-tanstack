import "./style.scss";

import IconButton from "@/components/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

const useHydrated = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

const LeftNavBot = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const hydrated = useHydrated();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isTeacher = pathname.startsWith("/teacher");

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(next);
  };

  return (
    <div className="left-nav-bot">
      <IconButton
        icon={isTeacher ? "school" : "local_library"}
        shape="circle"
        type="outlined"
        size="small"
        onClick={() => navigate({ to: isTeacher ? "/learner" : "/teacher" })}
        tooltip={
          isTeacher
            ? t("common.switch_to_learner")
            : t("common.switch_to_teacher")
        }
        ariaLabel={
          isTeacher
            ? t("common.switch_to_learner")
            : t("common.switch_to_teacher")
        }
      />
      <IconButton
        icon={i18n.language === "en" ? "globe_asia" : "language"}
        shape="circle"
        type="outlined"
        size="small"
        onClick={toggleLanguage}
        tooltip={t("common.language")}
        ariaLabel={t("common.language")}
      />
      {!hydrated ? (
        <div className="left-nav-bot__theme-placeholder" />
      ) : (
        <IconButton
          icon={theme === "light" ? "dark_mode" : "light_mode"}
          specialIcon={theme === "light" ? "light_mode" : "dark_mode"}
          shape="circle"
          type="outlined"
          size="small"
          onClick={toggleTheme}
          tooltip={t("common.toggle_dark_mode")}
          ariaLabel={t("common.toggle_dark_mode")}
        />
      )}
    </div>
  );
};

export default LeftNavBot;
