import { Link } from "@tanstack/react-router";
import "./Sidebar.scss";

const MindmapIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <circle cx="12" cy="7" r="2.5" />
    <path
      d="M12 9.5V14.5M12 14.5C12 16.1569 13.3431 17.5 15 17.5C16.6569 17.5 18 16.1569 18 14.5M12 14.5C12 16.1569 10.6569 17.5 9 17.5C7.34315 17.5 6 16.1569 6 14.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="14.5" r="2.5" />
    <circle cx="18" cy="14.5" r="2.5" />
  </svg>
);

const menuItems = [
  { label: "Search", icon: "search", href: "/" },
  { label: "Learnify", icon: "menu_book", href: "/" },
  { label: "Courses", icon: "menu_book", href: "/learner/courses" },
  { label: "Roadmaps", icon: "account_tree", href: "/learner/roadmaps" },
  { label: "Friends", icon: "group", href: "/learner/friends" },
  { label: "About", icon: "info", href: "/learner/about" },
];

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__menu">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="sidebar__link"
            activeProps={{
              className: "sidebar__link--active",
            }}
          >
            <div
              className={`sidebar__item ${
                item.href === "/search" ? "sidebar__item--search" : ""
              }`}
            >
              <span className="material-symbols-rounded sidebar__icon">
                {item.icon}
              </span>
              <span className="sidebar__label">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="sidebar__actions">
        <button title="Change language" className="sidebar__action-btn">
          <span className="material-symbols-rounded sidebar__action-icon">
            language
          </span>
        </button>
        <button title="Toggle dark mode" className="sidebar__action-btn">
          <span className="material-symbols-rounded sidebar__action-icon">
            dark_mode
          </span>
        </button>
      </div>
    </aside>
  );
};
