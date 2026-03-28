import LeftNavTop from "./components/LeftNavTop";
import LeftNavBot from "./components/LeftNavBot";
import classnames from "classnames";
import { useState } from "react";
import { useRouterState } from '@tanstack/react-router'
import usePathname from "./hooks/usePathname";
import './style.scss';

const LeftNav = () => {
  const [active, setActive] = useState(true)
  const pathnames = useRouterState({ select: (state) => state.location.pathname })
  const { pathname } = usePathname({ pathnames: pathnames })

  const navClassNames = classnames("left-nav", { "active": active })

  return (
    <nav className={navClassNames}>
      <LeftNavTop pathname={pathname} />
      <LeftNavBot />
    </nav>
  )
}

export default LeftNav
