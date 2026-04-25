import { Link } from "@tanstack/react-router";

type TAccountMenuItemProps = {
  icon: string;
  text: string;
  to?: string;
  onClick?: () => void;
};

const AccountMenuItem = ({
  icon,
  text,
  to,
  onClick,
}: TAccountMenuItemProps) => {
  if (onClick) {
    return (
      <button className="account-menu-item" onClick={onClick}>
        <span className="material-symbols-rounded">{icon}</span>
        <small className="medium">{text}</small>
      </button>
    );
  }
  return (
    <Link className="account-menu-item" to={to}>
      <span className="material-symbols-rounded">{icon}</span>
      <small className="medium">{text}</small>
    </Link>
  );
};

export default AccountMenuItem;
