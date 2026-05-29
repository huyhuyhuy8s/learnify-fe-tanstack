import { Link } from "@tanstack/react-router";
import Icon from "@/components/Icon";
import "./style.scss";

type TLeftNavItemProps = {
  iconName: string;
  label: string;
  href: string;
  className?: string;
  active?: boolean;
};

const LeftNavItem = (props: TLeftNavItemProps) => {
  const { iconName, label, href, className = "" } = props;

  return (
    <div className="left-nav-item">
      <Link
        className="link-box"
        to={href}
        activeOptions={{ includeSearch: true, exact: true }}
      >
        <div className="icon-box">
          <Icon name={iconName} className={className} />
        </div>
        <small>{label}</small>
      </Link>
    </div>
  );
};

export default LeftNavItem;
