export type TTopItem = {
  iconName: string;
  labelKey: string;
  href: string;
};

export const learnerTopItems: TTopItem[] = [
  {
    iconName: "local_library",
    labelKey: "sidebar.dashboard",
    href: "/learner/dashboard",
  },
  {
    iconName: "book",
    labelKey: "sidebar.courses",
    href: "/learner/courses",
  },
  {
    iconName: "conversion_path",
    labelKey: "sidebar.roadmaps",
    href: "/learner/roadmaps",
  },
  {
    iconName: "group",
    labelKey: "sidebar.friends",
    href: "/learner/friends",
  },
  {
    iconName: "info",
    labelKey: "sidebar.about",
    href: "/learner/about",
  },
];

export const instructorTopItems: TTopItem[] = [
  {
    iconName: "local_library",
    labelKey: "sidebar.dashboard",
    href: "/instructor",
  },
  {
    iconName: "school",
    labelKey: "sidebar.manage_courses",
    href: "/instructor/courses",
  },
];

export function getTopItemsByPathname(pathname: string): TTopItem[] {
  if (pathname.startsWith("/instructor")) {
    return instructorTopItems;
  }
  return learnerTopItems;
}
