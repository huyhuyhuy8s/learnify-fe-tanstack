import { Link } from "@tanstack/react-router";

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
  { label: "About", icon: "information_circle", href: "/learner/about" },
];

export const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen w-16 bg-[#F4F6F4] p-2 items-center justify-between border-r border-[#3F4F42]/10">
      <div className="flex flex-col gap-8 w-full items-center mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex flex-col items-center gap-1 group w-full text-center text-[#3F4F42]"
            activeProps={{
              className: "bg-[#2D3E33] text-white p-3 rounded-2xl",
            }}
          >
            <div
              className={`flex flex-col items-center gap-1 p-3 w-full rounded-2xl group-hover:bg-[#2D3E33]/10 ${
                item.href === "/search" ? "text-white" : ""
              }`}
            >
              <span className="material-symbols-rounded text-[24px]">
                {item.icon}
              </span>
              <span className="text-[11px] font-medium block w-full truncate">
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-auto mb-6">
        <button
          title="Change language"
          className="flex items-center justify-center size-11 rounded-full border border-[#3F4F42]/20 text-[#3F4F42] hover:bg-[#3F4F42]/5 transition-colors"
        >
          <span className="material-symbols-rounded text-[24px]">language</span>
        </button>
        <button
          title="Toggle dark mode"
          className="flex items-center justify-center size-11 rounded-full border border-[#3F4F42]/20 text-[#3F4F42] hover:bg-[#3F4F42]/5 transition-colors"
        >
          <span className="material-symbols-rounded text-[24px]">dark_mode</span>
        </button>
      </div>
    </aside>
  );
};
