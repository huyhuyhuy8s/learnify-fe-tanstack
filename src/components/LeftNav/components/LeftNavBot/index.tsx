import { useSyncExternalStore } from "react";
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
  const { theme, toggleTheme } = useTheme();
  const hydrated = useHydrated();

  return (
    <div className="left-nav-bot">
      <IconButton
        icon="language"
        specialIcon="globe_asia"
        shape="circle"
        type="outlined"
        size="small"
      />
      {!hydrated ? (
        <div className="left-nav-bot-theme-placeholder" />
      ) : (
        <IconButton
          icon={theme === "light" ? "dark_mode" : "light_mode"}
          specialIcon={theme === "light" ? "light_mode" : "dark_mode"}
          shape="circle"
          type="outlined"
          size="small"
          onClick={toggleTheme}
        />
      )}
    </div>
  );
};

export default LeftNavBot;
