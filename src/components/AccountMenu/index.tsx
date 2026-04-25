import TextButton from "@/components/TextButton";
import AccountMenuItem from "./components/AccountMenuItem";
import "./style.scss";
import type { TSubscription } from "@/types/global";
import { Link } from "@tanstack/react-router";

type TAccountMenuProps = {
  username: string;
  uid: string;
  id: string;
  subscription: TSubscription;
  className?: string;
  onLogout?: () => void;
};

const AccountMenu = (props: TAccountMenuProps) => {
  const { username, uid, subscription, className, id, onLogout } = props;
  const userProfileLink = `/learner/user/${id}`;

  return (
    <div className={`account-menu ${className}`}>
      <div className="information">
        <Link to={userProfileLink}>
          <div className="avatar"></div>
        </Link>
        <div className="context">
          <h6 className="bold">{username}</h6>
          <p>{uid}</p>
          <TextButton
            type="special"
            size="tiny"
            text={subscription}
            typeSpecial={subscription}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="separator"></div>
      <div className="item-holder">
        <AccountMenuItem icon="person" text="Profile" to={userProfileLink} />
        <AccountMenuItem
          icon="subscriptions"
          text="Subscription"
          to="/learner/subscription"
        />
        <AccountMenuItem
          icon="settings"
          text="Settings"
          to="/learner/settings"
        />
        <AccountMenuItem icon="logout" text="Logout" onClick={onLogout} />
      </div>
    </div>
  );
};

export default AccountMenu;
