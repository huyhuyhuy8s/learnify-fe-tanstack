import IconButton from "@/components/IconButton";
import { useTheme } from "@/hooks/useTheme";

const LeftNavBot = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="left-nav-bot">
      <IconButton
        icon="language"
        specialIcon="globe_asia"
        shape="circle"
        type="outlined"
        size="small"
      />
      <IconButton
        icon={theme === "light" ? "dark_mode" : "light_mode"}
        specialIcon={theme === "light" ? "light_mode" : "dark_mode"}
        shape="circle"
        type="outlined"
        size="small"
        onClick={toggleTheme}
      />
    </div>
  );
};

export default LeftNavBot;
