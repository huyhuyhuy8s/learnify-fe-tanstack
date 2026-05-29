import LeftNavTop from "./components/LeftNavTop";
import LeftNavBot from "./components/LeftNavBot";
import Controller from "./components/Controller";
import classnames from "classnames";
import { useState, useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useScrollTop } from "@/hooks/useScrollTop";
import Icon from "@/components/Icon";
import "./style.scss";

type TLeftNavProps = {
  className?: string;
  compact?: boolean;
};

const LeftNav = (props: TLeftNavProps) => {
  const { className, compact = false } = props;
  const [active, setActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathnames = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isTop = useScrollTop();

  const navClassNames = classnames(
    "left-nav",
    { active: active, top: isTop && !compact, compact: compact },
    className
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      const matches = e.matches;
      setIsMobile(matches);
      if (matches) {
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

  const handleOverlayClick = () => {
    setActive(false);
  };

  if (compact) {
    return (
      <nav className={navClassNames}>
        <button aria-label="Toggle navigation menu">
          <Icon name="menu" />
        </button>
      </nav>
    );
  }

  return (
    <>
      {active && isMobile && (
        <div
          ref={overlayRef}
          className="left-nav__overlay"
          onClick={handleOverlayClick}
          data-lenis-prevent
        />
      )}
      <nav className={navClassNames} data-lenis-prevent>
        <LeftNavTop pathname={pathnames} />
        <LeftNavBot />
        <Controller active={active} onClick={() => setActive(!active)} />
      </nav>
    </>
  );
};

export default LeftNav;
