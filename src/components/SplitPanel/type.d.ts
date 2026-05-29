import type { ReactNode } from "react";

export type TTab = {
  value: string;
  label: string;
};

export type TSplitPanelProps<
  T extends { id: string },
  S extends { id: string } = never,
> = {
  levels: 2 | 3;
  tabs?: TTab[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;

  // Level 1 — always visible
  items: T[];
  selectedId: string | null;
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode;

  // Level 2 — detail (2-level) OR sub-list (3-level)
  renderDetail: (item: T) => ReactNode;

  // Level 3 — only for levels=3
  subItems?: S[];
  selectedSubId?: string | null;
  onSelectSub?: (id: string) => void;
  renderSubItem?: (item: S, index: number, isActive: boolean) => ReactNode;
  renderSubDetail?: (item: S) => ReactNode;

  // Loading
  isLoading?: boolean;
  isSubLoading?: boolean;
  loader?: ReactNode;

  // Placeholder
  placeholder?: ReactNode;

  // Custom class names
  listClassName?: string;
  detailClassName?: string;
  subListClassName?: string;
  subDetailClassName?: string;
};
