import { Link, useNavigate } from "@tanstack/react-router";
import Icon from "@/components/Icon";
import "./style.scss";

type TNavItem = {
  label: string;
  to: string;
  icon: string;
  exact?: boolean;
};

const NAV_ITEMS: TNavItem[] = [
  { label: "Dashboard", to: "/admin", icon: "home", exact: true },
  { label: "User Management", to: "/admin/users", icon: "group" },
  { label: "Settings", to: "/admin/settings", icon: "settings" },
  { label: "Policy", to: "/admin/policy", icon: "policy" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__brand-icon">
          <Icon name="admin_panel_settings" size={24} />
        </span>
        <span className="admin-sidebar__brand-text">Admin Panel</span>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Admin navigation">
        <ul className="admin-sidebar__list">
          {NAV_ITEMS.map(({ label, to, icon, exact }) => (
            <li key={to} className="admin-sidebar__item">
              <Link
                to={to}
                activeOptions={{ exact: exact ?? false }}
                activeProps={{ className: "admin-sidebar__link--active" }}
                className="admin-sidebar__link"
                title={label}
              >
                <span className="admin-sidebar__icon-wrap">
                  <Icon name={icon} size={20} />
                </span>
                <span className="admin-sidebar__label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="admin-sidebar__footer">
        <button
          id="admin-sidebar-add-user-btn"
          type="button"
          className="admin-sidebar__add-btn"
          aria-label="Add a new user"
          onClick={() => navigate({ to: "/admin/users" })}
        >
          <Icon name="person_add" size={18} />
          <span>Add User</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
