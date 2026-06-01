import LeftNavTop from "./components/LeftNavTop";
import LeftNavBot from "./components/LeftNavBot";
import Controller from "./components/Controller";
import classnames from "classnames";
import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useIsMobile } from "@/hooks/useIsMobile";
import "./style.scss";

type TLeftNavProps = {
  className?: string;
};

const LeftNav = (props: TLeftNavProps) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isTop = useScrollTop();

  const active = isMobile ? false : !collapsed;
  const navClassNames = classnames(
    "left-nav",
    { active, top: isTop },
    className
  );

  const handleToggle = () => setCollapsed((c) => !c);
  const handleOverlayClick = () => setCollapsed(false);

  return (
    <>
      {active && isMobile && (
        <div
          className="left-nav__overlay"
          onClick={handleOverlayClick}
          data-lenis-prevent
        />
      )}
      <nav className={navClassNames} data-lenis-prevent>
        <LeftNavTop pathname={pathname} />
        <LeftNavBot />
      </nav>
      <Controller active={active} onClick={handleToggle} />
    </>
  );
};

export default LeftNav;
