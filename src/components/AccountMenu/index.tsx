import TextButton from '@/components/TextButton';
import AccountMenuItem from './components/AccountMenuItem';
import './style.scss';
import { TSubscription } from '@/types/global';

interface IAccountMenuProps {
  username: string;
  uid: string;
  subscription: TSubscription;
  className?: string;
}

const AccountMenu = (props: IAccountMenuProps) => {
  const { username, uid, subscription, className } = props;

  return (
    <div className={`account-menu ${className}`}>
      <div className="information">
        <div className="avatar"></div>
        <div className="context">
          <h6 className="bold">{username}</h6>
          <p>{uid}</p>
          <TextButton
            type="special"
            size="tiny"
            text={subscription}
            typeSpecial={subscription}
          />
        </div>
      </div>
      <div className="separator"></div>
      <AccountMenuItem icon="person" text="Profile" />
      <AccountMenuItem icon="subscriptions" text="Subscription" />
      <AccountMenuItem icon="settings" text="Settings" />
      <AccountMenuItem icon="logout" text="Logout" />
    </div>
  );
};

export default AccountMenu;
