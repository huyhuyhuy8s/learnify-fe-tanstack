import { Link } from '@tanstack/react-router';

interface IAccountMenuItemProps {
  icon: string;
  text: string;
  to: string;
}

const AccountMenuItem = ({ icon, text, to }: IAccountMenuItemProps) => (
  <Link className="account-menu-item" to={to}>
    <span className="material-symbols-rounded"> {icon}</span>
    <small className="medium">{text}</small>
  </Link>
);

export default AccountMenuItem;
