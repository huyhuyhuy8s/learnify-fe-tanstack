import { Link } from "@tanstack/react-router";
import Icon from "@/components/Icon";
import "./style.scss";

type TNavItem = {
  label: string;
  to: string;
  icon: string;
  exact?: boolean;
};

const NAV_ITEMS: TNavItem[] = [
  { label: "Pending", to: "/reviewer", icon: "pace", exact: true },
  { label: "Approved", to: "/reviewer/approved", icon: "check_circle" },
  { label: "Rejected", to: "/reviewer/rejected", icon: "cancel" },
];

const ReviewerSidebar = () => {
  return (
    <aside className="reviewer-sidebar">
      <div className="reviewer-sidebar__brand">
        <Icon name="verified" size={28} />
      </div>

      <nav className="reviewer-sidebar__nav" aria-label="Reviewer navigation">
        <ul className="reviewer-sidebar__list">
          {NAV_ITEMS.map(({ label, to, icon, exact }) => (
            <li key={to} className="reviewer-sidebar__item">
              <Link
                to={to}
                activeOptions={{ exact: exact ?? false }}
                activeProps={{ className: "reviewer-sidebar__link--active" }}
                className="reviewer-sidebar__link"
                title={label}
              >
                <span className="reviewer-sidebar__icon-wrap">
                  <Icon name={icon} size={22} />
                </span>
                <span className="reviewer-sidebar__label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ReviewerSidebar;
