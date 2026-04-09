import TextButton from "@/components/TextButton";
import AccountMenuItem from "./components/AccountMenuItem";
import "./style.scss";
import { TSubscription } from "@/types/global";
import { Link } from "@tanstack/react-router";

interface IAccountMenuProps {
  username: string;
  uid: string;
  id: string;
  subscription: TSubscription;
  className?: string;
}

const AccountMenu = (props: IAccountMenuProps) => {
  const { username, uid, subscription, className, id } = props;

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
        <AccountMenuItem icon="logout" text="Logout" to="/learner/logout" />
      </div>
    </div>
  );
};

export default AccountMenu;
