export type TDropdownMenuOption = {
  value: string;
  label: string;
};

export type TDropdownMenuProps = {
  icon: import("@/components/Icon").TIconName;
  title: string;
  options: TDropdownMenuOption[];
  iconOption: import("@/components/Icon").TIconName;
  className?: string;
  style?: React.CSSProperties;
  buttonBackgroundColor: string;
  buttonColor?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
};
