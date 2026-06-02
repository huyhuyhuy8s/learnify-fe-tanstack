import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "@tanstack/react-router";
import Icon from "@/components/Icon";
import "./style.scss";

type TNavItem = {
  labelKey: string;
  to: string;
  icon: string;
  exact?: boolean;
};

const NAV_ITEMS: TNavItem[] = [
  {
    labelKey: "admin.sidebar.dashboard",
    to: "/admin",
    icon: "home",
    exact: true,
  },
  {
    labelKey: "admin.sidebar.user_management",
    to: "/admin/users",
    icon: "group",
  },
  {
    labelKey: "admin.sidebar.settings",
    to: "/admin/settings",
    icon: "settings",
  },
  { labelKey: "admin.sidebar.policy", to: "/admin/policy", icon: "policy" },
];

const AdminSidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__brand-icon">
          <Icon name="admin_panel_settings" size={24} />
        </span>
        <span className="admin-sidebar__brand-text">
          {t("admin.sidebar.dashboard")}
        </span>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Admin navigation">
        <ul className="admin-sidebar__list">
          {NAV_ITEMS.map(({ labelKey, to, icon, exact }) => (
            <li key={to} className="admin-sidebar__item">
              <Link
                to={to}
                activeOptions={{ exact: exact ?? false }}
                activeProps={{ className: "admin-sidebar__link--active" }}
                className="admin-sidebar__link"
                title={t(labelKey)}
              >
                <span className="admin-sidebar__icon-wrap">
                  <Icon name={icon} size={20} />
                </span>
                <span className="admin-sidebar__label">{t(labelKey)}</span>
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
          aria-label={t("admin.sidebar.add_user")}
          onClick={() => navigate({ to: "/admin/users" })}
        >
          <Icon name="person_add" size={18} />
          <span>{t("admin.sidebar.add_user")}</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
