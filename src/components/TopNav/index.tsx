import TopNavLeft from "./components/TopNavLeft";
import TopNavRight from "./components/TopNavRight";
import { useRouterState } from "@tanstack/react-router";
import usePathname from "./hooks/usePathname";
import { useScrollTop } from "@/hooks/useScrollTop";
import classnames from "classnames";
import "./style.scss";

const TopNav = () => {
  const pathnames = useRouterState({
    select: (state) => state.location.pathname,
  });
  const { pathname, lastPathname, pathnameWithoutLast } = usePathname({
    pathnames,
  });
  const isTop = useScrollTop();

  const navClassNames = classnames("top-nav", { top: isTop });

  return (
    <nav className={navClassNames}>
      <TopNavLeft
        pathname={pathname}
        lastPathname={lastPathname}
        pathnameWithoutLast={pathnameWithoutLast}
      />
      <TopNavRight />
    </nav>
  );
};

export default TopNav;
