import IconButton from '@/components/IconButton';
import LeftNavItem from "./components/LeftNavItem";
import classnames from "classnames";
import { useState, useMemo } from "react";
import './style.scss';

const LeftNav = () => {
  const [active, setActive] = useState(true)
  const navClassName = classnames("left-nav", { "active": active })
  const topItems = useMemo(() => {
    return [
      {
        icon: "local_library",
        label: "Learnify",
        href: "/",
      },
      {
        icon: "book",
        label: "Courses",
        href: "/courses",
      },
      {
        icon: "conversion_path",
        label: "Roadmaps",
        href: "/roadmaps",
      },
      {
        icon: "friends",
        label: "Friends",
        href: "/friends",
      },
      {
        icon: "info",
        label: "About",
        href: "/about",
      }
    ]
  }, [])

  return (
    <nav className={navClassName}>
      <IconButton name="search" />
      <div className="left-nav-top">
        {topItems.map((item) => (
          <LeftNavItem key={item.label} icon={item.icon} label={item.label} href={item.href} />
        ))}
      </div>
      <div className="left-nav-bot">
      </div>
    </nav>
  )
}

export default LeftNav
