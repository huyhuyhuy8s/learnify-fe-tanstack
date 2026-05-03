import { useState, useEffect } from "react";

export type TTheme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<TTheme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as TTheme;
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
