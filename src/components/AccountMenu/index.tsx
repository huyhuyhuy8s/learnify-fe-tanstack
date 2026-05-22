import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import TextButton from "@/components/TextButton";
import AccountMenuItem from "./components/AccountMenuItem";
import "./style.scss";
import type { TSubscription } from "@/routes/learner/subscriptions/-types/type";

type TAccountMenuProps = {
  username: string;
  uid: string;
  id: string;
  subscription: TSubscription["type"];
  className?: string;
  onLogout?: () => void;
};

const AccountMenu = (props: TAccountMenuProps) => {
  const { t } = useTranslation();
  const { username, uid, subscription, className, id, onLogout } = props;
  const userProfileLink = `/learner/user/${id}`;

  return (
    <div className={`account-menu ${className}`}>
      <div className="information">
        <Link to={userProfileLink}>
          <div className="avatar"></div>
        </Link>
        <div className="context">
          <p className="bold" title={username}>
            {username}
          </p>
          <small title={uid}>{uid}</small>
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
        <AccountMenuItem
          icon="person"
          text={t("account_menu.profile")}
          to={userProfileLink}
        />
        <AccountMenuItem
          icon="subscriptions"
          text={t("account_menu.subscription")}
          to="/learner/subscription"
        />
        <AccountMenuItem
          icon="settings"
          text={t("account_menu.settings")}
          to="/learner/settings"
        />
        <AccountMenuItem
          icon="logout"
          text={t("account_menu.logout")}
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

export default AccountMenu;
