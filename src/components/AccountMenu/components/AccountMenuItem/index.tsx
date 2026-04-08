interface IAccountMenuItemProps {
  icon: string;
  text: string;
}

const AccountMenuItem = ({ icon, text }: IAccountMenuItemProps) => (
  <div className="account-menu-item">
    <span className="material-symbols-rounded">{icon}</span>
    <p className="medium">{text}</p>
  </div>
);

export default AccountMenuItem;
