import TopNavLeft from "./components/TopNavLeft";
import TopNavRight from "./components/TopNavRight";
import { useRouterState } from '@tanstack/react-router'
import usePathname from "./hooks/usePathname";
import './style.scss';

const TopNav = () => {
  const pathnames = useRouterState({ select: (state) => state.location.pathname })
  const { pathname } = usePathname({ pathnames: pathnames })

  return (
    <nav className="top-nav">
      <TopNavLeft pathname={pathname} />
      <TopNavRight />
    </nav>
  )
}

export default TopNav
