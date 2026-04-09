import LeftNavTop from "./components/LeftNavTop";
import LeftNavBot from "./components/LeftNavBot";
import Controller from "./components/Controller";
import classnames from "classnames";
import { useState, useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import usePathname from "./hooks/usePathname";
import { useScrollTop } from "@/hooks/useScrollTop";
import "./style.scss";

interface LeftNavProps {
  className?: string;
}

const LeftNav = (props: LeftNavProps) => {
  const { className } = props;
  const [active, setActive] = useState(true);
  const pathnames = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isTop = useScrollTop();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      if (e.matches) {
        setActive(false);
      } else {
        setActive(true);
      }
    };

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  const navClassNames = classnames(
    "left-nav",
    { active: active, top: isTop },
    className
  );

  return (
    <nav className={navClassNames}>
      <LeftNavTop pathname={pathnames} />
      <LeftNavBot />
      <Controller active={active} onClick={() => setActive(!active)} />
    </nav>
  );
};

export default LeftNav;
