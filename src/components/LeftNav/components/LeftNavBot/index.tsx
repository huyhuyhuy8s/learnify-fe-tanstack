import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import IconButton from "@/components/IconButton";
import { useTheme } from "@/hooks/useTheme";
import "./style.scss";

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

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(next);
  };

  return (
    <div className="left-nav-bot">
      <IconButton
        icon="language"
        specialIcon="globe_asia"
        shape="circle"
        type="outlined"
        size="small"
        onClick={toggleLanguage}
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
          ariaLabel={t("common.toggle_dark_mode")}
        />
      )}
    </div>
  );
};

export default LeftNavBot;
