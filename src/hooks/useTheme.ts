import { useState, useEffect } from "react";

export type TTheme = "light" | "dark";

const readTheme = (): TTheme => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)app-theme=([^;]*)/);
    if (match?.[1]) return match[1] as TTheme;
  }
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState<TTheme>(readTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    document.cookie = `app-theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
