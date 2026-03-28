import classNames from 'classnames'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import './style.scss'

interface LeftNavItemProps {
  iconName: string;
  label: string;
  href: string;
  active?: boolean;
}

const LeftNavItem = (props: LeftNavItemProps) => {
  const {
    iconName,
    label,
    href,
    active = false,
  } = props
  const [fill, setFill] = useState(false)
  const iconClassName = classNames('material-symbols-rounded', { 'filled': fill }, { "active": active });

  return (
    <div className="left-nav-top-item">
      <Link className="link-box" to={href}>
        <div className="icon-box">
          <span className={iconClassName}>
            {iconName}
          </span>
        </div>
        <small>
          {label}
        </small>
      </Link>
    </div>
  )
}

export default LeftNavItem
